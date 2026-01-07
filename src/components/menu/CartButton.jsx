import { useNavigate, useParams } from "react-router-dom";

export default function CartButton({ cart, animateCount }) {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleClick = () => {
    if (!username) return;
    navigate(`/cart/${username}`);
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleClick}
        className="
          h-11 px-5
          rounded-full
          bg-white/90 backdrop-blur
          border border-slate-200
          text-slate-800 font-semibold
          shadow-md
          hover:bg-white hover:shadow-lg
          active:scale-95
          transition-all duration-200
          flex items-center gap-2
        "
      >
        {/* ICON */}
        <svg
          className="w-5 h-5 text-emerald-600"
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

        <span className="text-sm">Cart</span>
      </button>

      {/* BADGE */}
      {itemCount > 0 && (
        <span
          className={`
            absolute -top-1.5 -right-1.5
            min-w-[22px] h-[22px]
            px-1
            flex items-center justify-center
            rounded-full
            bg-emerald-600 text-white
            text-[11px] font-bold
            shadow-md
            border-2 border-white
            transition-transform duration-200
            ${animateCount ? "scale-125" : "scale-100"}
          `}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
}
