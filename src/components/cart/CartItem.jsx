export default function CartItem({ item, increaseQty, decreaseQty }) {
  return (
    <div
      className="bg-white p-4 sm:p-5 rounded-2xl shadow
                 flex flex-col sm:flex-row gap-4"
    >
      {/* IMAGE */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover self-start"
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-base sm:text-lg">
            {item.name}
          </h2>

          {/* VARIANT */}
          <p className="text-sm text-gray-600 mt-1">
            {item.variant?.name} · ₹ {item.unitPrice}
          </p>

          {/* ADDONS */}
          {item.addons?.length > 0 && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
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
              className="w-9 h-9 rounded-full bg-gray-200
                         text-lg font-semibold active:scale-95"
            >
              −
            </button>

            <span className="font-medium text-base">
              {item.qty}
            </span>

            <button
              onClick={() => increaseQty(item.id)}
              className="w-9 h-9 rounded-full bg-green-600
                         text-white text-lg font-semibold active:scale-95"
            >
              +
            </button>
          </div>

          {/* TOTAL (MOBILE) */}
          <div className="sm:hidden font-bold text-green-700">
            ₹ {item.totalPrice}
          </div>
        </div>
      </div>

      {/* TOTAL (DESKTOP) */}
      <div className="hidden sm:flex font-bold text-green-700
                      items-center text-lg">
        ₹ {item.totalPrice}
      </div>
    </div>
  );
}
