export default function CartButton({ navigate, cart, params, animateCount }) {
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="relative">
      <button
        onClick={() => navigate(`/cart/${params.id}`)}
        className="bg-gradient-to-r from-slate-800 to-slate-700 text-white 
                 px-6 py-2.5 rounded-full shadow-lg font-bold
                 hover:from-slate-700 hover:to-slate-600 hover:shadow-xl
                 active:scale-95 transition-all duration-200
                 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Cart
      </button>

      {itemCount > 0 && (
        <span
          className={`absolute -top-2 -right-2 bg-gradient-to-br from-amber-500 to-amber-600 
                   text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg
                   min-w-[24px] text-center border-2 border-white
                   transition-all duration-200 ${
                     animateCount ? "scale-125" : "scale-100"
                   }`}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
}