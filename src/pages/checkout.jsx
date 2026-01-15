import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CustomerDetails from "../components/checkout/CustomerDetails";
import OrderSummary from "../components/checkout/OrderSummary";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const cartKey = `cart_${username}`;
  const sessionKey = `session_${username}`;
  const sessionMetaKey = `session_meta_${username}`;
  const tableKey = `table_${username}`;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
    description: "",
  });

  /* LOAD CART */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }
  }, [cartKey]);

  /* TOTAL */
  const grandTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.totalPrice || 0),
        0
      ),
    [cart]
  );

  /* FORM */
  const handleChange = (e) => {
    setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* CHECKOUT */
  const handleCheckout = async () => {
    if (!details.name || !details.tableNumber) {
      alert("Please fill required fields");
      return;
    }

    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
const items = cart.map((item) => {
  const addons =
    Array.isArray(item.addons)
      ? item.addons
      : Array.isArray(item.addOns)
      ? item.addOns
      : [];

  return {
    itemId: item.itemId || item.id,
    name: item.name,
    imageUrl: item.imageUrl || "",
    variant: item.variant,
    addons, // ✅ correct
    qty: Number(item.qty),
    unitPrice: Number(item.unitPrice),
    totalPrice: Number(item.totalPrice),
  };
});


      const res = await api.post(`/api/checkout/${username}`, {
        customerName: details.name,
        phoneNumber: details.phone,
        tableNumber: Number(details.tableNumber),
        description: details.description,
        items,
        grandTotal,
      });

      const { sessionId, sessionStatus } = res.data;

      // if (sessionId && sessionStatus === "ACTIVE") {
      //   localStorage.setItem(sessionKey, sessionId);
      //   localStorage.setItem(
      //     sessionMetaKey,
      //     JSON.stringify({
      //       customerName: details.name,
      //       tableNumber: Number(details.tableNumber),
      //       phoneNumber: details.phone,
      //     })
      //   );
      // }
      
      if (sessionId && sessionStatus === "ACTIVE") {
        localStorage.setItem(sessionKey, sessionId);

        localStorage.setItem(
          sessionMetaKey,
          JSON.stringify({
            customerName: details.name,
            tableNumber: Number(details.tableNumber),
            phoneNumber: details.phone,
          })
        );

        // ✅ SAVE TABLE NUMBER ONLY AFTER SUCCESS
        localStorage.setItem(tableKey, String(details.tableNumber));
      }

      localStorage.removeItem(cartKey);
      setCart([]);

      navigate(`/greet/${username}`, { replace: true });
    } catch (err) {
      alert(
        err?.response?.data?.message || "Checkout failed"
      );
      localStorage.removeItem(sessionKey);
      localStorage.removeItem(sessionMetaKey);
    } finally {
      setLoading(false);
    }
  };

  /* EMPTY CART */
  if (!cart.length) {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-emerald-900">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
      <CheckoutHeader
        username={username}
        onBack={() => navigate(-1)}
      />

      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomerDetails
            details={details}
            onChange={handleChange}
          />
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
         <OrderSummary
  cart={cart}
  loading={loading}
  grandTotal={grandTotal}
  onCheckout={handleCheckout}
/>

        </div>
      </div>
    </div>
  );
}
