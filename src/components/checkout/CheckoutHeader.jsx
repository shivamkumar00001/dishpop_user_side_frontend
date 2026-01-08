 
// export default function CheckoutHeader({ username, onBack }) {
//   return (
//     <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-emerald-200">
//       <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
//         <button
//           onClick={onBack}
//           className="w-9 h-9 flex items-center justify-center rounded-full 
//                      bg-emerald-100 text-emerald-700 
//                      hover:bg-emerald-200 transition"
//         >
//           ←
//         </button>

//         <div>
//           <h1 className="text-lg font-semibold text-emerald-900">
//             Checkout
//           </h1>
//           <p className="text-xs text-emerald-600">
//             Ordering from {username}
//           </p>
//         </div>
//       </div>
//     </header>
//   );
// }
export default function CheckoutHeader({ username, onBack }) {
  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl 
                     bg-gray-100 text-gray-700 
                     hover:bg-gray-200 transition-all active:scale-95"
        >
          ←
        </button>

        <div>
          <h1 className="text-xl font-extrabold text-gray-900">
            Checkout
          </h1>
          <p className="text-sm text-gray-600">
            Ordering from {username}
          </p>
        </div>
      </div>
    </header>
  );
}