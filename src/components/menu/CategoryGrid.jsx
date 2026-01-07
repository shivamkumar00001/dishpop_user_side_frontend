import { useNavigate, useParams } from "react-router-dom";

export default function CategoryGrid({ categories }) {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const visibleCategories = categories.filter((c) => c.imageUrl);
  const totalItems = visibleCategories.length + 1;
  const useScrollableRow = totalItems <= 10;

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <h2 className="text-[26px] font-black italic uppercase tracking-tight text-slate-800 mb-5">
        WHAT'S ON YOUR MIND?
      </h2>

      <div
        className={
          useScrollableRow
            ? "flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide"
            : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 sm:gap-6 lg:gap-8"
        }
      >
        {/* ALL */}
        {/* <button
          onClick={() => navigate(`/menu/${username}`)}
          className="group flex flex-col items-center transition-transform duration-300 hover:scale-105 flex-shrink-0"
        >
          <div className="w-17 h-17 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mb-2 sm:mb-3">
            <div className="text-3xl sm:text-4xl lg:text-5xl">🍽️</div>
          </div>
          <p className="font-bold text-sm sm:text-base lg:text-lg text-slate-800 whitespace-nowrap">
            All
          </p>
        </button> */}

        {/* CATEGORIES */}
        {visibleCategories.map((cat) => (
          <button
            key={cat.categoryId}
            onClick={() =>
              navigate(`/menu/${username}/category/${cat.categoryName}`)
            }
            className="group flex flex-col items-center transition-transform duration-300 hover:scale-105 flex-shrink-0"
          >
            <div className="w-17 h-17 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden flex items-center justify-center mb-2 sm:mb-3 bg-white shadow-sm hover:shadow-md transition-shadow">
              <img
                src={cat.imageUrl}
                alt={cat.categoryName}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-bold text-sm sm:text-base lg:text-lg text-slate-800 whitespace-nowrap">
              {cat.categoryName}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
