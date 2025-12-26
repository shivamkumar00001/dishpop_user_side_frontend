export default function CartSummary({
  totalAmount,
  navigate,
  username,
}) {
  const safeTotal = Number(totalAmount || 0);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-slate-200
                 p-5 sm:p-6 space-y-5"
    >
      {/* TOTAL */}
      <div className="flex justify-between items-center">
        <span className="text-slate-600 text-sm sm:text-lg font-semibold">
          Total Amount
        </span>
        <span className="text-amber-600 text-xl sm:text-2xl font-bold">
          ₹ {safeTotal.toFixed(2)}
        </span>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-slate-200 pt-4 space-y-4">
        {/* ADD MORE */}
        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="w-full bg-amber-50 text-amber-700 border-2 border-amber-200
                     py-3 rounded-xl font-semibold
                     hover:bg-amber-100 hover:border-amber-300
                     active:scale-95 transition-all duration-200"
        >
          + Add More Items
        </button>

        {/* CHECKOUT */}
        <button
          disabled={safeTotal <= 0}
          onClick={() => navigate(`/checkout/${username}`)}
          className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white
                     py-3 rounded-xl font-bold shadow-md
                     hover:from-slate-700 hover:to-slate-600 hover:shadow-lg
                     disabled:opacity-40 disabled:cursor-not-allowed
                     active:scale-95 transition-all duration-200"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}