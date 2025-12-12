export default function CategorySelector({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-6 flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 whitespace-nowrap rounded-full text-sm shadow-md transition ${
            activeCategory === cat
              ? "bg-green-600 text-white"
              : "bg-white text-green-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
