import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import FoodLoader from "../ui/FoodLoader";



import CategoryHero from "./CategoryHero";
import CategorySection from "./CategorySection";
import ItemBottomSheet from "./ItemBottomSheet";
import ARViewer from "./ARViewer";
import CartBar from "./CartBar";

export default function CategoryPage() {
  const { id: username, categoryName } = useParams();
  const navigate = useNavigate();

  const cartKey = `cart_${username}`;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [arItem, setArItem] = useState(null);

  // ✅ HYDRATED CART
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    api
      .get(`/api/user/${username}/menu/category/${categoryName}`)
      .then((res) => {
        setItems(res.data.data?.dishes || []);
      })
      .finally(() => setLoading(false));
  }, [username, categoryName]);

  if (loading) {
  return <FoodLoader />;
}

  const categoryImage =
    items[0]?.imageUrl || items[0]?.thumbnailUrl;

  return (
    <div className="min-h-screen pb-32 relative">
      {/* 🔙 PREMIUM BACK BUTTON */}
<button
  onClick={() => navigate(`/menu/${username}`)}
  className="
    fixed
    top-6 left-4
    sm:top-8 sm:left-6
    z-[80]

    w-10 h-10
    flex items-center justify-center
    rounded-full

    text-white
    hover:text-white/90

    transition-all duration-200
    active:scale-90
  "
>
  <svg
    className="w-5 h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>


      {/* ✅ CATEGORY HERO */}
      <CategoryHero
        title={categoryName}
        imageUrl={categoryImage}
      />

      {/* ✅ ITEMS */}
      <div className="px-4 pt-6">
        <CategorySection
          title={categoryName}
          items={items}
          showTitle={false}   // 👈 NO BLACK TITLE
          cart={cart}
          addToCart={setSelectedItem}
          openItemSheet={setSelectedItem}
          onArView={(item) => setArItem(item)}
        />
      </div>

      {/* ✅ ITEM BOTTOM SHEET */}
      {selectedItem && (
        <ItemBottomSheet
          item={selectedItem}
          isOpen
          onClose={() => setSelectedItem(null)}
          cart={cart}
          setCart={setCart}
          cartKey={cartKey}
        />
      )}

      {/* ✅ AR VIEWER */}
      {arItem && (
        <ARViewer
          item={arItem}
          isOpen
          onClose={() => setArItem(null)}
        />
      )}

      {/* ✅ CART BAR */}
      <CartBar cart={cart} />
    </div>
  );
}
