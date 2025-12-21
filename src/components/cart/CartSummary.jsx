export default function CartSummary({
  totalAmount,
  navigate,
  username,
}) {
  const safeTotal = Number(totalAmount || 0);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg
                 p-5 sm:p-6 space-y-5"
    >
      {/* TOTAL */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm sm:text-lg font-medium">
          Total Amount
        </span>
        <span className="text-green-700 text-xl sm:text-2xl font-bold">
          ₹ {safeTotal.toFixed(2)}
        </span>
      </div>

      {/* DIVIDER */}
      <div className="border-t pt-4 space-y-4">
        {/* ADD MORE */}
        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="w-full bg-green-100 text-green-800
                     py-3 rounded-xl font-semibold
                     active:scale-95 transition"
        >
          + Add More Items
        </button>

        {/* CHECKOUT */}
        <button
          disabled={safeTotal <= 0}
          onClick={() => navigate(`/checkout/${username}`)}
          className="w-full bg-green-600 text-white
                     py-3 rounded-xl font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     active:scale-95 transition"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}
