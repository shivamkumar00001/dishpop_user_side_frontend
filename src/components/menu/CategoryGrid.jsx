import { useNavigate, useParams } from "react-router-dom";

export default function CategoryGrid({ categories }) {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const visibleCategories = categories.filter((c) => c.imageUrl);

  // Split categories into rows of 10
  const rows = [];
  for (let i = 0; i < visibleCategories.length; i += 10) {
    rows.push(visibleCategories.slice(i, i + 10));
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <h2 className="text-[26px] font-black italic uppercase tracking-tight text-slate-800 mb-5">
        WHAT'S ON YOUR MIND?
      </h2>

      <div className="space-y-6">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${row[0]?.categoryId || rowIndex}`}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-2"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {row.map((cat) => (
              <button
                key={cat.categoryId || cat.id}
                onClick={() =>
                  navigate(`/menu/${username}/category/${cat.categoryName}`)
                }
                className="
                  flex-shrink-0
                  w-[88px] sm:w-[96px] lg:w-[112px]
                  flex flex-col items-center
                  transition-transform duration-300
                  hover:scale-105
                  select-none
                "
              >
                <div
                  className="
                    w-16 h-16
                    sm:w-20 sm:h-20
                    lg:w-24 lg:h-24
                    rounded-full overflow-hidden
                    flex items-center justify-center
                    mb-2 bg-white shadow-sm
                    hover:shadow-md transition-shadow
                  "
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.categoryName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p
                  className="
                    text-center
                    font-bold
                    text-xs sm:text-sm lg:text-base
                    text-slate-800
                    leading-tight
                    line-clamp-2
                  "
                >
                  {cat.categoryName}
                </p>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
