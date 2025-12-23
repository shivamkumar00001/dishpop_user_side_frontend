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

  /* ---------------- FILTERS ---------------- */
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  /* ---------------- BOTTOM SHEET ---------------- */
  const [selectedItem, setSelectedItem] = useState(null);

  /* ---------------- AR VIEW ---------------- */
  const [arItem, setArItem] = useState(null);
  const [showArViewer, setShowArViewer] = useState(false);

  // prevent duplicate AR stats
  const arViewedRef = useRef(new Set());

  /* ---------------- CART ---------------- */
  const cartKey = `cart_${username}`;
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(cartKey)) || []
  );

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  const increaseQty = (itemId) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (itemId) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === itemId ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  /* ---------------- DATA ---------------- */
const {
  menu,
  items,
  fetchPage,
  hasMore,
  isFetching,
  initialLoading,
  notSubscribed, // 🔥 NEW
} = usePaginatedMenu(username, debouncedSearch);


  /* ---------------- AR HANDLER ---------------- */
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

  /* ---------------- PAGINATION ---------------- */
  const loaderRef = useRef(null);

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

  /* ---------------- FILTERED VIEW ---------------- */
  const visibleCategories = menu
    .filter((c) => c.dishes.length > 0)
    .map((c) => c.name);

  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter(
          (i) => i.category?.name === activeCategory
        );

  /* ---------------- LOADER CONTROL ---------------- */
  const showInitialLoader =
    initialLoading && items.length === 0;

if (notSubscribed) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
      <div className="relative max-w-md w-full">
        {/* Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-rose-500 rounded-2xl blur opacity-25"></div>

        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl">🔒</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Menu Unavailable
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            Service for this restaurant is currently unavailable.

            <br />
            Please contact the restaurant owner for assistance.
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500">
            Service temporarily restricted
          </p>
        </div>
      </div>
    </div>
  );
}

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-28">
      <Header navigate={navigate} cart={cart} params={{ id: username }} />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CategorySelector
        categories={["All", ...visibleCategories]}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* 🔥 OVERLAY LOADER (NO UNMOUNT) */}
      {showInitialLoader && (
        <div className="fixed inset-0 z-40 bg-white/60 backdrop-blur-sm flex items-center justify-center">
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

      <ItemBottomSheet
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        cart={cart}
        setCart={setCart}
        cartKey={cartKey}
      />

      <ARViewer
        item={arItem}
        isOpen={showArViewer}
        onClose={() => setShowArViewer(false)}
      />

      <CartBar cart={cart} />
    </div>
  );
}
