 
// // }
// export default function CartHeader({ onBack }) {
//   return (
//     <header className="bg-white px-4 py-4 flex items-center gap-3 border-b sticky top-0 z-10">
//       <button
//         onClick={onBack}
//         className="text-xl text-slate-700 hover:text-slate-900 transition"
//       >
//         ←
//       </button>

//       <h1 className="text-lg font-semibold text-slate-900">
//         Cart
//       </h1>
//     </header>
//   );
// }


import { ArrowLeft } from "lucide-react";

export default function CartHeader({ onBack }) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 px-4 md:px-6 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-md">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div>
        <h1 className="text-xl font-extrabold text-white">
          Your Cart
        </h1>
        <p className="text-xs text-white/80">Review your order</p>
      </div>
    </header>
  );
}