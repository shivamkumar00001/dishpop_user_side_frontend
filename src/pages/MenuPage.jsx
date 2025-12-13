import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/menu/Header";
import SearchBar from "../components/menu/SearchBar";
import CategorySelector from "../components/menu/CategorySelector";
import ItemsGrid from "../components/menu/ItemsGrid";
import ARViewer from "../components/menu/ARViewer";
import ItemBottomSheet from "../components/menu/ItemBottomSheet";
import MenuLoader from "../components/menu/MenuLoader";
import RetryScreen from "../components/menu/RetryScreen";
import InfiniteLoader from "../components/menu/InfiniteLoader";
import { incrementARStat } from "../services/arStats.service";
import useDebounce from "../hooks/useDebounce";
import usePaginatedMenu from "../hooks/usePaginatedMenu";

export default function MenuPage() {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const params = useParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔑 Debounced search
  const debouncedSearch = useDebounce(searchQuery, 500);
  const isSearching = Boolean(debouncedSearch);

  const {
    items,
    categories,
    fetchPage,
    hasMore,
    initialLoading,
    isFetching,
    initialLoadError,
    hasResolvedOnce,
    retry,
  } = usePaginatedMenu(
    restaurantId,
    activeCategory,
    debouncedSearch
  );

  const autoCategories = [
    "All",
    ...new Set(items.map(i => i.category?.trim()).filter(Boolean)),
  ];

  const finalCategories =
    categories.length > 1 ? categories : autoCategories;

  const [cart, setCart] = useState([]);
  const [animateCount, setAnimateCount] = useState(false);
  const [arItem, setArItem] = useState(null);
  const [showArViewer, setShowArViewer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loaderRef = useRef(null);

  // Load cart once
  useEffect(() => {
   const Set = ()=>{
       setCart(JSON.parse(localStorage.getItem("cart")) || []);
   }
   Set();
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const exists = cart.find((i) => i._id === item._id);
    const updated = exists
      ? cart.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        )
      : [...cart, { ...item, qty: 1 }];

    updateCart(updated);
    setAnimateCount(true);
    setTimeout(() => setAnimateCount(false), 300);
  };

  const increaseQty = (id) =>
    updateCart(cart.map((i) =>
      i._id === id ? { ...i, qty: i.qty + 1 } : i
    ));

  const decreaseQty = (id) =>
    updateCart(
      cart
        .map((i) =>
          i._id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );

 const openArViewer = (item) => {
  setArItem(item);
  setShowArViewer(true);

  // 🔥 Track AR view click
  incrementARStat({
    restaurantId,
    itemName: item.name,
    imageUrl: item.imageUrl || item.thumbnailUrl,
  });
};

  // 🔥 Infinite scroll (disabled during search)
  useEffect(() => {
    if (!loaderRef.current || isSearching) return;

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
  }, [fetchPage, hasMore, isFetching, isSearching]);

  // ❗ Retry only for FIRST load
  if (initialLoadError && items.length === 0 && !isSearching) {
    return <RetryScreen retry={retry} />;
  }

  // ❗ Loader only for FIRST load
  if (initialLoading) return <MenuLoader />;

  // ✅ Stable empty state
  const showEmptyState =
    hasResolvedOnce &&
    items.length === 0 &&
    !initialLoadError;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-20">
      <Header
        navigate={navigate}
        cart={cart}
        params={params}
        animateCount={animateCount}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CategorySelector
        categories={finalCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ItemsGrid
        items={items}
        addToCart={addToCart}
        openItemSheet={setSelectedItem}
        handleArView={openArViewer}
      />

      {showEmptyState && (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg font-semibold">No items found</p>
          <p className="text-sm">
            {isSearching
              ? "Try a different search term"
              : "Try a different category"}
          </p>
        </div>
      )}

      {!isSearching && (
        <div ref={loaderRef}>
          <InfiniteLoader
            hasMore={hasMore}
            isFetching={isFetching}
          />
        </div>
      )}

      <ItemBottomSheet
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        addToCart={addToCart}
      />

      <ARViewer
        item={arItem}
        isOpen={showArViewer}
        onClose={() => setShowArViewer(false)}
      />
    </div>
  );
}
