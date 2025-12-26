import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/menu/Header";
import SearchBar from "../components/menu/SearchBar";
import CategorySelector from "../components/menu/CategorySelector";
import ItemsGrid from "../components/menu/ItemsGrid";
import ItemBottomSheet from "../components/menu/ItemBottomSheet";
import CartBar from "../components/menu/CartBar";
import InfiniteLoader from "../components/menu/InfiniteLoader";
import MenuLoader from "../components/menu/MenuLoader";
import ARViewer from "../components/menu/ARViewer";

import usePaginatedMenu from "../hooks/usePaginatedMenu";
import useDebounce from "../hooks/useDebounce";

import { incrementARStat } from "../services/arStats.service";

export default function MenuPage() {
  const { id: username } = useParams();
  const navigate = useNavigate();

  // All hooks must be called in the same order every render
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [arItem, setArItem] = useState(null);
  const [showArViewer, setShowArViewer] = useState(false);
  
  const arViewedRef = useRef(new Set());
  const loaderRef = useRef(null);

  const cartKey = `cart_${username}`;
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
      return [];
    }
  });

  // Custom hook call - must be before any early returns
  const {
    menu,
    items,
    fetchPage,
    hasMore,
    isFetching,
    initialLoading,
    notSubscribed,
    subscriptionReason,
  } = usePaginatedMenu(username, debouncedSearch);

  // Effects after all hooks
  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart, cartKey]);

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

  // Computed values
  const visibleCategories = menu
    .filter((c) => c.dishes.length > 0)
    .map((c) => c.name);

  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category?.name === activeCategory);

  const showInitialLoader = initialLoading && items.length === 0;

  // Conditional render for subscription error - AFTER all hooks
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

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 pb-32 overflow-x-hidden">
      <Header navigate={navigate} cart={cart} params={{ id: username }} />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategorySelector
        categories={["All", ...visibleCategories]}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {showInitialLoader && (
        <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <MenuLoader />
        </div>
      )}

      <ItemsGrid
        items={visibleItems}
        cart={cart}
        addToCart={(item) => setSelectedItem(item)}
        openItemSheet={setSelectedItem}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        onArView={handleArView}
      />

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

      <CartBar cart={cart} />
    </div>
  );
}