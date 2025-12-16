export default function CartSummary({ totalAmount, navigate, params }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
      
      <div className="flex justify-between items-center text-lg font-semibold">
        <span className="text-gray-600">Total Amount</span>
        <span className="text-green-700 text-2xl font-bold">
          ₹ {totalAmount}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(`/menu/${params.id}`)}
          className="flex-1 bg-green-100 text-green-800 py-3 rounded-xl 
          font-semibold hover:bg-green-200 transition"
        >
          + Add More Items
        </button>

        <button
          onClick={() => navigate(`/checkout/${params.id}`)}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl 
          font-semibold hover:bg-green-700 transition shadow-md"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}
