import { useNavigate, useParams } from "react-router-dom";

export default function ItemBottomSheet({
  item,
  isOpen,
  onClose,
  cart,
  increaseQty,
  decreaseQty,
  addToCart  // ⭐ ADD THIS
}) {

  const navigate = useNavigate();
  const params = useParams();

  if (!isOpen || !item) return null;

  const cartItem = cart.find((i) => i._id === item._id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end">

      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Sheet */}
      <div
        className="relative bg-white w-full rounded-t-3xl p-6 shadow-xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <img
          src={item.imageUrl || item.thumbnailUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded-xl"
        />

        <h2 className="text-2xl font-bold text-green-700 mt-4">{item.name}</h2>
        <p className="text-gray-600 mt-1">{item.description}</p>

        <p className="text-xl font-semibold text-green-700 mt-3">₹ {item.price}</p>

        {/* Qty Controls */}
        <div className="flex items-center justify-between mt-6">

          <div className="flex items-center gap-4">
            <button
              onClick={() => qty > 0 && decreaseQty(item._id)}
              className="w-10 h-10 bg-red-500 text-white rounded-full text-xl hover:bg-red-600 disabled:opacity-40"
              disabled={qty === 0}
            >
              −
            </button>

            <span className="text-lg font-semibold">{qty}</span>

            <button
            onClick={() => {
              if (qty === 0) {
                addToCart(item);          // if not in cart → ADD FIRST
              } else {
                increaseQty(item._id);    // else → increase qty
              }
            }}
            className="w-10 h-10 bg-green-600 text-white rounded-full text-xl hover:bg-green-700"
          >
            +
          </button>

          </div>

          <button
            onClick={() => navigate(`/cart/${params.id}`)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Go to Cart
          </button>

        </div>
      </div>
    </div>
  );
}
