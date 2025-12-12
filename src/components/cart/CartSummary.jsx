export default function CartSummary({ totalAmount, navigate, params }) {
  return (
    <div className="mt-6 bg-white p-5 rounded-xl shadow-md">

      <div className="flex justify-between text-lg font-bold text-green-700">
        <span>Total Amount:</span>
        <span>₹ {totalAmount}</span>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-4">
        
        <button
          onClick={() => navigate(`/menu/${params.id}`)}
          className="w-full bg-green-200 text-green-800 py-3 rounded-lg font-semibold
          hover:bg-green-300 transition"
        >
          Add More Items
        </button>

        <button
          onClick={() => navigate(`/checkout/${params.id}`)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
          hover:bg-green-700 transition shadow-md"
        >
          Proceed to Checkout
        </button>
      </div>
      
    </div>
  );
}
