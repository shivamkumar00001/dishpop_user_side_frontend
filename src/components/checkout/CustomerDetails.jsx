export default function CustomerDetails({ details, handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:flex-1">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="text-amber-600">👤</span>
        Customer Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* NAME */}
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full p-3 rounded-xl border-2 border-slate-200
            focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
            transition-all duration-200"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full p-3 rounded-xl border-2 border-slate-200
            focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
            transition-all duration-200"
          />
        </div>

        {/* TABLE NUMBER */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Table Number *
          </label>
          <input
            type="number"
            name="tableNumber"
            value={details.tableNumber}
            onChange={handleChange}
            placeholder="Table no."
            min="1"
            required
            className="w-full p-3 rounded-xl border-2 border-slate-200
            focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
            transition-all duration-200"
          />
        </div>

        {/* NOTES */}
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Notes for kitchen (optional)
          </label>
          <textarea
            name="description"
            value={details.description}
            onChange={handleChange}
            placeholder="Less spicy, no onion, etc."
            className="w-full p-3 rounded-xl border-2 border-slate-200 h-28 resize-none
            focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
            transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}