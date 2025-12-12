export default function MenuItemCard({
  item,
  addToCart,
  handleArView,
  openItemSheet,
}) {
  return (
    <div
      onClick={() => openItemSheet(item)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden
                 hover:scale-[1.02] transition cursor-pointer"
    >
      <img
        src={item.imageUrl || item.thumbnailUrl}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-green-800 font-bold text-lg">{item.name}</h2>
        <p className="text-gray-600 mt-1">₹ {item.price}</p>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add to Cart
        </button>

        {/* AR View */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleArView(item); // <<< FIXED
          }}
          className="w-full mt-2 bg-green-100 text-green-700 font-semibold py-2 rounded-lg border-2 border-green-300 hover:bg-green-200"
        >
          AR View
        </button>
      </div>
    </div>
  );
}
