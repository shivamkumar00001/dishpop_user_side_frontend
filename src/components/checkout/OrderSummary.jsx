export default function OrderSummary({ cart, totalAmount, loading, handleCheckout }) {
  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-md border border-green-100">

      <h2 className="text-xl font-bold text-green-700 mb-4">Order Summary</h2>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-green-50 p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold text-green-800">{item.name}</p>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.qty}
              </p>
            </div>
            <p className="font-semibold text-green-700">
              ₹{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t flex justify-between text-lg font-bold text-green-700">
        <span>Total:</span>
        <span>₹ {totalAmount}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold 
                   hover:bg-green-700 transition shadow-md disabled:bg-green-400"
      >
        {loading ? "Placing Order..." : "Confirm & Place Order"}
      </button>
    </div>
  );
}
