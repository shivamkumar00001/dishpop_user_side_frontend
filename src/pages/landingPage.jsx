
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Instagram,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Clock,
//   Shield,
//   Zap,
//   Leaf,
//   Star,
// } from "lucide-react";
// import HapticButton from "../components/HapticButton";

// import usePaginatedMenu from "../hooks/usePaginatedMenu";

// /* ================= UTILS ================= */
// const throttle = (fn, limit = 150) => {
//   let inThrottle = false;
//   return (...args) => {
//     if (!inThrottle) {
//       fn(...args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// };

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const restaurantId = id || "demo";

//   const API_BASE_URL = import.meta.env.VITE_API_URL;

//   const [restaurantName, setRestaurantName] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [showFloatingMenu, setShowFloatingMenu] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(false);
//   const [menuImages, setMenuImages] = useState([]);

//   /* ================= FETCH RESTAURANT NAME ================= */
//   useEffect(() => {
//     let mounted = true;
//     setIsLoading(true);

//     fetch(`${API_BASE_URL}/api/owner/${restaurantId}/landing`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (!mounted) return;
//         setRestaurantName(data?.restaurantName || "");
//       })
//       .catch(() => {})
//       .finally(() => mounted && setIsLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, [restaurantId, API_BASE_URL]);

//   /* ================= MENU DATA ================= */
//   const { items, initialLoading, notSubscribed } =
//     usePaginatedMenu(restaurantId, "");

//   /* ================= MENU PREVIEW ================= */
//   useEffect(() => {
//     if (initialLoading) return;

//     const images = items
//       .filter((i) => i?.imageUrl || i?.thumbnailUrl)
//       .slice(0, 6)
//       .map((i) => i.imageUrl || i.thumbnailUrl);

//     setMenuImages(images);
//   }, [items, initialLoading]);

//   /* ================= SCROLL ================= */
//   const handleScroll = useCallback(
//     throttle(() => {
//       const y = window.scrollY;
//       setShowFloatingMenu(y > 300);
//       setShowNavbar(y > 80);
//     }, 100),
//     []
//   );

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   /* ================= NAV ================= */
//   const goToMenu = () => navigate(`/menu/${restaurantId}`);
//   const goToOrders = () => navigate(`/orders/${restaurantId}`);
//   const goToReviews = () => navigate(`/reviews/${restaurantId}`);

//   if (notSubscribed) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600 text-lg">
//           This restaurant is currently unavailable.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* ================= NAVBAR ================= */}
//       <header
//         className={`fixed top-0 left-0 w-full z-50 bg-green-600 transition-transform duration-300
//         ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
//       >
//         <div className="max-w-7xl mx-auto px-4 md:px-16 py-3 flex justify-between items-center">
//           <span className="text-white font-extrabold italic text-sm md:text-base truncate">
//             {restaurantName}
//           </span>
//           <div className="flex gap-2 md:gap-3">
//             <HapticButton
//               onClick={goToReviews}
//               className="bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
//             >
//               <Star className="w-4 h-4" />
//               <span className="hidden sm:inline">Reviews</span>
//             </HapticButton>
//               <HapticButton
//                 onClick={goToOrders}
//                 className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold"
//               >
//                 My Orders
//               </HapticButton>

//           </div>
//         </div>
//       </header>

//       {/* ================= HERO / BANNER ================= */}
//       <section
//         className="relative pt-28 md:pt-32 pb-40 bg-cover bg-center"
//         style={{ backgroundImage: "url('/banner.jpeg')" }}
//       >
//         <div className="absolute inset-0 bg-black/60" />

//         <div className="relative max-w-7xl mx-auto px-4 md:px-16">
//           {isLoading ? (
//             <div className="h-12 w-64 bg-white/20 rounded-xl animate-pulse mb-5" />
//           ) : (
//             <h1
//               className="text-white text-3xl md:text-5xl font-extrabold mb-4"
//               style={{
//                 textShadow:
//                   "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
//               }}
//             >
//               {restaurantName}
//             </h1>
//           )}

//           <p className="text-white/90 text-base md:text-lg max-w-lg mb-6">
//             Enjoy delicious snacks, meals, and drinks delivered in minutes,
//             prepared in a hygienic environment nearby.
//           </p>
//             <HapticButton
//               onClick={goToMenu}
//               className="bg-white text-green-700 px-6 py-3 rounded-xl font-bold"
//             >
//               Explore Menu
//             </HapticButton>

//         </div>
//       </section>

//       {/* ================= BLINKIT CURVED WHITE SECTION ================= */}
//       <section className="relative bg-white">
//         {/* SVG CURVE */}
//         <svg
//           viewBox="0 0 1440 120"
//           className="absolute -top-[119px] left-0 w-full h-[120px]"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,80 C240,120 480,120 720,100 960,80 1200,40 1440,0 L1440,120 L0,120 Z"
//             fill="white"
//           />
//         </svg>

//         {/* CONTENT */}
//         <div className="pt-16 md:pt-20 pb-16 md:pb-24">
//           <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
//             <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">
//               Explore our menu
//             </h2>
//             <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-12">
//               Discover a wide range of options tailored to your taste and cravings
//             </p>

//             {/* MENU GRID */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
//               {menuImages.map((img, i) => (
//                 <div
//                   key={i}
//                   onClick={goToMenu}
//                   className="group aspect-square rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   <img
//                     src={img}
//                     alt="Menu item"
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= WHY CHOOSE US ================= */}
//       <section className="bg-gray-50 py-24">
//         <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
//             Why Choose Us
//           </h2>
//           <p className="text-gray-500 mb-14 max-w-2xl mx-auto">
//             Built for speed, hygiene, and a seamless dining experience.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
//             <Feature icon={Zap} title="Smart Ordering" text="Order directly from your table." />
//             <Feature icon={Shield} title="Hygienic Kitchen" text="Prepared in clean environments." />
//             <Feature icon={Clock} title="Quick Service" text="Instant kitchen processing." />
//             <Feature icon={Leaf} title="Fresh Food" text="Prepared only after ordering." />
//           </div>
//         </div>
//       </section>

//       {/* ================= REVIEWS CTA SECTION ================= */}
//       <section className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-4 md:px-16">
//           <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12 text-center shadow-xl border border-green-200">
//             <div className="flex justify-center mb-4">
//               <div className="flex gap-1">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//             </div>
            
//             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
//               See What Our Customers Say
//             </h2>
            
//             <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-6">
//               Real feedback from real customers. Discover why people love dining with us!
//             </p>
            
//             <button
//               onClick={goToReviews}
//               className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
//             >
//               Read Customer Reviews
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================= FLOATING MENU ================= */}
//       {showFloatingMenu && (
//         <HapticButton
//           onClick={goToMenu}
//           className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold z-50 hover:bg-green-700 transition-colors"
//         >
//           View Menu →
//         </HapticButton>
//       )}

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
//           <div className="flex justify-center gap-4 mb-6">
//             {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
//               <div
//                 key={i}
//                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
//               >
//                 <Icon className="w-5 h-5" />
//               </div>
//             ))}
//           </div>
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} {restaurantName}. Powered by DishPop.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// /* ================= FEATURE CARD ================= */
// function Feature({ icon: Icon, title, text }) {
//   return (
//     <div className="p-6 bg-white rounded-3xl shadow hover:shadow-xl transition">
//       <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//         <Icon className="w-7 h-7 text-green-600" />
//       </div>
//       <h3 className="font-bold text-lg mb-2">{title}</h3>
//       <p className="text-sm text-gray-600">{text}</p>
//     </div>
//   );
// }



import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Star, Zap, Shield, Clock, Leaf, Instagram, Facebook, Twitter, Linkedin, MapPin, ChevronLeft, ChevronRight, Phone, Mail, Bell, ChevronDown } from "lucide-react";
import { throttle } from "lodash";
import HapticButton from "../components/HapticButton";

export default function LandingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const restaurantId = id || "demo";

  const API_BASE_URL = "https://dishpop-restro-side-backend.onrender.com";
  // const API_BASE_URL = "http://localhost:5001";

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ================= FETCH RESTAURANT DATA ================= */
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/${restaurantId}/landing`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!mounted) return;
        
        setRestaurantName(data?.restaurantName || "");
        
        setRestaurantData({
          profilePhoto: data?.profilePhoto || data?.photo || data?.image,
          galleryImages: data?.galleryImages || [],
          description: data?.description || data?.about,
          restaurantType: data?.restaurantType || data?.cuisine,
          city: data?.city,
          state: data?.state,
          stats: {
            rating: data?.rating || data?.stats?.rating,
            reviews: data?.reviewCount || data?.stats?.reviews || 0,
            dishes: data?.dishCount || data?.stats?.dishes || 0
          }
        });
      } catch (err) {
        console.error("❌ Restaurant fetch failed:", err);
        if (mounted) {
          setRestaurantName("Restaurant");
          setRestaurantData({
            profilePhoto: null,
            galleryImages: [],
            description: null,
            restaurantType: null,
            city: null,
            state: null,
            stats: { rating: null, reviews: 0, dishes: 0 }
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRestaurantData();

    return () => {
      mounted = false;
    };
  }, [restaurantId, API_BASE_URL]);

  /* ================= SCROLL HANDLERS ================= */
  const handleScroll = useCallback(
    throttle(() => {
      const y = window.scrollY;
      setShowFloatingMenu(y > 300);
      setShowNavbar(y > 50);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ================= IMAGE SLIDER ================= */
  const allImages = [
    restaurantData?.profilePhoto,
    ...(restaurantData?.galleryImages?.map(img => img.url) || [])
  ].filter(Boolean);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    if (allImages.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  /* ================= NAVIGATION ================= */
  const goToMenu = () => navigate(`/menu/${restaurantId}`);
  const goToOrders = () => navigate(`/orders/${restaurantId}`);
  const goToReviews = () => navigate(`/reviews/${restaurantId}`);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          showNavbar
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex justify-between items-center">
          
          {/* Logo */}
          <h1
            className={`text-2xl md:text-3xl font-bold whitespace-nowrap ${
              showNavbar ? "text-gray-900" : "text-white"
            }`}
          >
            {restaurantName || "Hej!"}
            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full ml-1 align-top"></span>
          </h1>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              className={`p-2 rounded-full transition-colors ${
                showNavbar ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
            >
              <Bell
                className={`w-5 h-5 ${
                  showNavbar ? "text-gray-900" : "text-white"
                }`}
              />
            </button>

            <HapticButton
              onClick={goToOrders}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap"
            >
              My Order
            </HapticButton>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/banner.jpg" 
            alt="Hero Banner" 
            className="w-full h-full object-cover object-top sm:object-center"
            onError={(e) => { 
              e.target.src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070';
            }}
          />
          {/* Gradient Overlay - Lighter at top for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 sm:to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pb-20 md:pb-24 z-10 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
Experience Dining in <br />3D & Augmented Reality
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            Experience exceptional dining with our curated menu and premium service
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <HapticButton
              onClick={goToMenu}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explore Menu
            </HapticButton>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white/60" />
          </div>
        </div>
      </section>

      {/* ================= FEATURED GALLERY SLIDER ================= */}
      <section className="py-0 bg-white">
        {/* Full Width Image Slider */}
        <div className="relative w-full">
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh]">
            {allImages.length > 0 ? (
              <>
                {/* Slides */}
                <div className="relative w-full h-full overflow-hidden">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070";
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                {allImages.length > 1 && (
                  <>
                    {/* Left Button */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-green-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>

                    {/* Right Button */}
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-green-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? "bg-green-500 w-8 sm:w-10"
                              : "bg-white/40 w-1.5 sm:w-2 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Counter */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/50 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold">
                      {currentSlide + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
                alt="Default"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Welcome to <span className="text-green-600">{restaurantName}</span>
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 md:mb-12">
              {restaurantData?.description ||
                "Experience culinary excellence in every bite. Our chefs craft each dish with premium ingredients and years of expertise, bringing you flavors from around the world."}
            </p>

            {/* Professional Stats Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              
              {restaurantData?.restaurantType && (
                <div className="flex flex-col items-center">
                  <Leaf className="w-6 h-6 md:w-7 md:h-7 text-green-600 mb-2 md:mb-3" />
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Cuisine
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {restaurantData.restaurantType}
                  </p>
                </div>
              )}

              {restaurantData?.stats?.rating && (
                <div className="flex flex-col items-center">
                  <Star className="w-6 h-6 md:w-7 md:h-7 text-yellow-500 mb-2 md:mb-3 fill-yellow-500" />
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Rating
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {restaurantData.stats.rating}
                  </p>
                </div>
              )}

              {restaurantData?.city && (
                <div className="flex flex-col items-center">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7 text-blue-600 mb-2 md:mb-3" />
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Location
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {restaurantData.city}
                  </p>
                </div>
              )}

              {restaurantData?.stats?.dishes > 0 && (
                <div className="flex flex-col items-center">
                  <Zap className="w-6 h-6 md:w-7 md:h-7 text-green-600 mb-2 md:mb-3" />
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Menu Items
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {restaurantData.stats.dishes}+
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 text-gray-900">
              What Our <span className="text-green-600">Guests Say</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg">Real experiences from our valued customers</p>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <HapticButton
              onClick={goToReviews}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition-all shadow-lg"
            >
              Read All Reviews
            </HapticButton>
          </div>
        </div>
      </section>

      {/* ================= FLOATING MENU BUTTON ================= */}
      {showFloatingMenu && (
        <HapticButton
          onClick={goToMenu}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-2xl font-bold z-50 flex items-center gap-2 hover:scale-105 transition-all text-sm md:text-base"
        >
          View Menu <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </HapticButton>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                {restaurantName}
                <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full ml-1"></span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experience exceptional dining with premium ingredients and world-class service.
              </p>
            </div>

            {/* Quick Links */}
            {/* <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-white">Quick Links</h3>
              <div className="space-y-2 md:space-y-3">
                <button onClick={goToMenu} className="block text-gray-400 hover:text-green-500 transition text-sm">Menu</button>
                <button onClick={goToReviews} className="block text-gray-400 hover:text-green-500 transition text-sm">Reviews</button>
                <button onClick={goToOrders} className="block text-gray-400 hover:text-green-500 transition text-sm">Orders</button>
                <button className="block text-gray-400 hover:text-green-500 transition text-sm">About Us</button>
              </div>
            </div> */}

            {/* Contact */}
            {/* <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-white">Contact</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">hello@restaurant.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{restaurantData?.city || "Your City"}</span>
                </div>
              </div>
            </div> */}

            {/* Social */}
            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-white">Follow Us</h3>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all border border-gray-700"
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
            <p className="text-gray-500 text-xs md:text-sm">
              © {new Date().getFullYear()} {restaurantName}. All Rights Reserved. Powered by DishPop.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
