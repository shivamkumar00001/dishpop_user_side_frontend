import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import {motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  ArrowRightIcon,
  StarIcon,
  ViewfinderCircleIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import api from "../lib/api";

/* ---------------------------------- */
/* Utils */
/* ---------------------------------- */
const throttle = (fn, limit = 150) => {
  let inThrottle;
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

  const [restaurantName, setRestaurantName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCTA, setShowCTA] = useState(false);
  // const [rating, setRating] = useState(4.8);
  // const [reviewCount, setReviewCount] = useState(128);

  /* ---------------------------------- */
  /* Static data (memoized) */
  /* ---------------------------------- */
  const floatingItems = useMemo(
    () => [
      { id: 1, emoji: "🍣", x: 10, y: 20, delay: 0 },
      { id: 2, emoji: "🍔", x: 85, y: 15, delay: 0.3 },
      { id: 3, emoji: "🍕", x: 20, y: 70, delay: 0.6 },
      { id: 4, emoji: "🍰", x: 75, y: 65, delay: 0.9 },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: ViewfinderCircleIcon,
        title: "AR Menu Preview",
        color: "text-purple-600",
        bg: "bg-purple-100",
      },
      {
        icon: ClockIcon,
        title: "Quick Ordering",
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      {
        icon: ChatBubbleLeftRightIcon,
        title: "Live Reviews",
        color: "text-emerald-600",
        bg: "bg-emerald-100",
      },
      {
        icon: ShoppingBagIcon,
        title: "Easy Checkout",
        color: "text-amber-600",
        bg: "bg-amber-100",
      },
    ],
    []
  );

  /* ---------------------------------- */
  /* Fetch restaurant */
  /* ---------------------------------- */
  useEffect(() => {
    if (!id) return;

    let mounted = true;
    setIsLoading(true);

    api
      .get(`/api/owner/${id}/landing`)
      .then((res) => {
        if (!mounted) return;
        setRestaurantName(res.data?.restaurantName || "Our Restaurant");
        setRating(res.data?.rating ?? 4.8);
        setReviewCount(res.data?.reviewCount ?? 128);
      })
      .catch(console.error)
      .finally(() => mounted && setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  /* ---------------------------------- */
  /* Scroll CTA (throttled) */
  /* ---------------------------------- */
  const handleScroll = useCallback(
    throttle(() => {
      setShowCTA(window.scrollY > 300);
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---------------------------------- */
  /* Navigation handlers */
  /* ---------------------------------- */
  const goToMenu = useCallback(() => navigate(`/menu/${id}`), [navigate, id]);
  const goToOrders = useCallback(
    () => navigate(`/orders/${id}`),
    [navigate, id]
  );
  const goToReviews = useCallback(
    () => navigate(`/reviews/${id}`),
    [navigate, id]
  );

  /* ---------------------------------- */
  /* Render */
  /* ---------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-emerald-50 overflow-hidden">
      {/* Floating Emojis */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-4xl"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50  bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between">
          <img src="/logo.svg" alt="DishPop" className="w-14 h-14" />
          <button
            onClick={goToOrders}
            className="bg-emerald-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            My Orders
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-6 pt-12 grid lg:grid-cols-2 gap-16">
        <div>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="h-14 w-64 bg-emerald-200 animate-pulse rounded-xl" />
            ) : (
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-emerald-600"
              >
                {restaurantName}
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-3 shadow flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg ${f.bg}`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <span className="font-semibold">{f.title}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={goToMenu}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
            >
              Explore Menu <ArrowRightIcon className="w-5 h-5" />
            </button>

            <button
              onClick={goToReviews}
              className="border-2 border-emerald-200 px-8 py-4 rounded-xl font-semibold"
            >
              <StarIcon className="inline w-5 h-5 text-amber-500 mr-2" />
              Reviews
            </button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Dining"
          className="rounded-3xl shadow-2xl object-cover aspect-[5/5]"
        />
      </section>

      {/* Floating CTA */}
      <AnimatePresence>
        {showCTA && (
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={goToMenu}
            className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-xl flex gap-2"
          >
            <BuildingStorefrontIcon className="w-5 h-5" />
            Start Ordering
          </motion.button>
        )}
      </AnimatePresence>
      {/* Footer */}
<footer className="mt-20 py-8 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
    <div className="flex justify-center items-center gap-4 mb-4">
      <img
        src="/logo.svg"
        alt="DishPop Logo"
        className="w-10 h-10"
        loading="lazy"
      />
    </div>
{/* 
    <p className="text-gray-600 mb-2">
      Revolutionizing dining experiences one table at a time
    </p> */}

    <p className="text-gray-500 text-sm">
      © {new Date().getFullYear()} DishPop Interactive Dining • Crafted with ❤️
    </p>
  </div>
</footer>

    </div>
  );
}
