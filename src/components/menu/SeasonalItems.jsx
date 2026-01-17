export default function SeasonalItems({ items, onAdd }) {
  if (!items || !items.length) return null;

  const month = new Date().getMonth();
  const isWinter = month >= 9 || month <= 1;
  const bgImage = isWinter ? "/winter.png" : "/summer.png";

  return (
    <section className="w-full">
      {/* ONE CONTINUOUS CANVAS */}
      <div className="relative w-full bg-[#3f6f57] overflow-hidden">
        
        {/* ===== BANNER IMAGE ===== */}
        <div
          className="
            relative w-full
            h-[160px]
            sm:h-[200px]
            md:h-[240px]
            lg:h-[280px]
          "
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* 🔥 BLEND GRADIENT (KEY PART) */}
          <div
            className="
              absolute bottom-0 left-0 w-full
              h-24 sm:h-28 md:h-32
              bg-gradient-to-b
              from-transparent
              to-[#3f6f57]
            "
          />
        </div>

        {/* ===== ITEMS (SAME COLOR AS FADE) ===== */}
        <div className="relative max-w-screen-2xl mx-auto px-4 pb-6 pt-2">
         <div
  className="
    flex gap-4
    overflow-x-auto scrollbar-hide
    whitespace-nowrap
  "
>

            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => onAdd?.(item)}
                className="
                  flex-shrink-0
                  bg-[#2f5f48]
                  rounded-xl
                  overflow-hidden
                  shadow-md
                  cursor-pointer  

                  w-[135px]
                  sm:w-[150px]
                  md:w-full
                  max-w-[180px]
                "
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3]">
                  <img
                    src={item.imageUrl || item.thumbnailUrl}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdd?.(item);
                    }}
                    className="
                      absolute bottom-2 right-2
                      bg-white text-emerald-700
                      text-xs font-bold
                      px-3 py-1
                      rounded-md
                      shadow
                    "
                  >
                    ADD
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-2">
                  <h3 className="text-xs font-extrabold text-white line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-[10px] text-white/75">
                    Seasonal pick
                  </p>

                  <p className="text-sm font-bold text-white mt-1">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
