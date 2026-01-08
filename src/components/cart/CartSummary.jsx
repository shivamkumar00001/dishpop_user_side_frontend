// // export default function CartSummary({
// //   totalAmount,
// //   navigate,
// //   username,
// // }) {
// //   const safeTotal = Number(totalAmount || 0);

// //   return (
// //     <div
// //       className="bg-white rounded-2xl shadow-lg border border-slate-200
// //                  p-5 sm:p-6 space-y-5"
// //     >
// //       {/* TOTAL */}
// //       <div className="flex justify-between items-center">
// //         <span className="text-slate-600 text-sm sm:text-lg font-semibold">
// //           Total Amount
// //         </span>
// //         <span className="text-amber-600 text-xl sm:text-2xl font-bold">
// //           ₹ {safeTotal.toFixed(2)}
// //         </span>
// //       </div>

// //       {/* DIVIDER */}
// //       <div className="border-t border-slate-200 pt-4 space-y-4">
// //         {/* ADD MORE */}
// //         <button
// //           onClick={() => navigate(`/menu/${username}`)}
// //           className="w-full bg-amber-50 text-amber-700 border-2 border-amber-200
// //                      py-3 rounded-xl font-semibold
// //                      hover:bg-amber-100 hover:border-amber-300
// //                      active:scale-95 transition-all duration-200"
// //         >
// //           + Add More Items
// //         </button>

// //         {/* CHECKOUT */}
// //         <button
// //           disabled={safeTotal <= 0}
// //           onClick={() => navigate(`/checkout/${username}`)}
// //           className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white
// //                      py-3 rounded-xl font-bold shadow-md
// //                      hover:from-slate-700 hover:to-slate-600 hover:shadow-lg
// //                      disabled:opacity-40 disabled:cursor-not-allowed
// //                      active:scale-95 transition-all duration-200"
// //         >
// //           Proceed to Checkout →
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// import CartItem from "./CartItem";

// export default function CartSummary({
//   cart,
//   itemsTotal,
//   taxAmount,
//   grandTotal,
//   onAddMore,
//   increaseQty,
//   decreaseQty,
// }) {
//   return (
//     <>
//       {/* ORDER SUMMARY */}
//       <section className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
//         <div className="px-4 py-3 border-b bg-slate-50">
//           <h2 className="font-semibold text-slate-900">
//             Order Summary
//           </h2>
//           <p className="text-xs text-slate-500 mt-0.5">
//             {cart.length} item{cart.length !== 1 && "s"}
//           </p>
//         </div>

//         {cart.map((item) => (
//           <CartItem
//             key={item.id}
//             item={item}
//             increaseQty={increaseQty}
//             decreaseQty={decreaseQty}
//           />
//         ))}

//         <button
//           onClick={onAddMore}
//           className="w-full py-3 text-sm font-semibold 
//                      text-emerald-600 border-t 
//                      hover:bg-emerald-50 transition"
//         >
//           + Add more items
//         </button>
//       </section>

//       {/* BILL DETAILS */}
//       <section className="mx-4 mt-4 bg-white rounded-2xl shadow-sm p-4 space-y-3">
//         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
//           Bill Details
//         </h3>

//         <div className="flex justify-between text-sm text-slate-700">
//           <span>Items total</span>
//           <span>₹{itemsTotal}</span>
//         </div>

//         <div className="flex justify-between text-sm text-slate-700">
//           <span>Tax</span>
//           <span>₹{taxAmount}</span>
//         </div>

//         <div className="border-t pt-3 flex justify-between font-semibold text-slate-900">
//           <span>Grand Total</span>
//           <span>₹{grandTotal}</span>
//         </div>
//       </section>
//     </>
//   );
// }






import CartItem from "./CartItem";

export default function CartSummary({
  cart,
  itemsTotal,
  taxAmount,
  grandTotal,
  onAddMore,
  increaseQty,
  decreaseQty,
}) {
  return (
    <>
      {/* ORDER SUMMARY */}
      <section className="mx-4 md:mx-6 mt-6 bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Order Summary
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            {cart.length} item{cart.length !== 1 && "s"} added
          </p>
        </div>

        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        ))}

        <button
          onClick={onAddMore}
          className="w-full py-4 text-sm font-bold 
                     text-green-600 border-t border-gray-200
                     hover:bg-green-50 transition-colors"
        >
          + Add More Items
        </button>
      </section>

      {/* BILL DETAILS */}
      <section className="mx-4 md:mx-6 mt-4 bg-white rounded-3xl shadow-md border border-gray-200 p-5 space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <span>💰</span> Bill Details
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Items Total</span>
            <span className="font-semibold">₹{itemsTotal}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700">
            <span>Tax & Charges</span>
            <span className="font-semibold">₹{taxAmount}</span>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Grand Total</span>
          <span className="text-2xl font-extrabold text-green-600">₹{grandTotal}</span>
        </div>
      </section>
    </>
  );
}