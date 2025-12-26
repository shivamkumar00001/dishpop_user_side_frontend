import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CustomerDetails from "../components/checkout/CustomerDetails";
import OrderSummary from "../components/checkout/OrderSummary";
import api from "../lib/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const cartKey = `cart_${username}`;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
    description: "",
  });

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(saved);
  }, [cartKey]);

  /* ---------------- GRAND TOTAL ---------------- */
  const grandTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);
  }, [cart]);

  /* ---------------- FORM HANDLING ---------------- */
  const handleChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------------- CHECKOUT ---------------- */
  const ordersKey = `orders_${username}`;

  const handleCheckout = async () => {
    if (!username) return alert("Invalid restaurant link");
    if (!details.name || !details.tableNumber)
      return alert("Please fill all required fields");
    if (cart.length === 0) return alert("Your cart is empty");

    setLoading(true);

    try {
      const items = cart.map(item => {
        const addonsTotal =
          item.addons?.reduce((s, a) => s + a.price, 0) || 0;

        const unitPrice = item.variant.price + addonsTotal;
        const totalPrice = unitPrice * item.qty;

        return {
          itemId: item.itemId || item.id,
          name: item.name,
          imageUrl: item.imageUrl || "",

          variant: item.variant,
          addons: item.addons || [],

          qty: item.qty,
          unitPrice,
          totalPrice,
        };
      });

      const grandTotal = items.reduce(
        (sum, i) => sum + i.totalPrice,
        0
      );

      const payload = {
        customerName: details.name.trim(),
        phoneNumber: details.phone || "",
        tableNumber: Number(details.tableNumber),
        description: details.description || "",
        items,
        grandTotal,
      };

      // ✅ BACKEND
      await api.post(`/api/checkout/${username}`, payload);

      // ✅ BUILD LOCAL ORDER
      const newOrder = {
        id: Date.now(),
        customerName: payload.customerName,
        phoneNumber: payload.phoneNumber,
        tableNumber: payload.tableNumber,
        description: payload.description,
        items,
        totalAmount: grandTotal,
        grandTotal: grandTotal,
        timestamp: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hrs
      };

      const existingOrders =
        JSON.parse(localStorage.getItem(ordersKey)) || [];

      localStorage.setItem(
        ordersKey,
        JSON.stringify([newOrder, ...existingOrders])
      );

      // ✅ CLEAR CART & REDIRECT
      localStorage.removeItem(cartKey);
      navigate(`/greet/${username}`);

    } catch (err) {
      alert(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 pb-20">
      <CheckoutHeader navigate={navigate} username={username} />

      <div className="max-w-screen-xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
        <CustomerDetails
          details={details}
          handleChange={handleChange}
        />

        <OrderSummary
          cart={cart}
          totalAmount={grandTotal}
          loading={loading}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}