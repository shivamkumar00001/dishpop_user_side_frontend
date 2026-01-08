export default function Footer({ restaurantName }) {
  return (
    <footer className="relative mt-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/60 via-white to-white" />
      <div className="absolute -top-14 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-green-400/20 blur-2xl" />

      <div className="relative max-w-4xl mx-auto px-4 py-10 text-center">
        {/* ================= ICON ================= */}
        <div className="flex justify-center mb-5">
          <div className="relative group">
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/40 to-emerald-500/40 blur-md opacity-70 transition" />

            {/* Icon box */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25 transition-transform duration-300 group-hover:scale-105">
              
              {/* Plate */}
              <div className="absolute bottom-3 w-7 h-1.5 rounded-full bg-white/90" />

              {/* Cloche */}
              <div className="absolute bottom-[18px] w-7 h-3.5 rounded-t-full border border-white/90 border-b-0" />

              {/* Handle */}
              <div className="absolute bottom-[27px] w-1.5 h-1 rounded-full bg-white/90" />

              {/* AR Spark */}
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* ================= MVP MESSAGE ================= */}
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-300 leading-none">
          SEE FOOD BEFORE YOU ORDER
        </h2>
        <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-green-500 mb-5">
          WITH AR EXPERIENCE
        </h3>

        {/* ================= BRAND ================= */}
        <div className="mb-6">
          <p className="text-base font-bold text-gray-600">
            {restaurantName || "DishPop"}
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-0.5">
            Powered by DishPop
          </p>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mx-auto mb-5 h-px w-14 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-600">
              {restaurantName || "DishPop"}
            </span>
          </p>

          <div className="flex items-center gap-3">
            <span className="hover:text-gray-700 cursor-pointer transition">
              AR Menu
            </span>
            <span className="hover:text-gray-700 cursor-pointer transition">
              Support
            </span>
            <span className="hover:text-gray-700 cursor-pointer transition">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
