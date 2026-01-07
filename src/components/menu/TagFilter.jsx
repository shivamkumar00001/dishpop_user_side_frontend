export default function TagFilter({ tags, selectedTags, onToggle, meta }) {
  if (!tags?.length) return null;

  return (
    <div className="sticky top-[62px] z-[38]">
      {/* Premium Glassmorphism Background */}
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 to-transparent pointer-events-none" />
        
        <div className="relative max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth">
            {tags.map((tag) => {
              const tagMeta = meta[tag];
              if (!tagMeta) return null;
              const active = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  onClick={() => onToggle(tag)}
                  className={`
                    group relative flex items-center gap-2.5
                    px-5 py-2.5 rounded-full
                    text-sm font-semibold
                    whitespace-nowrap
                    transition-all duration-300 ease-out
                    ${
                      active
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
                        : "bg-white/90 text-slate-700 border border-slate-200/60 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md hover:scale-102 active:scale-95"
                    }
                  `}
                >
                  {/* Icon with subtle animation */}
                  <span className={`text-base transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
                    {tagMeta.icon}
                  </span>
                  
                  {/* Label */}
                  <span className="relative">
                    {tagMeta.label}
                    
                    {/* Active underline effect */}
                    {active && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/40 rounded-full" />
                    )}
                  </span>
                  
                  {/* Hover glow effect for inactive buttons */}
                  {!active && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
  );
}