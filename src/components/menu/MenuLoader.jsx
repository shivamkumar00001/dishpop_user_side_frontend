export default function MenuLoader() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100">
      
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
        
        {/* HEADER SKELETON */}
        <div className="h-10 w-48 bg-gray-200 rounded-lg shimmer mb-8" />

        {/* CATEGORY CHIPS */}
        <div className="flex gap-3 mb-8 overflow-hidden w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 w-28 bg-gray-200 rounded-full shimmer flex-shrink-0"
            />
          ))}
        </div>

        {/* GRID SKELETON */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-3 space-y-3 w-full"
            >
              {/* IMAGE */}
              <div className="h-32 w-full bg-gray-200 rounded-xl shimmer" />

              {/* TITLE */}
              <div className="h-4 w-3/4 bg-gray-200 rounded shimmer" />

              {/* PRICE */}
              <div className="h-4 w-1/2 bg-gray-200 rounded shimmer" />
            </div>
          ))}
        </div>

        {/* FOOTER TEXT */}
        <p className="mt-10 text-center text-gray-600 font-medium">
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
