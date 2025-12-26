import { useEffect, useState } from "react";

export default function MenuItemCard({
  item,
  cart,
  addToCart,
  openItemSheet,
  increaseQty,
  decreaseQty,
  onArView,
}) {
  const cartItem = cart.find((c) => c.id === item.id);
  const qty = cartItem?.qty || 0;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (qty > 0) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 200);
      return () => clearTimeout(t);
    }
  }, [qty]);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden
                 border border-slate-200 hover:border-amber-300 transition-all duration-300 cursor-pointer"
      onClick={openItemSheet}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={item.imageUrl || item.thumbnailUrl}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Quantity Badge */}
      {qty > 0 && (
        <div
          className={`absolute top-3 right-3 bg-gradient-to-br from-amber-500 to-amber-600 text-white
          px-3 py-1.5 rounded-full font-bold shadow-lg
          ${animate ? "scale-125" : "scale-100"} transition-all duration-200`}
        >
          {qty}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h2 className="text-slate-800 font-bold text-lg mb-1 line-clamp-1">
          {item.name}
        </h2>
        <p className="text-amber-600 font-bold text-xl mb-4">
          ₹{item.startingPrice}
        </p>

        {/* Add to Cart / Quantity Controls */}
        {qty === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white py-3 rounded-xl
                     font-semibold hover:from-slate-700 hover:to-slate-600 
                     active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        ) : (
          <div
            className="flex items-center justify-between
                       bg-slate-50 border-2 border-amber-500 rounded-xl px-4 py-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => decreaseQty(item.id)}
              className="text-slate-700 font-bold text-xl w-8 h-8 flex items-center justify-center
                       hover:bg-amber-100 rounded-lg transition-colors duration-200"
            >
              −
            </button>
            <span className="text-slate-800 font-bold text-lg">{qty}</span>
            <button
              onClick={() => increaseQty(item.id)}
              className="text-slate-700 font-bold text-xl w-8 h-8 flex items-center justify-center
                       hover:bg-amber-100 rounded-lg transition-colors duration-200"
            >
              +
            </button>
          </div>
        )}

        {/* AR View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onArView === "function") onArView();
          }}
          className="relative overflow-hidden w-full mt-3 py-2.5 rounded-xl
                   bg-gradient-to-r from-amber-50 to-amber-100 
                   text-amber-700 font-semibold border border-amber-200
                   hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-600
                   hover:shadow-lg hover:shadow-amber-500/20
                   active:scale-95 transition-all duration-300 ease-out"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            AR View
          </span>

          {/* Shine Effect */}
          <span
            className="pointer-events-none absolute inset-0
                     bg-gradient-to-r from-transparent via-white/40 to-transparent
                     -translate-x-full group-hover:translate-x-full
                     transition-transform duration-700"
          />
        </button>
      </div>
    </div>
  );
}