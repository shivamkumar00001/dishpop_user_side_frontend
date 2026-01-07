import { motion } from "framer-motion";

const FOOD_EMOJIS = ["🍕", "🍔", "🍟", "🌮", "🍩", "🥗", "🍜"];

export default function FoodLoader({
  text = "Cooking something delicious…",
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">

        {/* EMOJI ROW */}
        <div className="flex gap-3">
          {FOOD_EMOJIS.map((emoji, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-semibold text-slate-600 tracking-wide"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}
