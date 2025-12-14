export default function CheckoutHeader({ navigate, username }) {
  return (
    <header className="bg-white sticky top-0 shadow border-b py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between">
        <h1 className="text-2xl font-bold text-green-700">Checkout</h1>

        <button
          onClick={() => navigate(`/cart/${username}`)}
          className="bg-green-600 text-white px-5 py-2 rounded-full"
        >
          ← Back to Cart
        </button>
      </div>
    </header>
  );
}
