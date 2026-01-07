import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  Shield,
  Zap,
  Leaf,
} from "lucide-react";

import usePaginatedMenu from "../hooks/usePaginatedMenu";

/* ================= UTILS ================= */
const throttle = (fn, limit = 150) => {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const restaurantId = id || "demo";

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [restaurantName, setRestaurantName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuImages, setMenuImages] = useState([]);

  /* ================= FETCH RESTAURANT NAME ================= */
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    fetch(`${API_BASE_URL}/api/owner/${restaurantId}/landing`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        setRestaurantName(data?.restaurantName || "");
      })
      .catch(() => {})
      .finally(() => mounted && setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, [restaurantId, API_BASE_URL]);

  /* ================= MENU DATA ================= */
  const { items, initialLoading, notSubscribed } =
    usePaginatedMenu(restaurantId, "");

  /* ================= MENU PREVIEW ================= */
  useEffect(() => {
    if (initialLoading) return;

    const images = items
      .filter((i) => i?.imageUrl || i?.thumbnailUrl)
      .slice(0, 6)
      .map((i) => i.imageUrl || i.thumbnailUrl);

    setMenuImages(images);
  }, [items, initialLoading]);

  /* ================= SCROLL ================= */
  const handleScroll = useCallback(
    throttle(() => {
      const y = window.scrollY;
      setShowFloatingMenu(y > 300);
      setShowNavbar(y > 80);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ================= NAV ================= */
  const goToMenu = () => navigate(`/menu/${restaurantId}`);
  const goToOrders = () => navigate(`/orders/${restaurantId}`);

  if (notSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          This restaurant is currently unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-green-600 transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-3 flex justify-between items-center">
          <span className="text-white font-extrabold italic text-sm md:text-base truncate">
            {restaurantName}
          </span>
          <button
            onClick={goToOrders}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            My Orders
          </button>
        </div>
      </header>

      {/* ================= HERO / BANNER ================= */}
      <section
        className="relative pt-28 md:pt-32 pb-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          {isLoading ? (
            <div className="h-12 w-64 bg-white/20 rounded-xl animate-pulse mb-5" />
          ) : (
            <h1
              className="text-white text-3xl md:text-5xl font-extrabold mb-4"
              style={{
                textShadow:
                  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              {restaurantName}
            </h1>
          )}

          <p className="text-white/90 text-base md:text-lg max-w-lg mb-6">
            Enjoy delicious snacks, meals, and drinks delivered in minutes,
            prepared in a hygienic environment nearby.
          </p>

          <button
            onClick={goToMenu}
            className="bg-white text-green-700 px-6 py-3 rounded-xl font-bold"
          >
            Explore Menu
          </button>
        </div>
      </section>

      {/* ================= SLIGHT OVERLAP (BLINKIT STYLE) ================= */}
     {/* ================= BLINKIT CURVED WHITE SECTION ================= */}
<section className="relative bg-white">
  {/* SVG CURVE */}
  <svg
    viewBox="0 0 1440 120"
    className="absolute -top-[119px] left-0 w-full h-[120px]"
    preserveAspectRatio="none"
  >
    <path
      d="M0,80 C240,120 480,120 720,100 960,80 1200,40 1440,0 L1440,120 L0,120 Z"
      fill="white"
    />
  </svg>

  {/* CONTENT */}
  <div className="pt-16 md:pt-20 pb-16 md:pb-24">
    <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
      <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">
        Explore our menu
      </h2>
      <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-12">
        Discover a wide range of options tailored to your taste and cravings
      </p>

      {/* MENU GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {menuImages.map((img, i) => (
          <div
            key={i}
            onClick={goToMenu}
            className="group aspect-square rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img}
              alt="Menu item"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-500 mb-14 max-w-2xl mx-auto">
            Built for speed, hygiene, and a seamless dining experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <Feature icon={Zap} title="Smart Ordering" text="Order directly from your table." />
            <Feature icon={Shield} title="Hygienic Kitchen" text="Prepared in clean environments." />
            <Feature icon={Clock} title="Quick Service" text="Instant kitchen processing." />
            <Feature icon={Leaf} title="Fresh Food" text="Prepared only after ordering." />
          </div>
        </div>
      </section>

      {/* ================= FLOATING MENU ================= */}
      {showFloatingMenu && (
        <button
          onClick={goToMenu}
          className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold z-50"
        >
          View Menu →
        </button>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
          <div className="flex justify-center gap-4 mb-6">
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
              >
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {restaurantName}. Powered by DishPop.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function Feature({ icon: Icon, title, text }) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow hover:shadow-xl transition">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-green-701" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
