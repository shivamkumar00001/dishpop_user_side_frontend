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
