export default function OrderSummary({ cart, totalAmount, loading, handleCheckout }) {
  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {cart.map(item => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 font-bold flex justify-between">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded"
      >
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
}
