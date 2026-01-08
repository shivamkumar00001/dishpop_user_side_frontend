import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function SearchHero({
  username,
  onItemClick,
}) {
  const [mostLoved, setMostLoved] = useState([]);

  useEffect(() => {
    if (!username) return;

    api
      .get(`/api/user/${username}/menu/most-loved`)
      .then((res) => {
        const data = res.data?.data || [];
        setMostLoved(Array.isArray(data) ? data : [data]);
      })
      .catch(() => setMostLoved([]));
  }, [username]);

  return (
    <section className="relative bg-emerald-600">
      {/* ===== BACKGROUND SVGs ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <polygon fill="#10b981" fillOpacity="0.6"
            points="0,0 1440,0 1440,120 1200,80 900,140 600,90 300,150 0,100" />
        </svg>

        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <polygon fill="#34d399" fillOpacity="0.4"
            points="0,0 1440,0 1440,80 1100,120 800,60 500,100 200,70 0,40" />
        </svg>

        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <polygon fill="#047857" fillOpacity="0.5"
            points="0,320 1440,320 1440,200 1150,240 850,180 550,220 250,170 0,210" />
        </svg>

        <svg className="absolute bottom-0 right-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <polygon fill="#059669" fillOpacity="0.4"
            points="0,320 1440,320 1440,240 1200,270 900,220 600,260 300,230 0,270" />
        </svg>

        <div className="absolute top-10 right-20 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-16 w-56 h-56 bg-emerald-700/25 rounded-full blur-3xl" />
      </div>

      {/* ===== MOST LOVED ===== */}
      {mostLoved.length > 0 && (
        <div className="relative max-w-screen-xl mx-auto px-4 pt-6 pb-6">
          <div className="text-center mb-3">
            <h2 className="text-2xl md:text-3xl font-black italic text-white">
              MOST LOVED ITEM!
            </h2>
            <p className="text-xs text-white/80">
              Loved by customers ❤️
            </p>
          </div>

         <div
              className="
                flex gap-3 pb-2
                overflow-x-auto
                overscroll-x-contain
                snap-x snap-mandatory
                scroll-smooth
              "
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >

            {mostLoved.map((item) => (
              <div
              key={item.id || item._id}
              onClick={() => onItemClick(item)}
              className="
                w-36 flex-shrink-0
                snap-start
                rounded-xl overflow-hidden
                bg-emerald-900/30
                border border-white/10
                shadow-lg cursor-pointer
              "
            >

  {/* IMAGE */}
  <div className="relative h-32">
    <img
      src={item.imageUrl || item.thumbnailUrl}
      alt={item.name}
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

    {/* ✅ ADD BUTTON (RESTORED) */}
    <button
      onClick={(e) => {
        e.stopPropagation(); // ⛔ prevents bottom sheet
        onItemClick(item);   // or replace with addToCart(item) if you want
      }}
      className="
        absolute bottom-1.5 right-1.5
        bg-white text-emerald-700
        font-bold text-xs
        px-4 py-1
        rounded-md
        shadow-md
        hover:bg-emerald-50
        active:scale-95
        transition
      "
    >
      ADD
    </button>
  </div>

  {/* DETAILS */}
  <div className="p-2.5">
    <h3 className="text-xs font-extrabold text-white line-clamp-2">
      {item.name}
    </h3>

    <div className="text-sm font-bold text-white mt-1">
      ₹{item.price}
    </div>
  </div>
</div>

            ))}
          </div>
        </div>
      )}
    </section>
  );
}
