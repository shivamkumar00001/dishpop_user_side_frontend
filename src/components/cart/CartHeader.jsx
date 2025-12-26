export default function CartHeader({ cart, navigate, username }) {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-20 py-4 border-b border-slate-200">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Your Cart
        </h1>

        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-2.5 rounded-full 
                   shadow-md hover:shadow-lg hover:from-slate-700 hover:to-slate-600
                   active:scale-95 transition-all duration-200 font-semibold
                   flex items-center gap-2"
        >
          ← Back to Menu
        </button>
      </div>
    </header>
  );
}