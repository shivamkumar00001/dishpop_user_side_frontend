import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CartHeader from "../components/cart/CartHeader";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [cart, setCart] = useState([]);

  // LOAD CART
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
    const updated = cart.map((item) =>
      item._id === _id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (_id) => {
    const updated = cart
      .map((item) =>
        item._id === _id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    updateCart(updated);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">

      {/* HEADER */}
      <CartHeader cart={cart} navigate={navigate} params={params} />

      {/* CONTENT */}
      <div className="flex-1 max-w-screen-xl mx-auto px-4 mt-6 pb-32">

        {cart.length === 0 ? (
          <div className="mt-24 text-center">
            <p className="text-gray-500 text-lg font-semibold">
              Your cart is empty
            </p>

            <button
              onClick={() => navigate(`/menu/${params.id}`)}
              className="mt-5 bg-green-600 hover:bg-green-700 transition px-7 py-3 text-white rounded-xl shadow-md"
            >
              Add Items
            </button>
          </div>
        ) : (
          <div className="space-y-5">

            {/* All Cart Items */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />
              ))}
            </div>

            {/* Summary Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4">
              <CartSummary
                totalAmount={totalAmount}
                navigate={navigate}
                params={params}
              />
            </div>

          </div>
        )}
      </div>

      <footer className="text-center text-gray-500 py-6">
        © 2025 DishPop — Order Happiness 🍽️
      </footer>
    </div>
  );
}
