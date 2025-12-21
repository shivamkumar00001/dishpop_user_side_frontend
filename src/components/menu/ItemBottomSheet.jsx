import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { calculateItemPrice } from "../../utils/calcPrice.js";

export default function ItemBottomSheet({
  item,
  isOpen,
  onClose,
  cart,
  setCart,
  cartKey,
}) {
  if (!item) return null;

  const [selectedVariant, setSelectedVariant] = useState(
    item.defaultVariant || item.variants?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [qty, setQty] = useState(1);

  /* 🔄 Reset on open */
  useEffect(() => {
    if (!isOpen) return;
    setSelectedVariant(item.defaultVariant || item.variants?.[0]);
    setSelectedAddOns({});
    setQty(1);
  }, [isOpen, item.id]);

  /* 💰 Price */
  const flatAddOns = Object.values(selectedAddOns).filter(Boolean);
  const totalPrice = calculateItemPrice(selectedVariant, flatAddOns, qty);

  const selectAddon = (group, addon) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [group.id]:
        prev[group.id]?.id === addon.id ? null : addon,
    }));
  };

  const isValid = item.addOnGroups.every(
    (g) => !g.required || selectedAddOns[g.id]
  );

  const handleAddToCart = () => {
    if (!isValid) return;

    const unitPrice =
      Number(selectedVariant?.price ?? 0) +
      flatAddOns.reduce((s, a) => s + Number(a.price), 0);

    const newItem = {
      id: crypto.randomUUID(),
      itemId: item.id,
      name: item.name,
      imageUrl: item.imageUrl || item.thumbnailUrl,
      qty,
      variant: selectedVariant,
      addons: flatAddOns,
      unitPrice,
      totalPrice: unitPrice * qty,
    };

    const updated = [...cart, newItem];
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute bottom-0 w-full h-[90vh] bg-white rounded-t-[28px] flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0 }}   // ✅ FULL drag till screen end
        dragElastic={0.3}
        onDragEnd={(e, info) => {
          if (info.offset.y > 160 || info.velocity.y > 800) {
            onClose();
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* DRAG HANDLE */}
        <div className="py-3">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 pb-32">
          <img
            src={item.imageUrl || item.thumbnailUrl}
            alt={item.name}
            className="w-full h-44 object-cover rounded-2xl"
          />

          <h2 className="mt-4 text-2xl font-bold">{item.name}</h2>
          <p className="text-sm text-gray-600">{item.description}</p>

          {/* VARIANTS */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {item.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`p-3 rounded-xl border ${
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

          {/* ADDONS */}
          {item.addOnGroups.map((group) => (
            <div key={group.id} className="mt-6">
              <h3 className="font-semibold">
                {group.name}
                {group.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>

              {group.addOns.map((addon) => {
                const selected =
                  selectedAddOns[group.id]?.id === addon.id;

                return (
                  <div
                    key={addon.id}
                    onClick={() => selectAddon(group, addon)}
                    className={`mt-3 p-4 rounded-xl border flex justify-between cursor-pointer ${
                      selected
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span>{addon.name}</span>
                    <span>₹ {addon.price}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-5 py-4 flex justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full bg-gray-200"
            >
              −
            </button>
            <span className="font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-10 h-10 rounded-full bg-green-600 text-white"
            >
              +
            </button>
          </div>

          <button
            disabled={!isValid}
            onClick={handleAddToCart}
            className="px-7 py-3 rounded-2xl bg-green-600 text-white font-semibold disabled:opacity-40"
          >
            Add ₹{totalPrice}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
