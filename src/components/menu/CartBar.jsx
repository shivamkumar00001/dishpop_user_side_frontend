import { useNavigate, useParams } from "react-router-dom";

export default function CartBar({ cart }) {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!cart.length) return null;

  const totalItems = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (item.totalPrice ?? Number(item.unitPrice || 0) * Number(item.qty || 0)),
    0
  );

  return (
    <div
      onClick={() => navigate(`/cart/${id}`)}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[40] cursor-pointer"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-emerald-500/25 blur-xl rounded-full scale-110" />

      {/* MAIN BAR */}
      <div
        className="
          relative overflow-hidden
          flex items-center gap-4
          px-6 py-3
          rounded-full
          bg-gradient-to-br from-emerald-600/95 to-emerald-700/95
          border border-white/20
          transition-transform
          active:scale-[0.97]
        "
      >
        {/* ✨ CONTINUOUS SHINE */}
     <div
  className="
    pointer-events-none
    absolute inset-0
    -skew-x-12
    bg-gradient-to-r
    from-transparent
    via-white/15
    to-transparent
    opacity-70
    animate-[cart-shine_3s_linear_infinite]
  "
/>


        {/* CART ICON */}
        <div className="relative p-2 bg-white/10 rounded-xl backdrop-blur-sm">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4
                 M7 13L5.4 5
                 M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17
                 m0 0a2 2 0 100 4 2 2 0 000-4
                 zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {/* BADGE */}
          <span className="
            absolute -top-1 -right-1
            bg-amber-400 text-white
            text-[10px] font-bold
            px-1.5 py-0.5
            rounded-full
            shadow
            border border-white/30
          ">
            {totalItems}
          </span>
        </div>

        {/* TEXT */}
        <div className="flex flex-col leading-tight">
          <span className="text-white/70 text-[10px] uppercase tracking-wide">
            {totalItems === 1 ? "Item" : "Items"}
          </span>
          <span className="text-white font-bold text-sm">
            ₹{totalPrice}
          </span>
        </div>

        {/* ARROW */}
        <div className="ml-1 p-1.5 bg-white/10 rounded-lg">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
