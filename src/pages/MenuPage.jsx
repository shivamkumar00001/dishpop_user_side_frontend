// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";


// import CategoryGrid from "../components/menu/CategoryGrid";
// import api from "../lib/api";
// import LowestPriceItems from "../components/menu/LowestPriceItems.jsx";
// import SeasonalItems from "../components/menu/SeasonalItems";
// import { useMemo } from "react";

// import ItemsGrid from "../components/menu/ItemsGrid";
// import ItemBottomSheet from "../components/menu/ItemBottomSheet";
// import CartBar from "../components/menu/CartBar";
// import InfiniteLoader from "../components/menu/InfiniteLoader";
// import MenuLoader from "../components/menu/MenuLoader";
// import ARViewer from "../components/menu/ARViewer";
// import SearchHero from "../components/menu/SearchHero";
// import TagFilter from "../components/menu/TagFilter";

// import usePaginatedMenu from "../hooks/usePaginatedMenu";
// import useDebounce from "../hooks/useDebounce";

// import { incrementARStat } from "../services/arStats.service";
// import CategorySection from "../components/menu/CategorySection.jsx";
// import SearchBar from "../components/menu/SearchBar.jsx";
// import MenuJump from "../components/menu/MenuJump.jsx";
// import Footer from "../components/menu/lower.jsx";
// const TAG_META = {
//   "chef-special": { label: "Chef Special", icon: "👨‍🍳" },
//   "most-loved": { label: "Most Loved", icon: "❤️" },
//   trending: { label: "Trending", icon: "🔥" },
//   spicy: { label: "Spicy", icon: "🌶️" },
//   "best-seller": { label: "Best Seller", icon: "⭐" },
//   "new-arrival": { label: "New", icon: "🆕" },
//   seasonal: { label: "Seasonal", icon: "❄️" },
//   signature: { label: "Signature", icon: "✍️" },
// };


// export default function MenuPage() {
//   const { id: username } = useParams();
//   const navigate = useNavigate();
//   const [lowestItems, setLowestItems] = useState([]);
//   const [seasonalItems, setSeasonalItems] = useState([]);
// const [allItems, setAllItems] = useState([]);
// const [showCart, setShowCart] = useState(false);

//   // All hooks must be called in the same order every render
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const debouncedSearch = useDebounce(searchQuery, 400);
//   const [selectedTags, setSelectedTags] = useState([]);
//  const [categoryPreview, setCategoryPreview] = useState([]);
//  const [categoryLoading, setCategoryLoading] = useState(true);
// const categoryRefs = useRef({});

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [arItem, setArItem] = useState(null);
//   const [showArViewer, setShowArViewer] = useState(false);
  
//   const arViewedRef = useRef(new Set());
//   const loaderRef = useRef(null);

//   const cartKey = `cart_${username}`;
//   const [cart, setCart] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(cartKey)) || [];
//     } catch {
//       return [];
//     }
//   });
  

 

//   // Custom hook call - must be before any early returns
//   const {
//     menu,
//     items,
//     fetchPage,
//     hasMore,
//     isFetching,
//     initialLoading,
//     notSubscribed,
//     subscriptionReason,
//   } = usePaginatedMenu(username, debouncedSearch, selectedTags);
  

//   // Effects after all hooks
//   useEffect(() => {
//     try {
//       localStorage.setItem(cartKey, JSON.stringify(cart));
//     } catch (error) {
//       console.error("Failed to save cart:", error);
//     }
//   }, [cart, cartKey]);
  

//   useEffect(() => {
//   if (!username) return;

//   api
//     .get(`/api/user/${username}/menu/seasonal`)
//     .then((res) => {
//       setSeasonalItems(res.data.data || []);
//     })
//     .catch(() => setSeasonalItems([]));
// }, [username]);

   
//   useEffect(() => {
//   if (!username) return;

//   api
//     .get(`/api/user/${username}/menu/lowest-price`)
//     .then((res) => {
//       setLowestItems(res.data.data || []);
//     })
//     .catch(() => setLowestItems([]));
// }, [username]);


//      useEffect(() => {
//   if (!username) return;

//   setCategoryLoading(true);

//   api
//     .get(`/api/user/${username}/menu/category-preview`)
//     .then((res) => {
//       setCategoryPreview(res.data.data || []);
//     })
//     .catch((err) => {
//       console.error("Failed to fetch category preview", err);
//       setCategoryPreview([]);
//     })
//     .finally(() => {
//       setCategoryLoading(false);
//     });
// }, [username]);

//   useEffect(() => {
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && hasMore && !isFetching) {
//           fetchPage();
//         }
//       },
//       { rootMargin: "200px" }
//     );

//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [fetchPage, hasMore, isFetching]);

//   // Event handlers
//   const increaseQty = (itemId) => {
//     setCart((prev) =>
//       prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i))
//     );
//   };

//   const decreaseQty = (itemId) => {
//     setCart((prev) =>
//       prev
//         .map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i))
//         .filter((i) => i.qty > 0)
//     );
//   };

//   const handleArView = (item) => {
//     setArItem(item);
//     setShowArViewer(true);

//     if (arViewedRef.current.has(item.id)) return;

//     incrementARStat({
//       restaurantId: username,
//       itemName: item.name,
//       imageUrl: item.imageUrl || item.thumbnailUrl,
//     });

//     arViewedRef.current.add(item.id);
//   };
// useEffect(() => {
//   setAllItems((prev) => {
//     const existingIds = new Set(prev.map((i) => i.id));
//     const newItems = items.filter((i) => !existingIds.has(i.id));
//     return [...prev, ...newItems];
//   });
// }, [items]);

// useEffect(() => {
//   setAllItems([]);
// }, [username, debouncedSearch, selectedTags]);


// // const availableTags = useMemo(() => {
// //   const set = new Set();

// //   allItems.forEach((item) => {
// //     // tagDetails based tags
// //     if (Array.isArray(item.tags)) {
// //       item.tags.forEach((tag) => {
// //         if (tag?.key) set.add(tag.key);
// //       });
// //     }

// //     // optional: food type tags (only if you want them)
// //     // if (item.foodType === "veg") set.add("veg");
// //     // if (item.foodType === "non-veg") set.add("non-veg");
// //   });

// //   return [...set].filter((tag) => TAG_META[tag]);
// // }, [allItems]);

// const availableTags = useMemo(() => {
//   return Object.keys(TAG_META);
// }, []);

//   // // Computed values
//   // const visibleCategories = menu
//   //   .filter((c) => c.dishes.length > 0)
//   //   .map((c) => c.name);
  

//   const showInitialLoader = initialLoading && items.length === 0;

//   // Conditional render for subscription error - AFTER all hooks
//   if (notSubscribed) {
//     const messages = {
//       NOT_SUBSCRIBED: "This restaurant has not activated a subscription yet.",
//       PENDING_AUTH: "Restaurant subscription setup is incomplete.",
//       EXPIRED: "This restaurant's subscription has expired.",
//       TRIAL_EXPIRED: "The restaurant's free trial has ended.",
//       DEFAULT: "Service for this restaurant is currently unavailable.",
//     };

//     const titleMap = {
//       NOT_SUBSCRIBED: "Subscription Required",
//       PENDING_AUTH: "Setup Pending",
//       EXPIRED: "Subscription Expired",
//       TRIAL_EXPIRED: "Trial Ended",
//       DEFAULT: "Menu Unavailable",
//     };

//     const title = titleMap[subscriptionReason] || titleMap.DEFAULT;
//     const description = messages[subscriptionReason] || messages.DEFAULT;

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4">
//         <div className="relative max-w-md w-full">
//           <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl blur-xl opacity-20" />

//           <div className="relative bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-200">
//             <div className="mx-auto mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200">
//               <span className="text-3xl">🔒</span>
//             </div>

//             <h2 className="text-3xl font-bold text-slate-800 mb-3">{title}</h2>

//             <p className="text-slate-600 leading-relaxed mb-6">
//               {description}
//               <br />
//               <span className="text-sm">Please contact the restaurant owner for assistance.</span>
//             </p>

//             <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

//             <p className="text-sm text-slate-500">Access restricted due to subscription status</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleAddFromLowest = async (item) => {
//   try {
//     const res = await api.get(
//       `/api/user/${username}/dish/${item.id}`
//     );

//     setSelectedItem(res.data.data);
//   } catch (err) {
//     console.error("Failed to fetch full dish details", err);
//   }
// };

// const visibleCategories = useMemo(() => {
//   return menu.filter(
//     (category) =>
//       Array.isArray(category.dishes) &&
//       category.dishes.length > 0
//   );
// }, [menu]);


//   // Main render
//  // CORRECTED MenuPage.jsx structure

// // Main render
// return (
//   <>
//    <SearchBar
//   value={searchQuery}
//   onChange={setSearchQuery}
//   cartCount={cart.length}
// />

    
//     {/* Main scrollable container */}
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 pb-32">
      
//       {/* SearchHero with top padding - IMPORTANT: No overflow hidden on parents */}
//       <div className="pt-[62px]">
//         <SearchHero
//           username={username}
//           onItemClick={(item) => setSelectedItem(item)}
//         />
//       </div>

//       {/* Category Grid */}
//       {categoryLoading ? (
//         <div className="max-w-screen-xl mx-auto px-4 mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
//           ))}
//         </div>
//       ) : (
//         <CategoryGrid
//           categories={categoryPreview}
//           activeCategory={activeCategory}
//           setActiveCategory={setActiveCategory}
//         />
//       )}

//       <LowestPriceItems items={lowestItems} onAdd={handleAddFromLowest} />
//       <SeasonalItems items={seasonalItems} onAdd={(item) => setSelectedItem(item)} />

//       {/* TAG FILTER - This should now stick properly */}
//       <TagFilter
//         tags={availableTags}
//         selectedTags={selectedTags}
//         meta={TAG_META}
//         onToggle={(tag) =>
//           setSelectedTags((prev) =>
//             prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//           )
//         }
//       />

//       {showInitialLoader && (
//         <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
//           <MenuLoader />
//         </div>
//       )}

//     <div className="max-w-screen-xl mx-auto px-4">
//       {visibleCategories.map((category) => (
//         <div
//           key={category.categoryId || category.name}
//         ref={(el) => {
//           if (el) {
//             categoryRefs.current[category.name] = el;
//           }
//     }}

//           className="scroll-mt-32"
//         >
//           <CategorySection
//             title={category.name}
//             items={category.dishes}
//             cart={cart}
//             addToCart={setSelectedItem}
//             openItemSheet={setSelectedItem}
//             increaseQty={increaseQty}
//             decreaseQty={decreaseQty}
//             onArView={handleArView}
//           />
//         </div>
//       ))}
//     </div>

//       <div ref={loaderRef}>
//         <InfiniteLoader hasMore={hasMore} isFetching={isFetching} />
//       </div>

//       {selectedItem && (
//         <ItemBottomSheet
//           item={selectedItem}
//           isOpen={true}
//           onClose={() => setSelectedItem(null)}
//           cart={cart}
//           setCart={setCart}
//           cartKey={cartKey}
//         />
//       )}

//       {arItem && showArViewer && (
//         <ARViewer
//           item={arItem}
//           isOpen={true}
//           onClose={() => {
//             setShowArViewer(false);
//             setArItem(null);
//           }}
//         />
//       )}
//       <MenuJump
//         categories={visibleCategories}
//         categoryRefs={categoryRefs}
//       />


//       <CartBar cart={cart} />
//             <Footer restaurantName={username} />

//     </div>
//   </>
// );
// }

// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import CategoryGrid from "../components/menu/CategoryGrid";
// import api from "../lib/api";
// import LowestPriceItems from "../components/menu/LowestPriceItems.jsx";
// import SeasonalItems from "../components/menu/SeasonalItems";
// import { useMemo } from "react";

// import ItemsGrid from "../components/menu/ItemsGrid";
// import ItemBottomSheet from "../components/menu/ItemBottomSheet";
// import CartBar from "../components/menu/CartBar";
// import InfiniteLoader from "../components/menu/InfiniteLoader";
// import MenuLoader from "../components/menu/MenuLoader";
// import ARViewer from "../components/menu/ARViewer";
// import SearchHero from "../components/menu/SearchHero";
// import TagFilter from "../components/menu/TagFilter";

// import usePaginatedMenu from "../hooks/usePaginatedMenu";
// import useDebounce from "../hooks/useDebounce";

// import { incrementARStat } from "../services/arStats.service";
// import CategorySection from "../components/menu/CategorySection.jsx";
// import SearchBar from "../components/menu/SearchBar.jsx";
// import MenuJump from "../components/menu/MenuJump.jsx";
// import Footer from "../components/menu/lower.jsx";

// const TAG_META = {
//   "chef-special": { label: "Chef Special", icon: "👨‍🍳" },
//   "most-loved": { label: "Most Loved", icon: "❤️" },
//   trending: { label: "Trending", icon: "🔥" },
//   spicy: { label: "Spicy", icon: "🌶️" },
//   "best-seller": { label: "Best Seller", icon: "⭐" },
//   "new-arrival": { label: "New", icon: "🆕" },
//   seasonal: { label: "Seasonal", icon: "❄️" },
//   signature: { label: "Signature", icon: "✍️" },
// };

// // Helper function to scroll to category sections - SMOOTH on first search
// const scrollToCategories = () => {
//   const firstCategory = document.querySelector('.scroll-mt-32');
//   if (firstCategory) {
//     const offset = 150;
//     const elementPosition = firstCategory.getBoundingClientRect().top;
//     const offsetPosition = elementPosition + window.pageYOffset - offset;

//     window.scrollTo({
//       top: offsetPosition,
//       behavior: 'smooth' // Smooth scroll for better UX
//     });
//   }
// };

// // Client-side filter function - OPTIMIZED & ERROR-FREE
// const filterItems = (items, searchQuery, tags) => {
//   if (!Array.isArray(items)) return [];
  
//   let filtered = items;

//   // Filter by search query
//   if (searchQuery?.trim()) {
//     const query = searchQuery.toLowerCase();
//     filtered = filtered.filter(item => {
//       const name = item?.name?.toLowerCase() || '';
//       const description = item?.description?.toLowerCase() || '';
//       return name.includes(query) || description.includes(query);
//     });
//   }

//   // Filter by tags
//   if (tags?.length > 0) {
//     filtered = filtered.filter(item => {
//       if (!Array.isArray(item?.tags)) return false;
//       return tags.some(selectedTag => 
//         item.tags.some(tag => tag?.key === selectedTag)
//       );
//     });
//   }

//   return filtered;
// };

// export default function MenuPage() {
//   const { id: username } = useParams();
//   const navigate = useNavigate();
//   const [lowestItems, setLowestItems] = useState([]);
//   const [seasonalItems, setSeasonalItems] = useState([]);
//   const [allItems, setAllItems] = useState([]);
//   const [showCart, setShowCart] = useState(false);

//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const debouncedSearch = useDebounce(searchQuery, 400);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [categoryPreview, setCategoryPreview] = useState([]);
//   const [categoryLoading, setCategoryLoading] = useState(true);
//   const categoryRefs = useRef({});

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [arItem, setArItem] = useState(null);
//   const [showArViewer, setShowArViewer] = useState(false);
  
//   const arViewedRef = useRef(new Set());
//   const loaderRef = useRef(null);
//   const hasSearchedRef = useRef(false);
//   const categorySectionRef = useRef(null); // New ref for scroll target

//   const cartKey = `cart_${username}`;
//   const [cart, setCart] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(cartKey)) || [];
//     } catch {
//       return [];
//     }
//   });

//   // Load ALL menu items initially (NO search/filter params)
//   const {
//     menu,
//     items,
//     fetchPage,
//     hasMore,
//     isFetching,
//     initialLoading,
//     notSubscribed,
//     subscriptionReason,
//   } = usePaginatedMenu(username, "", []); // Empty search and tags for API

//   // Effects
//   useEffect(() => {
//     try {
//       localStorage.setItem(cartKey, JSON.stringify(cart));
//     } catch (error) {
//       console.error("Failed to save cart:", error);
//     }
//   }, [cart, cartKey]);

//   useEffect(() => {
//     if (!username) return;

//     api
//       .get(`/api/user/${username}/menu/seasonal`)
//       .then((res) => {
//         setSeasonalItems(res.data.data || []);
//       })
//       .catch(() => setSeasonalItems([]));
//   }, [username]);

//   useEffect(() => {
//     if (!username) return;

//     api
//       .get(`/api/user/${username}/menu/lowest-price`)
//       .then((res) => {
//         setLowestItems(res.data.data || []);
//       })
//       .catch(() => setLowestItems([]));
//   }, [username]);

//   useEffect(() => {
//     if (!username) return;

//     setCategoryLoading(true);

//     api
//       .get(`/api/user/${username}/menu/category-preview`)
//       .then((res) => {
//         setCategoryPreview(res.data.data || []);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch category preview", err);
//         setCategoryPreview([]);
//       })
//       .finally(() => {
//         setCategoryLoading(false);
//       });
//   }, [username]);

//   useEffect(() => {
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && hasMore && !isFetching) {
//           fetchPage();
//         }
//       },
//       { rootMargin: "200px" }
//     );

//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [fetchPage, hasMore, isFetching]);

//   // Build allItems from API response
//   useEffect(() => {
//     setAllItems((prev) => {
//       const existingIds = new Set(prev.map((i) => i.id));
//       const newItems = items.filter((i) => !existingIds.has(i.id));
//       return [...prev, ...newItems];
//     });
//   }, [items]);

//   // Reset allItems on username change
//   useEffect(() => {
//     setAllItems([]);
//   }, [username]);

//   // AUTO-SCROLL when searching/filtering - FIXED
//   useEffect(() => {
//     const hasActiveFilter = debouncedSearch.trim() || selectedTags.length > 0;
    
//     if (hasActiveFilter && hasSearchedRef.current) {
//       // Use requestAnimationFrame to ensure DOM has updated
//       requestAnimationFrame(() => {
//         scrollToCategories(categorySectionRef);
//       });
//     }
    
//     // Set the ref to true after first render
//     if (hasActiveFilter) {
//       hasSearchedRef.current = true;
//     } else {
//       hasSearchedRef.current = false;
//     }
//   }, [debouncedSearch, selectedTags]);

//   // Event handlers
//   const increaseQty = (itemId) => {
//     setCart((prev) =>
//       prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i))
//     );
//   };

//   const decreaseQty = (itemId) => {
//     setCart((prev) =>
//       prev
//         .map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i))
//         .filter((i) => i.qty > 0)
//     );
//   };

//   const handleArView = (item) => {
//     setArItem(item);
//     setShowArViewer(true);

//     if (arViewedRef.current.has(item.id)) return;

//     incrementARStat({
//       restaurantId: username,
//       itemName: item.name,
//       imageUrl: item.imageUrl || item.thumbnailUrl,
//     });

//     arViewedRef.current.add(item.id);
//   };

//   const availableTags = useMemo(() => {
//     return Object.keys(TAG_META);
//   }, []);

//   // CLIENT-SIDE FILTERED MENU - OPTIMIZED with React.memo behavior
//   const filteredMenu = useMemo(() => {
//     if (!Array.isArray(menu)) return [];
    
//     return menu
//       .map(category => ({
//         ...category,
//         dishes: filterItems(category.dishes || [], debouncedSearch, selectedTags)
//       }))
//       .filter(category => category.dishes.length > 0);
//   }, [menu, debouncedSearch, selectedTags]);

//   const showInitialLoader = initialLoading && items.length === 0;

//   // Subscription error handling
//   if (notSubscribed) {
//     const messages = {
//       NOT_SUBSCRIBED: "This restaurant has not activated a subscription yet.",
//       PENDING_AUTH: "Restaurant subscription setup is incomplete.",
//       EXPIRED: "This restaurant's subscription has expired.",
//       TRIAL_EXPIRED: "The restaurant's free trial has ended.",
//       DEFAULT: "Service for this restaurant is currently unavailable.",
//     };

//     const titleMap = {
//       NOT_SUBSCRIBED: "Subscription Required",
//       PENDING_AUTH: "Setup Pending",
//       EXPIRED: "Subscription Expired",
//       TRIAL_EXPIRED: "Trial Ended",
//       DEFAULT: "Menu Unavailable",
//     };

//     const title = titleMap[subscriptionReason] || titleMap.DEFAULT;
//     const description = messages[subscriptionReason] || messages.DEFAULT;

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4">
//         <div className="relative max-w-md w-full">
//           <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl blur-xl opacity-20" />

//           <div className="relative bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-200">
//             <div className="mx-auto mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200">
//               <span className="text-3xl">🔒</span>
//             </div>

//             <h2 className="text-3xl font-bold text-slate-800 mb-3">{title}</h2>

//             <p className="text-slate-600 leading-relaxed mb-6">
//               {description}
//               <br />
//               <span className="text-sm">Please contact the restaurant owner for assistance.</span>
//             </p>

//             <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

//             <p className="text-sm text-slate-500">Access restricted due to subscription status</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleAddFromLowest = async (item) => {
//     try {
//       const res = await api.get(
//         `/api/user/${username}/dish/${item.id}`
//       );

//       setSelectedItem(res.data.data);
//     } catch (err) {
//       console.error("Failed to fetch full dish details", err);
//     }
//   };

//   // Main render
//   return (
//     <>
//       <SearchBar
//         value={searchQuery}
//         onChange={setSearchQuery}
//         cartCount={cart.length}
//       />

//       {/* Main scrollable container */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 pb-32">
        
//         {/* SearchHero with top padding */}
//         <div className="pt-[62px]">
//           <SearchHero
//             username={username}
//             onItemClick={(item) => setSelectedItem(item)}
//           />
//         </div>

//         {/* Category Grid */}
//         {categoryLoading ? (
//           <div className="max-w-screen-xl mx-auto px-4 mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <CategoryGrid
//             categories={categoryPreview}
//             activeCategory={activeCategory}
//             setActiveCategory={setActiveCategory}
//           />
//         )}

//         <LowestPriceItems items={lowestItems} onAdd={handleAddFromLowest} />
//         <SeasonalItems items={seasonalItems} onAdd={(item) => setSelectedItem(item)} />

//         {/* TAG FILTER */}
//         <TagFilter
//           tags={availableTags}
//           selectedTags={selectedTags}
//           meta={TAG_META}
//           onToggle={(tag) =>
//             setSelectedTags((prev) =>
//               prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//             )
//           }
//         />

//         {showInitialLoader && (
//           <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
//             <MenuLoader />
//           </div>
//         )}

//         <div className="max-w-screen-xl mx-auto px-4" ref={categorySectionRef}>
//           {filteredMenu.map((category) => (
//             <div
//               key={category.categoryId || category.name}
//               ref={(el) => {
//                 if (el) {
//                   categoryRefs.current[category.name] = el;
//                 }
//               }}
//               className="scroll-mt-32"
//             >
//               <CategorySection
//                 title={category.name}
//                 items={category.dishes}
//                 cart={cart}
//                 addToCart={setSelectedItem}
//                 openItemSheet={setSelectedItem}
//                 increaseQty={increaseQty}
//                 decreaseQty={decreaseQty}
//                 onArView={handleArView}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Show "No results" message if filtering returns nothing */}
//         {filteredMenu.length === 0 && !initialLoading && (debouncedSearch || selectedTags.length > 0) && (
//           <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-xl font-semibold text-slate-700 mb-2">No items found</h3>
//             <p className="text-slate-500">Try adjusting your search or filters</p>
//           </div>
//         )}

//         <div ref={loaderRef}>
//           <InfiniteLoader hasMore={hasMore} isFetching={isFetching} />
//         </div>

//         {selectedItem && (
//           <ItemBottomSheet
//             item={selectedItem}
//             isOpen={true}
//             onClose={() => setSelectedItem(null)}
//             cart={cart}
//             setCart={setCart}
//             cartKey={cartKey}
//           />
//         )}

//         {arItem && showArViewer && (
//           <ARViewer
//             item={arItem}
//             isOpen={true}
//             onClose={() => {
//               setShowArViewer(false);
//               setArItem(null);
//             }}
//           />
//         )}
        
//         <MenuJump
//           categories={filteredMenu}
//           categoryRefs={categoryRefs}
//         />

//         <CartBar cart={cart} />
//         <Footer restaurantName={username} />

//       </div>
//     </>
//   );
// }




import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CategoryGrid from "../components/menu/CategoryGrid";
import api from "../lib/api";
import LowestPriceItems from "../components/menu/LowestPriceItems.jsx";
import SeasonalItems from "../components/menu/SeasonalItems";
import { useMemo } from "react";

import ItemsGrid from "../components/menu/ItemsGrid";
import ItemBottomSheet from "../components/menu/ItemBottomSheet";
import CartBar from "../components/menu/CartBar";
import InfiniteLoader from "../components/menu/InfiniteLoader";
import MenuLoader from "../components/menu/MenuLoader";
import ARViewer from "../components/menu/ARViewer";
import SearchHero from "../components/menu/SearchHero";
import TagFilter from "../components/menu/TagFilter";

import usePaginatedMenu from "../hooks/usePaginatedMenu";
import useDebounce from "../hooks/useDebounce";

import { incrementARStat } from "../services/arStats.service";
import CategorySection from "../components/menu/CategorySection.jsx";
import SearchBar from "../components/menu/SearchBar.jsx";
import MenuJump from "../components/menu/MenuJump.jsx";
import Footer from "../components/menu/lower.jsx";

const TAG_META = {
  "chef-special": { label: "Chef Special", icon: "👨‍🍳" },
  "most-loved": { label: "Most Loved", icon: "❤️" },
  trending: { label: "Trending", icon: "🔥" },
  spicy: { label: "Spicy", icon: "🌶️" },
  "best-seller": { label: "Best Seller", icon: "⭐" },
  "new-arrival": { label: "New", icon: "🆕" },
  seasonal: { label: "Seasonal", icon: "❄️" },
  signature: { label: "Signature", icon: "✍️" },
};

// Helper function to scroll to category sections - SMOOTH on first search
const scrollToCategories = () => {
  const firstCategory = document.querySelector('.scroll-mt-32');
  if (firstCategory) {
    const offset = 150;
    const elementPosition = firstCategory.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth' // Smooth scroll for better UX
    });
  }
};

// Client-side filter function - OPTIMIZED & ERROR-FREE
const filterItems = (items, searchQuery, tags) => {
  if (!Array.isArray(items)) return [];
  
  let filtered = items;

  // Filter by search query
  if (searchQuery?.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      const name = item?.name?.toLowerCase() || '';
      const description = item?.description?.toLowerCase() || '';
      return name.includes(query) || description.includes(query);
    });
  }

  // Filter by tags
  if (tags?.length > 0) {
    filtered = filtered.filter(item => {
      if (!Array.isArray(item?.tags)) return false;
      return tags.some(selectedTag => 
        item.tags.some(tag => tag?.key === selectedTag)
      );
    });
  }

  return filtered;
};

export default function MenuPage() {
  const { id: username } = useParams();
  const navigate = useNavigate();
  const [lowestItems, setLowestItems] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [categoryPreview, setCategoryPreview] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const categoryRefs = useRef({});

  const [selectedItem, setSelectedItem] = useState(null);
  const [arItem, setArItem] = useState(null);
  const [showArViewer, setShowArViewer] = useState(false);
  
  const arViewedRef = useRef(new Set());
  const loaderRef = useRef(null);
  const hasSearchedRef = useRef(false);
  const categorySectionRef = useRef(null); // New ref for scroll target

  const cartKey = `cart_${username}`;
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
      return [];
    }
  });

  // Load ALL menu items initially (NO search/filter params)
  const {
    menu,
    items,
    fetchPage,
    hasMore,
    isFetching,
    initialLoading,
    notSubscribed,
    subscriptionReason,
  } = usePaginatedMenu(username, "", []); // Empty search and tags for API

  // Effects
  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart, cartKey]);

  useEffect(() => {
    if (!username) return;

    api
      .get(`/api/user/${username}/menu/seasonal`)
      .then((res) => {
        setSeasonalItems(res.data.data || []);
      })
      .catch(() => setSeasonalItems([]));
  }, [username]);

  useEffect(() => {
    if (!username) return;

    api
      .get(`/api/user/${username}/menu/lowest-price`)
      .then((res) => {
        setLowestItems(res.data.data || []);
      })
      .catch(() => setLowestItems([]));
  }, [username]);

  useEffect(() => {
    if (!username) return;

    setCategoryLoading(true);

    api
      .get(`/api/user/${username}/menu/category-preview`)
      .then((res) => {
        setCategoryPreview(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch category preview", err);
        setCategoryPreview([]);
      })
      .finally(() => {
        setCategoryLoading(false);
      });
  }, [username]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetching) {
          fetchPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, isFetching]);

  // Build allItems from API response
  useEffect(() => {
    setAllItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const newItems = items.filter((i) => !existingIds.has(i.id));
      return [...prev, ...newItems];
    });
  }, [items]);

  // Reset allItems on username change
  useEffect(() => {
    setAllItems([]);
  }, [username]);

  // AUTO-SCROLL IMMEDIATELY when searching/filtering - NO DEBOUNCE
  useEffect(() => {
    const hasActiveFilter = searchQuery.trim() || selectedTags.length > 0;
    
    if (hasActiveFilter) {
      // Scroll immediately on ANY character typed
      requestAnimationFrame(() => {
        scrollToCategories(categorySectionRef);
      });
    }
  }, [searchQuery, selectedTags]); // Watch searchQuery directly, not debounced

  // Event handlers
  const increaseQty = (itemId) => {
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decreaseQty = (itemId) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleArView = (item) => {
    setArItem(item);
    setShowArViewer(true);

    if (arViewedRef.current.has(item.id)) return;

    incrementARStat({
      restaurantId: username,
      itemName: item.name,
      imageUrl: item.imageUrl || item.thumbnailUrl,
    });

    arViewedRef.current.add(item.id);
  };

  const availableTags = useMemo(() => {
    return Object.keys(TAG_META);
  }, []);

  // CLIENT-SIDE FILTERED MENU - INSTANT filtering with searchQuery
  const filteredMenu = useMemo(() => {
    if (!Array.isArray(menu)) return [];
    
    return menu
      .map(category => ({
        ...category,
        dishes: filterItems(category.dishes || [], searchQuery, selectedTags)
      }))
      .filter(category => category.dishes.length > 0);
  }, [menu, searchQuery, selectedTags]); // Use searchQuery directly

  const showInitialLoader = initialLoading && items.length === 0;

  // Subscription error handling
  if (notSubscribed) {
    const messages = {
      NOT_SUBSCRIBED: "This restaurant has not activated a subscription yet.",
      PENDING_AUTH: "Restaurant subscription setup is incomplete.",
      EXPIRED: "This restaurant's subscription has expired.",
      TRIAL_EXPIRED: "The restaurant's free trial has ended.",
      DEFAULT: "Service for this restaurant is currently unavailable.",
    };

    const titleMap = {
      NOT_SUBSCRIBED: "Subscription Required",
      PENDING_AUTH: "Setup Pending",
      EXPIRED: "Subscription Expired",
      TRIAL_EXPIRED: "Trial Ended",
      DEFAULT: "Menu Unavailable",
    };

    const title = titleMap[subscriptionReason] || titleMap.DEFAULT;
    const description = messages[subscriptionReason] || messages.DEFAULT;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4">
        <div className="relative max-w-md w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl blur-xl opacity-20" />

          <div className="relative bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-200">
            <div className="mx-auto mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200">
              <span className="text-3xl">🔒</span>
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-3">{title}</h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {description}
              <br />
              <span className="text-sm">Please contact the restaurant owner for assistance.</span>
            </p>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

            <p className="text-sm text-slate-500">Access restricted due to subscription status</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddFromLowest = async (item) => {
    try {
      const res = await api.get(
        `/api/user/${username}/dish/${item.id}`
      );

      setSelectedItem(res.data.data);
    } catch (err) {
      console.error("Failed to fetch full dish details", err);
    }
  };

  // Main render
  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        cartCount={cart.length}
      />

      {/* Main scrollable container */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 pb-32">
        
        {/* SearchHero with top padding */}
        <div className="pt-[62px]">
          <SearchHero
            username={username}
            onItemClick={(item) => setSelectedItem(item)}
          />
        </div>

        {/* Category Grid */}
        {categoryLoading ? (
          <div className="max-w-screen-xl mx-auto px-4 mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <CategoryGrid
            categories={categoryPreview}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        <LowestPriceItems items={lowestItems} onAdd={handleAddFromLowest} />
        <SeasonalItems items={seasonalItems} onAdd={(item) => setSelectedItem(item)} />

        {/* TAG FILTER */}
        <TagFilter
          tags={availableTags}
          selectedTags={selectedTags}
          meta={TAG_META}
          onToggle={(tag) =>
            setSelectedTags((prev) =>
              prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
            )
          }
        />

        {showInitialLoader && (
          <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <MenuLoader />
          </div>
        )}

        <div className="max-w-screen-xl mx-auto px-4" ref={categorySectionRef}>
          {filteredMenu.map((category) => (
            <div
              key={category.categoryId || category.name}
              ref={(el) => {
                if (el) {
                  categoryRefs.current[category.name] = el;
                }
              }}
              className="scroll-mt-32"
            >
              <CategorySection
                title={category.name}
                items={category.dishes}
                cart={cart}
                addToCart={setSelectedItem}
                openItemSheet={setSelectedItem}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                onArView={handleArView}
              />
            </div>
          ))}
        </div>

        {/* Show "No results" message if filtering returns nothing */}
        {filteredMenu.length === 0 && !initialLoading && (searchQuery.trim() || selectedTags.length > 0) && (
          <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No items found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}

        <div ref={loaderRef}>
          <InfiniteLoader hasMore={hasMore} isFetching={isFetching} />
        </div>

        {selectedItem && (
          <ItemBottomSheet
            item={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            cart={cart}
            setCart={setCart}
            cartKey={cartKey}
          />
        )}

        {arItem && showArViewer && (
          <ARViewer
            item={arItem}
            isOpen={true}
            onClose={() => {
              setShowArViewer(false);
              setArItem(null);
            }}
          />
        )}
        
        <MenuJump
          categories={filteredMenu}
          categoryRefs={categoryRefs}
        />

        <CartBar cart={cart} />
        <Footer restaurantName={username} />

      </div>
    </>
  );
}