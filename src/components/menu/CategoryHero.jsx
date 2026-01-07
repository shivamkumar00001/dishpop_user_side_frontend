export default function CategoryHero({
  title,
  imageUrl,
}) {
  return (
    <section className="relative bg-emerald-600 overflow-hidden">
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

      {/* ===== CONTENT ===== */}
      <div className="relative max-w-screen-xl mx-auto px-4 pt-16 pb-12">
        <div className="flex items-center justify-between gap-6">
          
          {/* LEFT: TEXT */}
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white">
              {title}
            </h1>

            <p className="mt-2 text-white/80 text-sm max-w-sm">
              Explore delicious {title} items 🍽️
            </p>
          </div>

          {/* RIGHT: IMAGE */}
          {imageUrl && (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/40 shadow-xl flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
