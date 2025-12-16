export default function CartItem({ item, increaseQty, decreaseQty }) {
  return (
    <div
      className="
        bg-white rounded-2xl shadow-md p-3
        flex items-center gap-3
      "
    >
      {/* IMAGE */}
      <img
        src={item.imageUrl || item.thumbnailUrl}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
      />

      {/* DETAILS + QTY */}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm sm:text-lg font-semibold text-green-800 truncate">
          {item.name}
        </h2>

        <p className="text-gray-600 text-sm mt-0.5">
          ₹ {item.price}
        </p>

        {/* QTY CONTROLS */}
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={() => decreaseQty(item._id)}
            className="
              w-8 h-8 rounded-full
              bg-red-100 text-red-600
              flex items-center justify-center
              text-lg font-bold
              hover:bg-red-200 transition
            "
          >
            −
          </button>

          <span className="text-sm font-semibold min-w-[20px] text-center">
            {item.qty}
          </span>

          <button
            onClick={() => increaseQty(item._id)}
            className="
              w-8 h-8 rounded-full
              bg-green-100 text-green-700
              flex items-center justify-center
              text-lg font-bold
              hover:bg-green-200 transition
            "
          >
            +
          </button>
        </div>
      </div>

      {/* ITEM TOTAL */}
      <div className="text-green-700 font-bold text-sm sm:text-base whitespace-nowrap">
        ₹ {item.price * item.qty}
      </div>
    </div>
  );
}
