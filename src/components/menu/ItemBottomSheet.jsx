import { useEffect, useState } from "react";
import { calculateItemPrice } from "../../utils/calcPrice.js";

export default function ItemBottomSheet({
  item,
  isOpen,
  onClose,
  cart,
  setCart,
  cartKey,
}) {
  if (!isOpen || !item) return null;

  /* ---------------- STATE ---------------- */
  const [selectedVariant, setSelectedVariant] = useState(
    item.defaultVariant || item.variants?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [qty, setQty] = useState(1);

  /* 🔥 DRAG STATE */
  const [startY, setStartY] = useState(null);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  /* 🔥 RESET ON OPEN */
  useEffect(() => {
    if (!isOpen) return;
    setSelectedVariant(item.defaultVariant || item.variants?.[0]);
    setSelectedAddOns({});
    setQty(1);
    setTranslateY(0);
  }, [isOpen, item.id]);

  /* ---------------- PRICE ---------------- */
  const flatAddOns = Object.values(selectedAddOns).filter(Boolean);

  const totalPrice =
    qty === 0 ? 0 : calculateItemPrice(selectedVariant, flatAddOns, qty);

  /* ---------------- ADDON SELECT ---------------- */
  const selectAddon = (group, addon) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [group.id]:
        prev[group.id]?.id === addon.id ? null : addon,
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const isValid = item.addOnGroups.every(group => {
    if (!group.required) return true;
    return Boolean(selectedAddOns[group.id]);
  });

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = () => {
    if (!isValid || qty === 0) return;

    const variantPrice = Number(selectedVariant?.price ?? 0);
    const addonsTotal = flatAddOns.reduce(
      (sum, a) => sum + Number(a?.price ?? 0),
      0
    );

    const unitPrice = variantPrice + addonsTotal;

    const newCartItem = {
      id: crypto.randomUUID(),
      itemId: item.id,
      name: item.name,
      imageUrl: item.imageUrl || item.thumbnailUrl,
      qty,
      variant: {
        id: selectedVariant.id,
        name: selectedVariant.name,
        price: variantPrice,
      },
      addons: flatAddOns.map(a => ({
        id: a.id,
        name: a.name,
        price: Number(a.price),
      })),
      unitPrice,
      totalPrice: unitPrice * qty,
    };

    const updated = [...cart, newCartItem];
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
    onClose();
  };

  /* ---------------- DRAG HANDLERS ---------------- */
  const handleTouchStart = e => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = e => {
    if (!isDragging || startY === null) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 0) {
      // 👇 resistance after 200px
      const resistance =
        diff > 200 ? 200 + (diff - 200) * 0.3 : diff;
      setTranslateY(resistance);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (translateY > 140) {
      onClose();
    } else {
      setTranslateY(0);
    }

    setStartY(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
      <div className="absolute inset-0" onClick={onClose} />

      {/* BOTTOM SHEET */}
      <div
        className="relative w-full h-[90vh] bg-white rounded-t-[28px]
                   flex flex-col"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.25s ease-out",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* DRAG HANDLE */}
        <div
          className="shrink-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 pb-32">
          <img
            src={item.imageUrl || item.thumbnailUrl}
            onError={e => (e.currentTarget.src = "/food-placeholder.png")}
            alt={item.name}
            className="w-full h-44 object-cover rounded-2xl shadow-md"
          />

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {item.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {item.description}
          </p>

          {/* VARIANTS */}
          <section className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Choose Size
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {item.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border text-left
                    ${
                      selectedVariant.id === v.id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                >
                  <p className="font-medium">{v.name}</p>
                  <p className="text-sm">₹ {v.price}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ADDONS */}
          {item.addOnGroups.map(group => (
            <section key={group.id} className="mt-7">
              <h3 className="font-semibold text-gray-800 mb-2">
                {group.name}
                {group.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>

              <div className="space-y-3">
                {group.addOns.map(addon => {
                  const selected =
                    selectedAddOns[group.id]?.id === addon.id;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => selectAddon(group, addon)}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer
                        ${
                          selected
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200"
                        }`}
                    >
                      <div>
                        <p>{addon.name}</p>
                        <p className="text-sm text-gray-500">
                          ₹ {addon.price}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center
                          ${
                            selected
                              ? "border-green-600"
                              : "border-gray-400"
                          }`}
                      >
                        {selected && (
                          <div className="w-3 h-3 rounded-full bg-green-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* FIXED FOOTER */}
        <div className="shrink-0 fixed bottom-0 left-0 right-0 bg-white border-t px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full bg-gray-200 text-xl"
            >
              −
            </button>
            <span className="font-semibold text-lg">{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-10 h-10 rounded-full bg-green-600 text-white text-xl"
            >
              +
            </button>
          </div>

          <button
            disabled={!isValid}
            onClick={handleAddToCart}
            className="px-7 py-3 rounded-2xl font-semibold text-white
                       bg-gradient-to-r from-green-600 to-emerald-500
                       disabled:opacity-40"
          >
            Add ₹{totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
}
