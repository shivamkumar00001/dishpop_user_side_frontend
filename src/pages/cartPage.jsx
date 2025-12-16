import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CartHeader from "../components/cart/CartHeader";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    const Set = ()=>{
      setCart(saved);
    }
    Set();
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (_id) => {
    updateCart(
      cart.map((item) =>
        item._id === _id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (_id) => {
    updateCart(
      cart
        .map((item) =>
          item._id === _id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col">
      
      <CartHeader cart={cart} navigate={navigate} params={params} />

      <div className="flex-1 max-w-screen-xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="mt-24 text-center">
            <p className="text-xl font-semibold text-gray-600">
              Your cart is empty 🍃
            </p>

            <button
              onClick={() => navigate(`/menu/${params.id}`)}
              className="mt-6 bg-green-600 hover:bg-green-700 transition
              px-8 py-3 text-white rounded-xl shadow-md"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />
              ))}
            </div>

            {/* SUMMARY (Sticky on desktop) */}
            <div className="lg:sticky lg:top-24 h-fit">
              <CartSummary
                totalAmount={totalAmount}
                navigate={navigate}
                params={params}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6">
        © 2025 DishPop — Order Happiness 🍽️
      </footer>
    </div>
  );
}
