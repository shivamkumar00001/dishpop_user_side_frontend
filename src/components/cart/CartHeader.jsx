export default function CartHeader({ cart, navigate, username }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-green-700">
          Your Cart
        </h1>

        <button
          onClick={() => navigate(`/cart/${username}`)}
          className="relative bg-green-600 text-white px-4 py-2 rounded-full shadow-lg 
            hover:bg-green-700 transition font-semibold"
        >
          🛒 Cart
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cart.reduce((a, b) => a + b.qty, 0)}
          </span>
        </button>
      </div>
    </header>
  );
}
