// // export default function OrderSummary({
// //   cart,
// //   totalAmount,
// //   loading,
// //   handleCheckout,
// // }) {
// //   return (
// //     <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:flex-1">
// //       <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
// //         <span className="text-amber-600">📋</span>
// //         Order Summary
// //       </h2>

// //       <div className="space-y-4 max-h-64 overflow-y-auto pr-1 scrollbar-hide">
// //         {cart.map((item) => (
// //           <div
// //             key={item.id}
// //             className="border-b border-slate-200 pb-3 last:border-none"
// //           >
// //             <div className="flex justify-between text-sm font-semibold text-slate-800">
// //               <span>{item.name} × {item.qty}</span>
// //               <span className="text-amber-600">₹{item.totalPrice}</span>
// //             </div>

// //             <p className="text-xs text-slate-600 mt-1">
// //               Variant: {item.variant.name} (₹{item.variant.price})
// //             </p>

// //             {item.addons?.length > 0 && (
// //               <div className="mt-1 space-y-0.5">
// //                 {item.addons.map(addon => (
// //                   <p
// //                     key={addon.id}
// //                     className="text-xs text-slate-600"
// //                   >
// //                     + {addon.name} (₹{addon.price})
// //                   </p>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between text-lg font-bold">
// //         <span className="text-slate-800">Total Amount</span>
// //         <span className="text-amber-600 text-xl">₹{totalAmount}</span>
// //       </div>

// //       <button
// //         onClick={handleCheckout}
// //         disabled={loading}
// //         className={`
// //           w-full mt-6 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-md
// //           ${loading
// //             ? "bg-slate-300 cursor-not-allowed text-slate-500"
// //             : "bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white hover:shadow-lg active:scale-95"}
// //         `}
// //       >
// //         {loading ? "Placing Order..." : "Confirm Order"}
// //       </button>

// //       <p className="text-xs text-slate-500 text-center mt-3">
// //         Your order will be sent directly to the kitchen
// //       </p>
// //     </div>
// //   );
// // }
// export default function OrderSummary({
//   cart,
//   loading,
//   grandTotal,
//   onCheckout,
// }) {
//   return (
//     <div className="bg-white rounded-3xl border border-emerald-200 shadow-lg p-6 space-y-4">
//       <h2 className="text-sm font-semibold text-emerald-900">
//         Order Summary
//       </h2>

//       {/* ITEMS */}
//       <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex justify-between items-center text-sm"
//           >
//             <span className="text-emerald-700 truncate">
//               {item.name} × {item.qty}
//             </span>
//             <span className="font-semibold text-emerald-900">
//               ₹{item.totalPrice}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* DIVIDER */}
//       <div className="border-t border-emerald-200 pt-3 flex justify-between text-sm font-semibold">
//         <span className="text-emerald-700">Grand Total</span>
//         <span className="text-emerald-900">₹{grandTotal}</span>
//       </div>

//       {/* CTA */}
//       <button
//         disabled={loading}
//         onClick={onCheckout}
//         className="w-full bg-emerald-600 hover:bg-emerald-700
//                    text-white py-4 rounded-2xl font-semibold
//                    shadow-xl active:scale-[0.98]
//                    disabled:opacity-60 transition"
//       >
//         {loading ? "Placing Order..." : "Confirm Order"}
//       </button>
//     </div>
//   );
// }










// export default function OrderSummary({
//   cart,
//   loading,
//   grandTotal,
//   onCheckout,
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow p-6 space-y-5">
//       <h2 className="text-lg font-bold text-gray-900">
//         Order Summary
//       </h2>

//  {/* ITEMS */}
// <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
//   {cart.map((item) => (
//     <div
//       key={item.id}
//       className="py-2 border-b border-gray-100 last:border-0"
//     >
//       {/* ITEM NAME */}
//       <div className="flex justify-between text-sm font-semibold text-gray-800">
//         <span>
//           {item.name} × {item.qty}
//         </span>
//         <span>₹{item.totalPrice}</span>
//       </div>

//       {/* VARIANT */}
//       {item.variant?.name && (
//         <p className="text-xs text-gray-600 mt-0.5">
//           {item.variant.name}
//           {item.variant.price != null && (
//             <span className="ml-1 text-gray-500">
//               (₹{item.variant.price})
//             </span>
//           )}
//         </p>
//       )}

//       {/* ADDONS */}
//       {Array.isArray(item.addons) && item.addons.length > 0 && (
//         <div className="mt-1 space-y-0.5">
//           {item.addons.map((addon, idx) => (
//             <div
//               key={idx}
//               className="flex justify-between text-xs text-gray-500"
//             >
//               <span>• {addon.name}</span>
//               <span>+₹{addon.price}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   ))}
// </div>


//       {/* DIVIDER */}
//       <div className="border-t-2 border-gray-200 pt-4 flex justify-between text-base font-bold">
//         <span className="text-gray-700">Grand Total</span>
//         <span className="text-gray-900 text-lg">₹{grandTotal}</span>
//       </div>

//       {/* CTA */}
//       <button
//         disabled={loading}
//         onClick={onCheckout}
//         className="w-full bg-green-600 hover:bg-green-700
//                    text-white py-4 rounded-xl font-bold text-base
//                    shadow-lg hover:shadow-xl active:scale-[0.98]
//                    disabled:opacity-60 disabled:cursor-not-allowed 
//                    transition-all duration-200"
//       >
//         {loading ? "Placing Order..." : "Confirm Order"}
//       </button>
//     </div>
//   );
// }








// components/checkout/OrderSummary.jsx
export default function OrderSummary({
  cart,
  loading,
  grandTotal,
  onCheckout,
  orderType,
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold">3</span>
          Order Summary
        </h2>
        <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {cart.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
          >
            <div className="flex gap-3">
              {item.imageUrl && (
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {item.name}
                  </h3>
                  <span className="font-bold text-emerald-600 text-sm whitespace-nowrap">
                    ₹{item.totalPrice}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">
                    Qty: {item.qty}
                  </span>
                  {item.variant?.name && (
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                      {item.variant.name}
                    </span>
                  )}
                </div>

                {Array.isArray(item.addons) && item.addons.length > 0 && (
                  <div className="space-y-1 mt-2 pt-2 border-t border-gray-100">
                    {item.addons.map((addon, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-xs text-gray-600"
                      >
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {addon.name}
                        </span>
                        <span className="font-medium">+₹{addon.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t-2 border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold">₹{grandTotal}</span>
        </div>
        
        {orderType === "ONLINE" && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Charges</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-emerald-600">₹{grandTotal}</span>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700
                   text-white py-4 rounded-2xl font-bold text-base
                   shadow-lg hover:shadow-xl active:scale-[0.98]
                   disabled:opacity-60 disabled:cursor-not-allowed 
                   transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Place Order</span>
          </>
        )}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          🔒 Your order is secure and encrypted
        </p>
      </div>
    </div>
  );
}