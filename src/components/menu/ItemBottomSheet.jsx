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

  /* ---------------- STATE (FRESH EVERY OPEN) ---------------- */
  const [selectedVariant, setSelectedVariant] = useState(
  item.defaultVariant || item.variants?.[0]
);


  // { [groupId]: addon | null }
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [qty, setQty] = useState(1);

  /* 🔥 RESET ON EVERY OPEN */
  useEffect(() => {
    if (!isOpen) return;

    setSelectedVariant(item.defaultVariant);
    setSelectedAddOns({});
    setQty(1);
  }, [isOpen, item.id]);

  /* ---------------- FLATTEN ADDONS ---------------- */
  const flatAddOns = Object.values(selectedAddOns).filter(Boolean);

  const totalPrice =
    qty === 0
      ? 0
      : calculateItemPrice(selectedVariant, flatAddOns, qty);

  /* ---------------- RADIO SELECT ---------------- */
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
    id: crypto.randomUUID(), // unique cart row
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

    // 🔥 THESE TWO FIX EVERYTHING
    unitPrice,
    totalPrice: unitPrice * qty,
  };

  const updated = [...cart, newCartItem];

  setCart(updated);
  localStorage.setItem(cartKey, JSON.stringify(updated));
  onClose();
};

  /* ---------------- UI (DESIGN UNCHANGED) ---------------- */
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative w-full max-h-[92vh] bg-white rounded-t-[28px]
                   overflow-y-auto animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* HANDLE */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />

        {/* IMAGE */}
        <div className="px-5 pt-4">
          <img
            src={item.imageUrl || item.thumbnailUrl}
            onError={e => (e.currentTarget.src = "/food-placeholder.png")}
            alt={item.name}
            className="w-full h-44 object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* CONTENT */}
        <div className="px-5 pb-28">
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
                  key={v.name}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border text-left
                    ${
                      selectedVariant.name === v.name
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

          {/* ADDONS – RADIO */}
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
                      <div className="flex flex-col">
                        <span>{addon.name}</span>
                        <span className="text-sm text-gray-500">
                          ₹ {addon.price}
                        </span>
                      </div>

                      {/* RADIO */}
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

        {/* FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t
                        px-5 py-4 flex items-center justify-between">
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
