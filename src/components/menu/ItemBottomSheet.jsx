import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateItemPrice } from "../../utils/calcPrice.js";

/* ======================================================
   BULLETPROOF BODY SCROLL LOCK (REFERENCE COUNTED)
====================================================== */
let scrollLocks = 0;

const lockBody = () => {
  if (scrollLocks === 0) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  }
  scrollLocks++;
};

const unlockBody = () => {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }
};

export default function ItemBottomSheet({
  item,
  isOpen,
  onClose,
  cart,
  setCart,
  cartKey,
}) {
  if (!item) return null;

  /* ===================== STATE ===================== */
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [qty, setQty] = useState(1);
  const [canDrag, setCanDrag] = useState(true);

  const scrollRef = useRef(null);

  /* ===================== BODY SCROLL ===================== */
  useEffect(() => {
    if (isOpen) lockBody();
    return () => unlockBody();
  }, [isOpen]);

  /* ===================== INIT ===================== */
  useEffect(() => {
    if (!isOpen) return;

    const defaultVariant =
      item.defaultVariant || item.variants?.[0] || null;

    setSelectedVariant(defaultVariant);
    setSelectedAddOns({});
    setQty(1);
  }, [isOpen, item?.id]);

  /* ===================== SCROLL vs DRAG ===================== */
  const handleScroll = () => {
    if (!scrollRef.current) return;
    setCanDrag(scrollRef.current.scrollTop <= 0);
  };

  /* ===================== ADDONS ===================== */
  const selectAddon = (groupId, addon) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [groupId]:
        prev[groupId]?.id === addon.id ? null : addon,
    }));
  };

  /* ===================== PRICE ===================== */
  const flatAddOns = useMemo(
    () => Object.values(selectedAddOns).filter(Boolean),
    [selectedAddOns]
  );

  const totalPrice = useMemo(
    () => calculateItemPrice(selectedVariant, flatAddOns, qty),
    [selectedVariant, flatAddOns, qty]
  );

  /* ===================== VALIDATION ===================== */
  const isValid = useMemo(() => {
    if (!selectedVariant) return false;

    return item.addOnGroups?.every(
      (g) => !g.required || selectedAddOns[g.id]
    );
  }, [item.addOnGroups, selectedAddOns, selectedVariant]);

  /* ===================== CLOSE ===================== */
  const closeSheet = () => {
    unlockBody();
    onClose();
  };

  /* ===================== ADD TO CART ===================== */
  const handleAddToCart = () => {
    if (!isValid) return;

    const unitPrice =
      Number(selectedVariant.price || 0) +
      flatAddOns.reduce((sum, a) => sum + Number(a.price || 0), 0);

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

    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    closeSheet();
  };

  /* ===================== UI ===================== */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSheet}
        >
          <motion.div
            className="absolute bottom-0 w-full h-[70vh] bg-white rounded-t-[32px] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag={canDrag ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={(e, info) => {
              if (info.offset.y > 120 || info.velocity.y > 700) {
                closeSheet();
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HANDLE */}
            <div className="py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
            </div>

            {/* CONTENT */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-5 pb-36 overscroll-contain"
            >
              <img
                src={item.imageUrl || item.thumbnailUrl}
                alt={item.name}
                className="w-full h-44 object-cover rounded-2xl"
              />

              <h2 className="mt-4 text-2xl font-bold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>

              {/* VARIANTS */}
              {item.variants?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Choose a variant</h3>

                  <div className="grid grid-cols-2 gap-4">
                    {item.variants.map((v) => {
                      const selected = selectedVariant?.name === v.name;

                      return (
                        <motion.div
                          key={v.name}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-4 rounded-2xl border cursor-pointer transition ${
                            selected
                              ? "border-green-600 bg-green-50 ring-2 ring-green-500"
                              : "border-gray-200"
                          }`}
                        >
                          <p className="font-semibold">{v.name}</p>
                          <p className="text-sm text-gray-600">₹ {v.price}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADDONS */}
              {item.addOnGroups?.map((group) => (
                <div key={group.id} className="mt-6">
                  <h3 className="font-semibold mb-3">
                    {group.name}
                    {group.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h3>

                  <div className="space-y-3">
                    {group.addOns.map((addon) => {
                      const selected =
                        selectedAddOns[group.id]?.id === addon.id;

                      return (
                        <motion.div
                          key={addon.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            selectAddon(group.id, addon)
                          }
                          className={`flex justify-between items-center p-4 rounded-2xl border cursor-pointer ${
                            selected
                              ? "border-green-600 bg-green-50 ring-1 ring-green-400"
                              : "border-gray-200"
                          }`}
                        >
                          <span className="font-medium">{addon.name}</span>
                          <span className="text-sm">
                            + ₹{addon.price}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white border-t px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 rounded-full bg-gray-100 text-xl"
                >
                  −
                </button>

                <span className="font-semibold text-lg">{qty}</span>

                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 rounded-full bg-green-600 text-white text-xl"
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!isValid}
                onClick={handleAddToCart}
                className="px-8 py-3 rounded-2xl bg-green-600 text-white font-semibold text-lg disabled:opacity-40"
              >
                Add ₹{totalPrice}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
