import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CartHeader from "../components/cart/CartHeader";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage() {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const cartKey = `cart_${username}`;
  const [cart, setCart] = useState([]);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(saved);
  }, [cartKey]);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  /* ---------------- QTY CONTROLS ---------------- */
  const increaseQty = (itemId) => {
    updateCart(
      cart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              qty: item.qty + 1,
              totalPrice: item.unitPrice * (item.qty + 1),
            }
          : item
      )
    );
  };

  const decreaseQty = (itemId) => {
    updateCart(
      cart
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                qty: item.qty - 1,
                totalPrice: item.unitPrice * (item.qty - 1),
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  /* ---------------- TOTAL ---------------- */
  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex flex-col">
      <CartHeader cart={cart} navigate={navigate} username={username} />

      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {cart.length === 0 ? (
          <div className="mt-20 text-center px-4">
            <div className="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-slate-100">
              <span className="text-4xl">🛒</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
              Your cart is empty
            </p>
            <p className="text-slate-600 mb-6">
              Add some delicious items to get started
            </p>

            <button
              onClick={() => navigate(`/menu/${username}`)}
              className="bg-gradient-to-r from-slate-800 to-slate-700 text-white 
                       px-6 sm:px-8 py-3 rounded-xl font-bold shadow-lg
                       hover:from-slate-700 hover:to-slate-600 hover:shadow-xl
                       active:scale-95 transition-all duration-200"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ITEMS */}
            <section className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />
              ))}
            </section>

            {/* SUMMARY */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <CartSummary
                totalAmount={totalAmount}
                navigate={navigate}
                username={username}
              />
            </aside>
          </div>
        )}
      </main>

      <footer className="text-center text-slate-500 py-4 sm:py-6 text-sm border-t border-slate-200">
        © 2025 DishPop — Order Happiness 🍽️
      </footer>
    </div>
  );
}