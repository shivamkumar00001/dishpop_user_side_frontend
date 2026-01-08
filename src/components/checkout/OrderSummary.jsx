// export default function OrderSummary({
//   cart,
//   totalAmount,
//   loading,
//   handleCheckout,
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:flex-1">
//       <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
//         <span className="text-amber-600">📋</span>
//         Order Summary
//       </h2>

//       <div className="space-y-4 max-h-64 overflow-y-auto pr-1 scrollbar-hide">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="border-b border-slate-200 pb-3 last:border-none"
//           >
//             <div className="flex justify-between text-sm font-semibold text-slate-800">
//               <span>{item.name} × {item.qty}</span>
//               <span className="text-amber-600">₹{item.totalPrice}</span>
//             </div>

//             <p className="text-xs text-slate-600 mt-1">
//               Variant: {item.variant.name} (₹{item.variant.price})
//             </p>

//             {item.addons?.length > 0 && (
//               <div className="mt-1 space-y-0.5">
//                 {item.addons.map(addon => (
//                   <p
//                     key={addon.id}
//                     className="text-xs text-slate-600"
//                   >
//                     + {addon.name} (₹{addon.price})
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between text-lg font-bold">
//         <span className="text-slate-800">Total Amount</span>
//         <span className="text-amber-600 text-xl">₹{totalAmount}</span>
//       </div>

//       <button
//         onClick={handleCheckout}
//         disabled={loading}
//         className={`
//           w-full mt-6 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-md
//           ${loading
//             ? "bg-slate-300 cursor-not-allowed text-slate-500"
//             : "bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white hover:shadow-lg active:scale-95"}
//         `}
//       >
//         {loading ? "Placing Order..." : "Confirm Order"}
//       </button>

//       <p className="text-xs text-slate-500 text-center mt-3">
//         Your order will be sent directly to the kitchen
//       </p>
//     </div>
//   );
// }
export default function OrderSummary({
  cart,
  loading,
  grandTotal,
  onCheckout,
}) {
  return (
    <div className="bg-white rounded-3xl border border-emerald-200 shadow-lg p-6 space-y-4">
      <h2 className="text-sm font-semibold text-emerald-900">
        Order Summary
      </h2>

      {/* ITEMS */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-emerald-700 truncate">
              {item.name} × {item.qty}
            </span>
            <span className="font-semibold text-emerald-900">
              ₹{item.totalPrice}
            </span>
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="border-t border-emerald-200 pt-3 flex justify-between text-sm font-semibold">
        <span className="text-emerald-700">Grand Total</span>
        <span className="text-emerald-900">₹{grandTotal}</span>
      </div>

      {/* CTA */}
      <button
        disabled={loading}
        onClick={onCheckout}
        className="w-full bg-emerald-600 hover:bg-emerald-700
                   text-white py-4 rounded-2xl font-semibold
                   shadow-xl active:scale-[0.98]
                   disabled:opacity-60 transition"
      >
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
}
