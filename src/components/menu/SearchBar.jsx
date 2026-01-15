// import { Search, ShoppingCart } from "react-feather";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function SearchBar({ value, onChange, cartCount = 0 }) {
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleCartClick = () => {
//     if (!username) return;
//     navigate(`/cart/${username}`);
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 z-[999]">
//       <div
//         className={`
//           backdrop-blur-xl border-b transition-all duration-300
//           ${
//             scrolled
//               ? "bg-white/50 border-slate-200/30 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
//               : "bg-emerald-600/90 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
//           }
//         `}
//       >
//         <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">

//           {/* SEARCH */}
//           <div className="group flex items-center flex-1 bg-white/90 rounded-full px-4 py-2.5 shadow-inner border border-emerald-200/40 focus-within:ring-2 focus-within:ring-emerald-500/40">
//             <Search size={17} className="text-emerald-600" />
//             <input
//               value={value}
//               onChange={(e) => onChange(e.target.value)}
//               placeholder="Search dishes, drinks…"
//               className="ml-3 w-full bg-transparent outline-none text-sm font-medium text-emerald-900 placeholder-emerald-600/70"
//             />
//           </div>

//           {/* CART */}
//           <button
//             onClick={handleCartClick}
//             className="relative shrink-0 rounded-full bg-emerald-700 p-2.5 shadow-lg hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all"
//           >
//             <ShoppingCart size={18} className="text-white" />

//             {cartCount > 0 && (
//               <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-white text-emerald-700 text-[10px] font-extrabold shadow">
//                 {cartCount}
//               </span>
//             )}
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }


import { Search, ShoppingCart } from "react-feather";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBar({ value, onChange, cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { id: username } = useParams();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCartClick = () => {
    if (!username) return;
    navigate(`/cart/${username}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[999]">
      <div
        className={`
          backdrop-blur-xl border-b transition-all duration-300
          ${
            scrolled
              ? "bg-white/50 border-slate-200/30 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
              : "bg-emerald-600/90 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          }
        `}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">

          {/* SEARCH */}
          <div className="group flex items-center flex-1 bg-white/90 rounded-full px-4 py-2.5 shadow-inner border border-emerald-200/40 focus-within:ring-2 focus-within:ring-emerald-500/40">
            <Search size={17} className="text-emerald-600" />
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search dishes, drinks…"
              className="ml-3 w-full bg-transparent outline-none text-sm font-medium text-emerald-900 placeholder-emerald-600/70"
            />
          </div>

          {/* CART */}
          <button
            onClick={handleCartClick}
            className="relative shrink-0 rounded-full bg-emerald-700 p-2.5 shadow-lg hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingCart size={18} className="text-white" />

            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-white text-emerald-700 text-[10px] font-extrabold shadow">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}