export default function LowestPriceItems({ items, onAdd }) {
  if (!items.length) return null;

  const minPrice = Math.min(
    ...items.map((item) => item.price)
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 bg-white">
     
      <h2
  className="
    text-[26px]
    font-black
    italic
    uppercase
    tracking-tight
    text-slate-800
    mb-5
  "
>
  STARTING FROM ₹{minPrice}
</h2>

      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              w-[140px] sm:w-[155px]
              flex-shrink-0
            "
          >
            {/* IMAGE */}
            <div className="relative rounded-lg overflow-hidden mb-2"
                onClick={() => onAdd(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="
                  w-full
                  h-[120px] sm:h-[135px]
                  object-cover
                "
              />

              {/* ADD BUTTON */}
              <button
                onClick={() => onAdd(item)}
                className="
                  absolute bottom-2 right-2
                  bg-white text-emerald-600
                  font-bold text-xs
                  px-3 py-1
                  rounded-md
                  shadow
                  hover:shadow-md
                  active:scale-95
                  transition
                  border border-emerald-100
                "
              >
                ADD
              </button>
            </div>

            {/* DETAILS – FIXED HEIGHT */}
            <div className="h-[44px] flex flex-col justify-between">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-2">
                {item.name}
              </h3>

              <p className="text-emerald-700 font-bold text-sm">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
