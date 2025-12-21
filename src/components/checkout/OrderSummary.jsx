export default function OrderSummary({
  cart,
  totalAmount,
  loading,
  handleCheckout,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Order Summary
      </h2>

      <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border-b pb-3 last:border-none"
          >
            <div className="flex justify-between text-sm font-semibold">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.totalPrice}</span>
            </div>

            <p className="text-xs text-gray-600 mt-1">
              Variant: {item.variant.name} (₹{item.variant.price})
            </p>

            {item.addons?.length > 0 && (
              <div className="mt-1 space-y-0.5">
                {item.addons.map(addon => (
                  <p
                    key={addon.id}
                    className="text-xs text-gray-600"
                  >
                    + {addon.name} (₹{addon.price})
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span className="text-green-700">₹{totalAmount}</span>
      </div>

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
