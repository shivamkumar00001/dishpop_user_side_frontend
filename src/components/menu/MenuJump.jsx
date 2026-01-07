import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Utensils } from "lucide-react"; // 🍴 premium icon

export default function MenuJump({ categories, categoryRefs }) {
  const [open, setOpen] = useState(false);

  const scrollToCategory = (name) => {
    const el = categoryRefs.current[name];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  return (
    <>
      {/* FLOATING MENU BUTTON */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          fixed bottom-24 right-4 z-50
          w-14 h-14
          rounded-full
          bg-white
          border border-slate-200
          shadow-xl
          flex items-center justify-center
          active:scale-95
          transition
        "
      >
        <Utensils className="w-6 h-6 text-emerald-600" />
      </button>

      {/* POPUP MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP (lighter, premium) */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* POPUP CARD */}
            <motion.div
              className="
                fixed bottom-40 right-4 z-50
                w-72
                bg-white
                rounded-2xl
                shadow-2xl
                border border-slate-200
                overflow-hidden
              "
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* HEADER */}
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                  Menu
                </h3>
              </div>

              {/* CATEGORY LIST */}
              <div className="max-h-80 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => scrollToCategory(cat.name)}
                    className="
                      w-full flex items-center justify-between
                      px-4 py-3
                      text-left
                      text-sm font-semibold
                      text-slate-800
                      hover:bg-emerald-50
                      hover:text-emerald-700
                      transition
                    "
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">
                      {cat.dishes.length}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
