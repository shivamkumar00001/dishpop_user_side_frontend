import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CustomerDetails from "../components/checkout/CustomerDetails";
import OrderSummary from "../components/checkout/OrderSummary";
import api from "../lib/api";



export default function CheckoutPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
    description: "",
  });

  // Load cart
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // ⭐ UPDATED CHECKOUT WITH 6-HOUR EXPIRY
  const handleCheckout = async () => {
    if (!details.name || !details.phone || !details.tableNumber) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: details.name,
        phoneNumber: details.phone,
        tableNumber: Number(details.tableNumber),
        description: details.description,
        items: cart.map((item) => ({
          itemId: item._id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
      };



      // Calculate total
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      // --- CALL BACKEND ---
      // await axios.post(
      //     `http://localhost:3000/api/checkout/${params.id}`,
      //     payload,
      //   );
      await api.post(`/api/checkout/${params.id}`, payload);

      // --- SAVE ORDER LOCALLY WITH 6-HOUR EXPIRY ---
      const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const newOrder = {
        id: Date.now(),
        timestamp: Date.now(),
        expiresAt: Date.now() + 6 * 60 * 60 * 1000, // ⏳ EXPIRES IN 6 HOURS
        ...payload,
        totalAmount,
      };

      previousOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(previousOrders));

      // CLEAR CART
      localStorage.removeItem("cart");
      setCart([]);

      // REDIRECT
      navigate(`/greet/${params.id}`);

    } catch (err) {
      let raw = err.response?.data?.errors?.[0]?.message;
      let finalMsg;

      try {
        const json = JSON.parse(raw);
        finalMsg = json[0]?.message || raw;
      } catch {
        finalMsg = raw || "Something went wrong";
      }

      alert(finalMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-20 flex flex-col">
      
      <CheckoutHeader navigate={navigate} params={params} />

      <div className="max-w-screen-xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">

        <CustomerDetails details={details} handleChange={handleChange} />

        <OrderSummary
          cart={cart}
          totalAmount={totalAmount}
          loading={loading}
          handleCheckout={handleCheckout}
        />

      </div>
    </div>
  );
}
