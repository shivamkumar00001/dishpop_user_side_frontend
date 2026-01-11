// // export default function CartItem({ item, increaseQty, decreaseQty }) {
// //   return (
// //     <div
// //       className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-slate-200
// //                  hover:shadow-lg transition-shadow duration-200
// //                  flex flex-col sm:flex-row gap-4"
// //     >
// //       {/* IMAGE */}
// //       <img
// //         src={item.imageUrl}
// //         alt={item.name}
// //         className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover self-start shadow-sm"
// //       />

// //       {/* CONTENT */}
// //       <div className="flex-1 flex flex-col justify-between">
// //         <div>
// //           <h2 className="font-bold text-base sm:text-lg text-slate-800">
// //             {item.name}
// //           </h2>

// //           {/* VARIANT */}
// //           <p className="text-sm text-slate-600 mt-1">
// //             {item.variant?.name} · ₹ {item.unitPrice}
// //           </p>

// //           {/* ADDONS */}
// //           {item.addons?.length > 0 && (
// //             <p className="text-xs text-slate-500 mt-1 line-clamp-2">
// //               Add-ons: {item.addons.map(a => a.name).join(", ")}
// //             </p>
// //           )}
// //         </div>

// //         {/* QTY + TOTAL (MOBILE INLINE) */}
// //         <div className="mt-4 sm:mt-3 flex items-center justify-between sm:justify-start sm:gap-6">
// //           {/* QTY CONTROLS */}
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => decreaseQty(item.id)}
// //               className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200
// //                          text-slate-700 text-lg font-bold active:scale-95
// //                          transition-all duration-200"
// //             >
// //               −
// //             </button>

// //             <span className="font-bold text-base text-slate-800">
// //               {item.qty}
// //             </span>

// //             <button
// //               onClick={() => increaseQty(item.id)}
// //               className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600
// //                          text-white text-lg font-bold active:scale-95
// //                          hover:from-amber-600 hover:to-amber-700 shadow-md
// //                          transition-all duration-200"
// //             >
// //               +
// //             </button>
// //           </div>

// //           {/* TOTAL (MOBILE) */}
// //           <div className="sm:hidden font-bold text-amber-600 text-lg">
// //             ₹ {item.totalPrice}
// //           </div>
// //         </div>
// //       </div>

// //       {/* TOTAL (DESKTOP) */}
// //       <div className="hidden sm:flex font-bold text-amber-600
// //                       items-center text-xl">
// //         ₹ {item.totalPrice}
// //       </div>
// //     </div>
// //   );
// // }



// export default function CartItem({
//   item,
//   increaseQty,
//   decreaseQty,
// }) {
//   const imageSrc =
//     item.image ||
//     item.imageUrl ||
//     item.photo ||
//     item.images?.[0] ||
//     "/placeholder-food.png";

//   return (
//     <div className="flex items-center gap-4 px-4 py-4 border-b last:border-none">
//       {/* IMAGE */}
//       <img
//         src={imageSrc}
//         alt={item.name}
//         className="w-14 h-14 rounded-xl object-cover bg-slate-200"
//         onError={(e) =>
//           (e.currentTarget.src = "/placeholder-food.png")
//         }
//       />

//       {/* INFO */}
//       <div className="flex-1 min-w-0">
//         <p className="font-medium text-slate-900 truncate">
//           {item.name}
//         </p>
//         <p className="text-xs text-slate-500 mt-0.5">
//           {item.quantityLabel || "Standard serving"}
//         </p>
//       </div>

//       {/* CONTROLS */}
//       <div className="flex flex-col items-end gap-2">
//         <div className="flex items-center rounded-full border bg-white shadow-sm overflow-hidden">
//           <button
//             onClick={() => decreaseQty(item.id)}
//             className="w-8 h-8 flex items-center justify-center 
//                        text-slate-600 hover:bg-slate-100 transition"
//           >
//             −
//           </button>

//           <span className="w-8 text-center text-sm font-semibold text-slate-900">
//             {item.qty}
//           </span>

//           <button
//             onClick={() => increaseQty(item.id)}
//             className="w-8 h-8 flex items-center justify-center 
//                        bg-emerald-600 text-white 
//                        hover:bg-emerald-700 active:scale-95 transition"
//           >
//             +
//           </button>
//         </div>

//         <p className="text-sm font-semibold text-slate-900">
//           ₹{item.totalPrice}
//         </p>
//       </div>
//     </div>
//   );
// }
export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
}) {
  const imageSrc =
    item.image ||
    item.imageUrl ||
    item.photo ||
    item.images?.[0] ||
    "/placeholder-food.png";

  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-200 last:border-none hover:bg-gray-50 transition-colors">
      {/* IMAGE */}
      <img
        src={imageSrc}
        alt={item.name}
        className="w-16 h-16 rounded-2xl object-cover bg-gray-200 shadow-sm"
        onError={(e) =>
          (e.currentTarget.src = "/placeholder-food.png")
        }
      />

{/* INFO */}
<div className="flex-1 min-w-0">
  {/* ITEM NAME */}
  <p className="font-bold text-gray-900 truncate">
    {item.name}
  </p>

  {/* VARIANT */}
  {item.variant?.name && (
    <p className="text-xs text-gray-600 mt-0.5">
      {item.variant.name}
      {item.variant.price != null && (
        <span className="ml-1 text-gray-500">
          (₹{item.variant.price})
        </span>
      )}
    </p>
  )}

  {/* ADDONS */}
  {Array.isArray(item.addons) && item.addons.length > 0 && (
    <div className="mt-1 space-y-0.5">
      <p className="text-[11px] font-semibold text-gray-500">
        Add-ons:
      </p>

      {item.addons.map((addon, idx) => (
        <div
          key={idx}
          className="flex justify-between text-xs text-gray-600"
        >
          <span>• {addon.name}</span>
          <span className="text-gray-500">
            +₹{addon.price}
          </span>
        </div>
      ))}
    </div>
  )}

  {/* PRICE */}
  <p className="text-sm font-bold text-green-600 mt-1">
    ₹{item.totalPrice}
    {item.qty > 1 && (
      <span className="ml-1 text-xs text-gray-500 font-medium">
        ({item.qty} × ₹{item.unitPrice})
      </span>
    )}
  </p>
</div>

      {/* CONTROLS */}
      <div className="flex items-center rounded-full border-2 border-gray-200 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => decreaseQty(item.id)}
          className="w-9 h-9 flex items-center justify-center 
                     text-gray-700 hover:bg-gray-100 transition font-bold text-lg"
        >
          −
        </button>

        <span className="w-10 text-center text-sm font-bold text-gray-900">
          {item.qty}
        </span>

        <button
          onClick={() => increaseQty(item.id)}
          className="w-9 h-9 flex items-center justify-center 
                     bg-green-600 text-white 
                     hover:bg-green-700 active:scale-95 transition font-bold text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}