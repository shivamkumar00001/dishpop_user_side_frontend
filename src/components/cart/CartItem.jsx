export default function CartItem({ item, increaseQty, decreaseQty }) {
  return (
    <div
      className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-slate-200
                 hover:shadow-lg transition-shadow duration-200
                 flex flex-col sm:flex-row gap-4"
    >
      {/* IMAGE */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover self-start shadow-sm"
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-base sm:text-lg text-slate-800">
            {item.name}
          </h2>

          {/* VARIANT */}
          <p className="text-sm text-slate-600 mt-1">
            {item.variant?.name} · ₹ {item.unitPrice}
          </p>

          {/* ADDONS */}
          {item.addons?.length > 0 && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Add-ons: {item.addons.map(a => a.name).join(", ")}
            </p>
          )}
        </div>

        {/* QTY + TOTAL (MOBILE INLINE) */}
        <div className="mt-4 sm:mt-3 flex items-center justify-between sm:justify-start sm:gap-6">
          {/* QTY CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.id)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200
                         text-slate-700 text-lg font-bold active:scale-95
                         transition-all duration-200"
            >
              −
            </button>

            <span className="font-bold text-base text-slate-800">
              {item.qty}
            </span>

            <button
              onClick={() => increaseQty(item.id)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600
                         text-white text-lg font-bold active:scale-95
                         hover:from-amber-600 hover:to-amber-700 shadow-md
                         transition-all duration-200"
            >
              +
            </button>
          </div>

          {/* TOTAL (MOBILE) */}
          <div className="sm:hidden font-bold text-amber-600 text-lg">
            ₹ {item.totalPrice}
          </div>
        </div>
      </div>

      {/* TOTAL (DESKTOP) */}
      <div className="hidden sm:flex font-bold text-amber-600
                      items-center text-xl">
        ₹ {item.totalPrice}
      </div>
    </div>
  );
}