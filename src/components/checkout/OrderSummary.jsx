export default function OrderSummary({
  cart,
  totalAmount,
  loading,
  handleCheckout
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Order Summary
      </h2>

      {/* ITEMS */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {cart.map(item => (
          <div
            key={item._id}
            className="flex justify-between text-sm"
          >
            <span className="text-gray-700">
              {item.name} × {item.qty}
            </span>
            <span className="font-semibold text-gray-800">
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span className="text-green-700">₹{totalAmount}</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`
          w-full mt-6 py-3 rounded-xl font-semibold transition
          ${loading
            ? "bg-green-300 cursor-not-allowed text-white"
            : "bg-green-600 hover:bg-green-700 text-white shadow-md"}
        `}
      >
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Your order will be sent directly to the kitchen
      </p>
    </div>
  );
}
