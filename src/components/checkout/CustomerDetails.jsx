// // // export default function CustomerDetails({ details, handleChange }) {
// // //   return (
// // //     <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:flex-1">
// // //       <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
// // //         <span className="text-amber-600">👤</span>
// // //         Customer Details
// // //       </h2>

// // //       <div className="grid sm:grid-cols-2 gap-4">
// // //         {/* NAME */}
// // //         <div className="sm:col-span-2">
// // //           <label className="text-sm font-semibold text-slate-700 block mb-2">
// // //             Name *
// // //           </label>
// // //           <input
// // //             type="text"
// // //             name="name"
// // //             value={details.name}
// // //             onChange={handleChange}
// // //             placeholder="Your name"
// // //             required
// // //             className="w-full p-3 rounded-xl border-2 border-slate-200
// // //             focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
// // //             transition-all duration-200"
// // //           />
// // //         </div>

// // //         {/* PHONE */}
// // //         <div>
// // //           <label className="text-sm font-semibold text-slate-700 block mb-2">
// // //             Phone (optional)
// // //           </label>
// // //           <input
// // //             type="tel"
// // //             name="phone"
// // //             value={details.phone}
// // //             onChange={handleChange}
// // //             placeholder="Phone number"
// // //             className="w-full p-3 rounded-xl border-2 border-slate-200
// // //             focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
// // //             transition-all duration-200"
// // //           />
// // //         </div>

// // //         {/* TABLE NUMBER */}
// // //         <div>
// // //           <label className="text-sm font-semibold text-slate-700 block mb-2">
// // //             Table Number *
// // //           </label>
// // //           <input
// // //             type="number"
// // //             name="tableNumber"
// // //             value={details.tableNumber}
// // //             onChange={handleChange}
// // //             placeholder="Table no."
// // //             min="1"
// // //             required
// // //             className="w-full p-3 rounded-xl border-2 border-slate-200
// // //             focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
// // //             transition-all duration-200"
// // //           />
// // //         </div>

// // //         {/* NOTES */}
// // //         <div className="sm:col-span-2">
// // //           <label className="text-sm font-semibold text-slate-700 block mb-2">
// // //             Notes for kitchen (optional)
// // //           </label>
// // //           <textarea
// // //             name="description"
// // //             value={details.description}
// // //             onChange={handleChange}
// // //             placeholder="Less spicy, no onion, etc."
// // //             className="w-full p-3 rounded-xl border-2 border-slate-200 h-28 resize-none
// // //             focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
// // //             transition-all duration-200"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // export default function CustomerDetails({ details, onChange }) {
// //   return (
// //     <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6">
// //       <h2 className="text-sm font-semibold text-emerald-900 mb-4">
// //         Customer & Table Details
// //       </h2>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //         {[
// //           { label: "Customer Name *", name: "name" },
// //           { label: "Phone Number", name: "phone" },
// //           { label: "Table Number *", name: "tableNumber" },
// //         ].map((f) => (
// //           <div key={f.name}>
// //             <label className="block text-xs font-medium text-emerald-700 mb-1">
// //               {f.label}
// //             </label>
// //             <input
// //               name={f.name}
// //               value={details[f.name]}
// //               onChange={onChange}
// //               className="w-full rounded-xl border border-emerald-300 
// //                          px-4 py-3 text-sm
// //                          focus:ring-2 focus:ring-emerald-500 
// //                          focus:border-emerald-500 outline-none"
// //             />
// //           </div>
// //         ))}
// //       </div>

// //       {/* DESCRIPTION */}
// //       <div className="mt-4">
// //         <label className="block text-xs font-medium text-emerald-700 mb-1">
// //           Order Notes (optional)
// //         </label>
// //         <textarea
// //           name="description"
// //           value={details.description}
// //           onChange={onChange}
// //           rows={3}
// //           placeholder="Any special instructions? (less spicy, no onions, etc.)"
// //           className="w-full rounded-xl border border-emerald-300
// //                      px-4 py-3 text-sm resize-none
// //                      focus:ring-2 focus:ring-emerald-500
// //                      focus:border-emerald-500 outline-none"
// //         />
// //       </div>
// //     </div>
// //   );
// // }
// export default function CustomerDetails({ details, onChange }) {
//   return (
//     <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6">
//       <h2 className="text-sm font-semibold text-emerald-900 mb-4">
//         Customer & Table Details
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {[
//           { label: "Customer Name *", name: "name" },
//           { label: "Phone Number", name: "phone" },
//           { label: "Table Number *", name: "tableNumber" },
//         ].map((f) => (
//           <div key={f.name}>
//             <label className="block text-xs font-medium text-emerald-700 mb-1">
//               {f.label}
//             </label>
//             <input
//               name={f.name}
//               value={details[f.name]}
//               onChange={onChange}
//               className="w-full rounded-xl border border-emerald-300 
//                          px-4 py-3 text-sm
//                          focus:ring-2 focus:ring-emerald-500 
//                          focus:border-emerald-500 outline-none"
//             />
//           </div>
//         ))}
//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-4">
//         <label className="block text-xs font-medium text-emerald-700 mb-1">
//           Order Notes (optional)
//         </label>
//         <textarea
//           name="description"
//           value={details.description}
//           onChange={onChange}
//           rows={3}
//           placeholder="Any special instructions? (less spicy, no onions, etc.)"
//           className="w-full rounded-xl border border-emerald-300
//                      px-4 py-3 text-sm resize-none
//                      focus:ring-2 focus:ring-emerald-500
//                      focus:border-emerald-500 outline-none"
//         />
//       </div>
//     </div>
//   );
// }












// export default function CustomerDetails({ details, onChange }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6">
//       <h2 className="text-lg font-bold text-gray-900 mb-5">
//         Customer & Table Details
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         {[
//           { label: "Customer Name *", name: "name" },
//           { label: "Phone Number", name: "phone" },
//           { label: "Table Number *", name: "tableNumber" },
//         ].map((f) => (
//           <div key={f.name}>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               {f.label}
//             </label>
//             <input
//               name={f.name}
//               value={details[f.name]}
//               onChange={onChange}
//               className="w-full rounded-xl border-2 border-gray-300 
//                          px-4 py-3 text-sm
//                          focus:ring-2 focus:ring-green-500 
//                          focus:border-green-500 outline-none
//                          hover:border-gray-400 transition-colors"
//             />
//           </div>
//         ))}
//       </div>

//       {/* DESCRIPTION */}
//       <div className="mt-5">
//         <label className="block text-sm font-semibold text-gray-700 mb-2">
//           Order Notes (optional)
//         </label>
//         <textarea
//           name="description"
//           value={details.description}
//           onChange={onChange}
//           rows={3}
//           placeholder="Any special instructions? (less spicy, no onions, etc.)"
//           className="w-full rounded-xl border-2 border-gray-300
//                      px-4 py-3 text-sm resize-none
//                      focus:ring-2 focus:ring-green-500
//                      focus:border-green-500 outline-none
//                      hover:border-gray-400 transition-colors"
//         />
//       </div>
//     </div>
//   );
// }




export default function CustomerDetails({ details, onChange, orderType }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold">2</span>
        {orderType === "ONLINE" ? "Delivery Details" : "Customer Details"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className={orderType === "DINE_IN" ? "" : "sm:col-span-2"}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Customer Name *
          </label>
          <input
            name="name"
            value={details.name}
            onChange={onChange}
            placeholder="Enter your name"
            className="w-full rounded-xl border-2 border-gray-300 
                       px-4 py-3 text-sm
                       focus:ring-2 focus:ring-emerald-500 
                       focus:border-emerald-500 outline-none
                       hover:border-gray-400 transition-colors"
          />
        </div>

        <div className={orderType === "DINE_IN" ? "" : "sm:col-span-2"}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            name="phone"
            value={details.phone}
            onChange={onChange}
            placeholder="Enter phone number"
            className="w-full rounded-xl border-2 border-gray-300 
                       px-4 py-3 text-sm
                       focus:ring-2 focus:ring-emerald-500 
                       focus:border-emerald-500 outline-none
                       hover:border-gray-400 transition-colors"
          />
        </div>

        {orderType === "DINE_IN" && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Table Number *
            </label>
            <input
              name="tableNumber"
              value={details.tableNumber}
              onChange={onChange}
              placeholder="Enter table number"
              className="w-full rounded-xl border-2 border-gray-300 
                         px-4 py-3 text-sm
                         focus:ring-2 focus:ring-emerald-500 
                         focus:border-emerald-500 outline-none
                         hover:border-gray-400 transition-colors"
            />
          </div>
        )}

        {orderType === "ONLINE" && (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                name="line1"
                value={details.line1}
                onChange={onChange}
                rows={3}
                placeholder="House no, Street, Area, Landmark"
                className="w-full rounded-xl border-2 border-gray-300
                           px-4 py-3 text-sm resize-none
                           focus:ring-2 focus:ring-emerald-500
                           focus:border-emerald-500 outline-none
                           hover:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                name="city"
                value={details.city}
                onChange={onChange}
                placeholder="Enter city"
                className="w-full rounded-xl border-2 border-gray-300 
                           px-4 py-3 text-sm
                           focus:ring-2 focus:ring-emerald-500 
                           focus:border-emerald-500 outline-none
                           hover:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                name="state"
                value={details.state}
                onChange={onChange}
                placeholder="Enter state"
                className="w-full rounded-xl border-2 border-gray-300 
                           px-4 py-3 text-sm
                           focus:ring-2 focus:ring-emerald-500 
                           focus:border-emerald-500 outline-none
                           hover:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                name="pincode"
                value={details.pincode}
                onChange={onChange}
                placeholder="Enter pincode"
                className="w-full rounded-xl border-2 border-gray-300 
                           px-4 py-3 text-sm
                           focus:ring-2 focus:ring-emerald-500 
                           focus:border-emerald-500 outline-none
                           hover:border-gray-400 transition-colors"
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Order Notes (optional)
        </label>
        <textarea
          name="description"
          value={details.description}
          onChange={onChange}
          rows={3}
          placeholder="Any special instructions? (less spicy, no onions, etc.)"
          className="w-full rounded-xl border-2 border-gray-300
                     px-4 py-3 text-sm resize-none
                     focus:ring-2 focus:ring-emerald-500
                     focus:border-emerald-500 outline-none
                     hover:border-gray-400 transition-colors"
        />
      </div>
    </div>
  );
}