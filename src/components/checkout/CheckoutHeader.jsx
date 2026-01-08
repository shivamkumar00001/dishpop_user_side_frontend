// export default function CheckoutHeader({ navigate, username }) {
//   return (
//     <header className="bg-white/90 backdrop-blur-md sticky top-0 shadow-sm border-b border-slate-200 py-4 z-30">
//       <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>

//         <button
//           onClick={() => navigate(`/cart/${username}`)}
//           className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-2.5 rounded-full
//                    font-semibold shadow-md hover:shadow-lg
//                    hover:from-slate-700 hover:to-slate-600
//                    active:scale-95 transition-all duration-200
//                    flex items-center gap-2"
//         >
//           ← Back to Cart
//         </button>
//       </div>
//     </header>
//   );
// }
export default function CheckoutHeader({ username, onBack }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-emerald-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full 
                     bg-emerald-100 text-emerald-700 
                     hover:bg-emerald-200 transition"
        >
          ←
        </button>

        <div>
          <h1 className="text-lg font-semibold text-emerald-900">
            Checkout
          </h1>
          <p className="text-xs text-emerald-600">
            Ordering from {username}
          </p>
        </div>
      </div>
    </header>
  );
}
