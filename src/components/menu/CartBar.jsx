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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                 bg-gradient-to-r from-slate-800 to-slate-700 text-white 
                 px-8 py-4 rounded-2xl shadow-2xl 
                 flex items-center gap-6 cursor-pointer
                 hover:from-slate-700 hover:to-slate-600 hover:shadow-3xl
                 active:scale-95 transition-all duration-200
                 border border-slate-600/50"
    >
      {/* Cart Icon with Badge */}
      <div className="relative">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {totalItems}
        </span>
      </div>

      {/* Items Count */}
      <div className="flex items-center gap-3 font-semibold">
        <span className="text-white/90 text-sm">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
        
        {/* Divider */}
        <div className="h-6 w-px bg-white/30" />

        {/* Total Price */}
        <span className="text-amber-400 font-bold text-lg">₹{totalPrice}</span>
      </div>

      {/* Arrow */}
      <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}