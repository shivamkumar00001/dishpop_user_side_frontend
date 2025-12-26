export default function CategorySelector({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-6 overflow-hidden">
      <div className="flex gap-3 overflow-x-auto pb-3 
                    scrollbar-hide
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap
                     transition-all duration-300 shadow-sm flex-shrink-0
                     ${
                       activeCategory === cat
                         ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg scale-105"
                         : "bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                     }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}