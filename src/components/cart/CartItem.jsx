export default function CartItem({ item, increaseQty, decreaseQty }) {
  return (
    <div
      className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4
      sm:flex-row flex-col sm:text-left text-center"
    >
      {/* IMAGE */}
      <img
        src={item.imageUrl || item.thumbnailUrl}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover shadow-sm"
      />

      {/* DETAILS */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-green-800">{item.name}</h2>
        <p className="text-gray-600">₹ {item.price}</p>
      </div>

      {/* QTY CONTROLS */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => decreaseQty(item._id)}
          className="w-8 h-8 bg-red-500 text-white rounded-full 
          flex items-center justify-center text-lg font-bold hover:bg-red-600"
        >
          −
        </button>

        <span className="text-lg font-semibold">{item.qty}</span>

        <button
          onClick={() => increaseQty(item._id)}
          className="w-8 h-8 bg-green-600 text-white rounded-full 
          flex items-center justify-center text-lg font-bold hover:bg-green-700"
        >
          +
        </button>
      </div>
    </div>
  );
}
