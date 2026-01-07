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
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSheet}
        >
         <motion.div
            className="
              absolute bottom-0 w-full h-[70vh]
              bg-gradient-to-br from-emerald-50/95 to-white
              backdrop-blur-xl
              rounded-t-[36px]
              flex flex-col
              shadow-[0_-20px_60px_rgba(16,185,129,0.35)]
            "

            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag={canDrag ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            dragMomentum={false}
            dragSnapToOrigin={true}
            onDragStart={(e, info) => {
              isDragging.current = true;
              dragStartY.current = info.point.y;
            }}
            onDragEnd={(e, info) => {
              isDragging.current = false;
              if (info.offset.y > 120 || info.velocity.y > 700) {
                closeSheet();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: "none" }}
          >
            {/* HANDLE */}
            <div className="py-3 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-emerald-300 rounded-full mx-auto" />
            </div>


            {/* CONTENT */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-5 pb-36"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >
            <img
              src={item.imageUrl || item.thumbnailUrl}
              alt={item.name}
              className="
                w-full h-44 object-cover
                rounded-3xl
                shadow-[0_12px_40px_rgba(0,0,0,0.15)]
              "
            />

            <h2 className="mt-4 text-2xl font-black text-emerald-900">
              {item.name}
            </h2>

            <p className="text-sm text-emerald-700/80">
              {item.description}
            </p>

              {/* ✅ TAGS (ADDED) */}
              {item.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                  <span
                    className="
                      inline-flex items-center gap-1
                      px-3 py-1 rounded-full
                      text-xs font-semibold
                      bg-emerald-100/80
                      text-emerald-700
                      border border-emerald-200
                    "
                  >

                      <span>{tag.icon}</span>
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* VARIANTS */}
              {item.variants?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Choose a variant
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {item.variants.map((v) => {
                      const selected =
                        selectedVariant?.name === v.name;

                      return (
                        <motion.div
                          key={v.name}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-4 rounded-3xl border-2 cursor-pointer transition-all duration-200 ${
                            selected
                              ? "border-emerald-500 bg-emerald-50 shadow-[0_8px_25px_rgba(16,185,129,0.3)]"
                              : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40"
                          }`}

                        >
                          <p className="font-semibold text-slate-800">
                            {v.name}
                          </p>
                          <p className="text-sm text-emerald-700 font-bold">
                            ₹ {v.price}
                          </p>

                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADDONS */}
              {item.addOnGroups?.map((group) => (
                <div key={group.id} className="mt-6">
                  <h3 className="font-semibold text-slate-800 mb-3">
                    {group.name}
                    {group.required && (
                      <span className="text-amber-600 ml-1">*</span>
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
                          className={`flex justify-between items-center p-4 rounded-3xl border-2 cursor-pointer transition-all duration-200 ${
                          selected
                            ? "border-emerald-500 bg-emerald-50 shadow-sm"
                            : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40"
                        }`}

                        >
                          <span className="font-medium text-slate-800">
                            {addon.name}
                          </span>
<span className="text-sm text-emerald-700 font-semibold">
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
           <div
  className="
    sticky bottom-0
    bg-white/85 backdrop-blur-xl
    border-t border-emerald-200/40
    px-5 py-4
    flex justify-between items-center
    shadow-[0_-10px_30px_rgba(0,0,0,0.1)]
  "
>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                 className="
    w-11 h-11 rounded-full
    bg-emerald-100
    text-emerald-700 text-xl font-bold
    hover:bg-emerald-200
    active:scale-95
    transition-all duration-200
  "
                >
                  −
                </button>

                <span className="font-bold text-lg text-slate-800">
                  {qty}
                </span>

                <button
                  onClick={() => setQty((q) => q + 1)}
                   className="
    w-11 h-11 rounded-full
    bg-gradient-to-br from-emerald-500 to-emerald-600
    text-white text-xl font-bold
    shadow-md
    hover:from-emerald-600 hover:to-emerald-700
    active:scale-95
    transition-all duration-200
  "
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!isValid}
                onClick={handleAddToCart}
className="
    px-8 py-3 rounded-3xl
    bg-gradient-to-r from-emerald-600 to-emerald-700
    text-white font-black text-lg
    shadow-[0_12px_40px_rgba(16,185,129,0.45)]
    hover:from-emerald-700 hover:to-emerald-800
    disabled:opacity-40 disabled:cursor-not-allowed
    transition-all duration-200
  "
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
