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

import useDebounce from "../hooks/useDebounce";
import usePaginatedMenu from "../hooks/usePaginatedMenu";

export default function MenuPage() {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const params = useParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);

  const {
    items,
    categories,
    fetchPage,
    hasMore,
    initialLoading,
    isFetching,
    networkError,
    retry,
  } = usePaginatedMenu(restaurantId, activeCategory, debouncedSearch);

  // Auto categories fallback
  const autoCategories = [
    "All",
    ...new Set(
      items
        .map((i) => i.category?.trim() || "All")
        .filter((c) => c !== "All")
    ),
  ];

  const finalCategories = categories.length > 1 ? categories : autoCategories;

  const [cart, setCart] = useState([]);
  const [animateCount, setAnimateCount] = useState(false);
  const [arItem, setArItem] = useState(null);
  const [showArViewer, setShowArViewer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loaderRef = useRef(null);

  useEffect(() => {
    const Set = () =>{
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
    updateCart(
      cart.map((i) => (i._id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  const decreaseQty = (id) =>
    updateCart(
      cart
        .map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );

  const openArViewer = (item) => {
    setArItem(item);
    setShowArViewer(true);
  };

  // Infinite Scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchPage();
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [fetchPage, hasMore, isFetching]);

  if (networkError) return <RetryScreen retry={retry} />;
  if (initialLoading) return <MenuLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-20">
      <Header
        navigate={navigate}
        cart={cart}
        params={params}
        animateCount={animateCount}
      />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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

      <div ref={loaderRef}>
        <InfiniteLoader hasMore={hasMore} isFetching={isFetching} />
      </div>

      <ItemBottomSheet
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        addToCart={addToCart}   // ⭐ ADD THIS
      />


      <ARViewer
        item={arItem}
        isOpen={showArViewer}
        onClose={() => setShowArViewer(false)}
      />
    </div>
  );
}
