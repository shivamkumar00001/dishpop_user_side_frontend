import CartButton from "./CartButton";

export default function Header({ navigate, cart, params, animateCount }) {
  return (
    <header className="sticky top-0 z-30">
      <div className="backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* LEFT — DISHPOP LOGO (Home Button) */}
          <button
            onClick={() => navigate(`/${params.id}`)}
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/logo.svg"
              alt="DishPop Logo"
              className="w-20 sm:w-16 h-auto object-contain"
            />
          </button>

          {/* RIGHT — CART BUTTON */}
          <CartButton
            navigate={navigate}
            cart={cart}
            params={params}
            animateCount={animateCount}
          />
        </div>
      </div>
    </header>
  );
}