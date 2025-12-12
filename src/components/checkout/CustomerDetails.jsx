export default function CustomerDetails({ details, handleChange }) {
  return (
    <div className="w-full lg:w-2/3 bg-white p-6 rounded-2xl shadow-md border border-green-100">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Enter Your Details
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={details.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          value={details.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <input
          type="number"
          name="tableNumber"
          placeholder="Table Number"
          value={details.tableNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <textarea
          name="description"
          placeholder="Anything else? (Optional)"
          value={details.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 h-28"
        />
      </div>
    </div>
  );
}
