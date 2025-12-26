export default function MenuLoader() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-amber-50/30 pb-32">
      
      {/* HEADER SKELETON - matches Header component */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="h-12 w-12 sm:w-14 sm:h-14 bg-slate-200 rounded-lg shimmer" />
          <div className="h-10 w-24 bg-slate-200 rounded-full shimmer" />
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4">
        
        {/* SEARCH BAR SKELETON - matches SearchBar component */}
        <div className="mt-6">
          <div className="h-14 w-full bg-white/90 border-2 border-slate-200 rounded-2xl shimmer" />
        </div>

        {/* CATEGORY CHIPS SKELETON - matches CategorySelector */}
        <div className="mt-6 flex gap-3 overflow-hidden w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-28 bg-slate-200 rounded-full shimmer flex-shrink-0"
            />
          ))}
        </div>

        {/* GRID SKELETON - matches ItemsGrid responsive layout */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 space-y-3 w-full"
            >
              {/* IMAGE */}
              <div className="h-48 w-full bg-slate-200 rounded-xl shimmer" />

              {/* TITLE */}
              <div className="h-4 w-3/4 bg-slate-200 rounded shimmer" />

              {/* PRICE */}
              <div className="h-5 w-1/2 bg-amber-200 rounded shimmer" />

              {/* BUTTON SKELETON */}
              <div className="h-12 w-full bg-slate-200 rounded-xl shimmer mt-4" />

              {/* AR BUTTON SKELETON */}
              <div className="h-10 w-full bg-amber-100 rounded-xl shimmer" />
            </div>
          ))}
        </div>

        {/* FOOTER TEXT */}
        <p className="mt-10 text-center text-slate-600 font-medium">
          Loading menu…
        </p>
      </div>

      {/* SHIMMER STYLES */}
      <style>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmer 1.4s infinite;
        }

        @keyframes shimmer {
          100% {
            left: 150%;
          }
        }
      `}</style>
    </div>
  );
}