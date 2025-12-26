import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../lib/api";

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
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  useEffect(() => {
    if (!id) return;

    let mounted = true;
    setIsLoading(true);

    api
      .get(`/api/owner/${id}/landing`)
      .then((res) => {
        if (!mounted) return;
        setRestaurantName(res.data?.restaurantName || "Our Restaurant");
      })
      .catch(console.error)
      .finally(() => mounted && setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleScroll = useCallback(
    throttle(() => {
      setShowFloatingMenu(window.scrollY > 300);
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goToMenu = useCallback(() => navigate(`/menu/${id}`), [navigate, id]);
  const goToOrders = useCallback(() => navigate(`/orders/${id}`), [navigate, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="DishPop Logo"  className="w-20 sm:w-16 h-auto object-contain" />
            
          </div>
          <button
            onClick={goToOrders}
            className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            My Orders
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {isLoading ? (
            <div className="h-14 w-56 bg-slate-200 animate-pulse rounded-2xl mx-auto mb-4"></div>
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-amber-600 bg-clip-text text-transparent mb-4 tracking-tight">
              {restaurantName}
            </h1>
          )}
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience modern dining with seamless ordering and innovative features
          </p>
        </div>

        {/* Image Card with Enhanced Shadow */}
        <div className="mb-14">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-slate-600 via-amber-500 to-slate-700 rounded-3xl opacity-10 blur-2xl"></div>
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=85"
                alt="Restaurant ambiance"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={goToMenu}
            className="group bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-10 py-4 rounded-2xl font-semibold
                     hover:from-slate-800 hover:via-slate-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-2xl
                     transform hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-center gap-2">
              View Full Menu
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button
            onClick={goToOrders}
            className="bg-white text-slate-700 px-10 py-4 rounded-2xl font-semibold
                     border-2 border-slate-300 hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-white
                     transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Order History
          </button>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* AR Preview Feature */}
          <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200/60 
                        hover:shadow-xl hover:border-amber-300/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mb-5
                          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 mb-2.5 text-lg">AR Menu Preview</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Visualize dishes in augmented reality before you order, bringing your dining experience to life
            </p>
          </div>

          {/* Quick Ordering Feature */}
          <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200/60 
                        hover:shadow-xl hover:border-slate-400/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-5
                          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 mb-2.5 text-lg">Quick Ordering</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Order instantly from your table with real-time updates and minimal wait times
            </p>
          </div>

          {/* Easy Payment Feature */}
          <div className="group bg-gradient-to-br from-white to-amber-50/30 rounded-2xl p-8 border border-slate-200/60 
                        hover:shadow-xl hover:border-amber-300/50 transition-all duration-300 hover:-translate-y-1 md:col-span-3 lg:col-span-1">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mb-5
                          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 mb-2.5 text-lg">Seamless Payment</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Secure and effortless checkout process with multiple payment options
            </p>
          </div>
        </div>

        {/* Enhanced Final CTA */}
        <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-amber-700 rounded-3xl p-10 sm:p-14 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTAtOHYyaDJ2LTJoLTJ6bTQgNHYyaDJ2LTJoLTJ6bS00LTR2Mmgydi0yaC0yem00IDB2Mmgydi0yaC0yem0tOCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMC04djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to Experience?</h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Discover our curated menu and start your culinary journey today
            </p>
            <button
              onClick={goToMenu}
              className="bg-white text-slate-800 px-10 py-4 rounded-2xl font-bold text-lg
                       hover:bg-amber-50 transition-all duration-300 inline-flex items-center gap-3
                       shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Explore Menu
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Menu Button */}
      {showFloatingMenu && (
        <button
          onClick={goToMenu}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white 
                   px-6 py-3.5 rounded-2xl shadow-2xl font-semibold text-sm
                   hover:from-slate-900 hover:to-black transition-all duration-300 z-50
                   flex items-center gap-2.5 border border-slate-700/50
                   animate-[slideIn_0.3s_ease-out]"
          style={{
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          View Menu
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <img src="/logo.svg" alt="DishPop Logo" className="w-8 h-8" />
            <span className="font-bold text-slate-800 text-base">DishPop</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} DishPop. Elevating dining experiences.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}