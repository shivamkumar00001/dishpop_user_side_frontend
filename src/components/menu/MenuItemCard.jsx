import { useEffect, useState } from "react";

export default function MenuItemCard({
  item,
  cart = [],
  addToCart,
  openItemSheet,
  onArView,
}) {
  /* ===============================
     SAFE CART MATCH (IMPORTANT FIX)
  =============================== */
const cartItem = Array.isArray(cart)
  ? cart.find((c) => c.id === item.id)
  : null;

  const qty = cartItem?.qty || 0;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (qty > 0) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 180);
      return () => clearTimeout(t);
    }
  }, [qty]);

  /* ===============================
     SAFE DATA NORMALIZATION
  =============================== */
  const variants = Array.isArray(item.variants) ? item.variants : [];

  const defaultVariant =
    item.defaultVariant ||
    variants.find((v) => v.isDefault) ||
    variants[0] ||
    null;

  const price =
    defaultVariant?.price ??
    item.startingPrice ??
    item.price ??
    0;

  const primaryTag = item.tags?.[0];
  const hasAR = Boolean(item.arModel?.isAvailable);

  return (
    <div className="flex flex-col gap-2">
      {/* IMAGE */}
      <div className="relative rounded-2xl overflow-hidden"
          onClick={openItemSheet || addToCart}
      >
        <img
          src={item.imageUrl || item.thumbnailUrl}
          alt={item.name}
          className="w-full h-[145px] sm:h-[155px] object-cover"
        />

        {/* TAG */}
        {primaryTag && (
          <div
            className="
              absolute top-0 left-1/2 -translate-x-1/2
              flex items-center gap-1
              bg-white/70 backdrop-blur-sm
              text-emerald-700
              text-[10px] font-semibold
              px-3 py-1
              rounded-bl-xl rounded-br-xl
              border border-white/60
              shadow-sm
            "
          >
            {primaryTag.icon && (
              <span className="text-[11px] leading-none">
                {primaryTag.icon}
              </span>
            )}
            <span className="whitespace-nowrap">
              {primaryTag.name}
            </span>
          </div>
        )}

        {/* ADD / OPEN SHEET */}
        <button
          onClick={openItemSheet || addToCart}
          className="
            absolute bottom-2 right-2
            bg-white text-emerald-600
            font-bold text-sm
            px-4 py-1.5
            rounded-xl shadow-md
            active:scale-95 transition
          "
        >
          ADD
        </button>

        {/* QTY BADGE */}
        {qty > 0 && (
          <div
            className={`
              absolute top-2 right-2
              bg-emerald-600 text-white
              text-xs font-bold
              px-2.5 py-1 rounded-full
              ${animate ? "scale-125" : "scale-100"}
              transition
            `}
          >
            {qty}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="px-1">
        <h3 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-2">
          {item.name}
        </h3>

        {/* PRICE + AR */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-base font-extrabold text-slate-900">
            ₹{price}
          </div>

          {hasAR && (
            <button
              onClick={onArView}
              className="
                flex items-center justify-center gap-1
                px-3 py-1.5
                rounded-lg
                bg-emerald-600
                text-white
                text-xs font-bold
                shadow-md shadow-emerald-600/30
                hover:bg-emerald-700
                active:scale-95
                transition
              "
            >
              AR View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
