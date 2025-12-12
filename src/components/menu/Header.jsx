import CartButton from "./CartButton";

export default function Header({ navigate, cart, params, animateCount }) {
  return (
    <header className="sticky top-0 z-30">
      <div className="backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-md">

        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between relative">

          {/* LEFT — DISHPOP (Home Button) */}
          <button
            onClick={() => navigate(`/${params.id}`)}
            className="text-2xl font-extrabold text-green-700 hover:text-green-800 transition"
          >
            <img
            src="/logo.svg"
            alt="DishPop Logo"
            className="w-14 sm:w-26 object-contain"
          />
          </button>

          {/* CENTER — PAGE TITLE
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-green-800">
  Menu
</h1> */}


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
