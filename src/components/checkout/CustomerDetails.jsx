export default function CustomerDetails({ details, handleChange }) {
  return (
    <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Your Details</h2>

      <div className="space-y-4">
        <input name="name" placeholder="Name" value={details.name}
          onChange={handleChange} className="w-full p-3 border rounded" />

        <input name="phone" placeholder="Phone" value={details.phone}
          onChange={handleChange} className="w-full p-3 border rounded" />

        <input name="tableNumber" placeholder="Table Number"
          value={details.tableNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded" />

        <textarea name="description" placeholder="Notes (optional)"
          value={details.description}
          onChange={handleChange}
          className="w-full p-3 border rounded h-28" />
      </div>
    </div>
  );
}
