export default function CartButton({ navigate, cart, params, animateCount }) {
  return (
    <div className="relative">
      <button
        onClick={() => navigate(`/cart/${params.id}`)}
        className="bg-green-600 text-white px-5 py-2.5 rounded-full shadow-lg font-bold hover:bg-green-700 transition"
      >
        🛒 Cart
      </button>

      <span
        className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full transition-all ${
          animateCount ? "scale-125" : "scale-100"
        }`}
      >
        {cart.reduce((sum, i) => sum + i.qty, 0)}
      </span>
    </div>
  );
}
