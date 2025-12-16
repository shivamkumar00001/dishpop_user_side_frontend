export default function CustomerDetails({ details, handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-green-800 mb-6">
        Customer Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-gray-600">
            Name *
          </label>
          <input
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Your name"
            className="mt-1 w-full p-3 rounded-xl border
            focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Phone (optional)
          </label>
          <input
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="mt-1 w-full p-3 rounded-xl border
            focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Table Number *
          </label>
          <input
            name="tableNumber"
            value={details.tableNumber}
            onChange={handleChange}
            placeholder="Table no."
            className="mt-1 w-full p-3 rounded-xl border
            focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-gray-600">
            Notes for kitchen (optional)
          </label>
          <textarea
            name="description"
            value={details.description}
            onChange={handleChange}
            placeholder="Less spicy, no onion, etc."
            className="mt-1 w-full p-3 rounded-xl border h-28 resize-none
            focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
    </div>
  );
}
