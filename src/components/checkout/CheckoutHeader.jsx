export default function CheckoutHeader({ navigate, params }) {
  return (
    <header className="bg-white/90 sticky top-0 z-20 backdrop-blur-md shadow-sm border-b border-green-100 py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">Checkout</h1>

        <button
          onClick={() => navigate(`/cart/${params.id}`)}
          className="bg-green-600 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-green-700 transition"
        >
          ← Back to Cart
        </button>
      </div>
    </header>
  );
}
