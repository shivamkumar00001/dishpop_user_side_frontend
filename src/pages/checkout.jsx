import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CustomerDetails from "../components/checkout/CustomerDetails";
import OrderSummary from "../components/checkout/OrderSummary";
import api from "../lib/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { id: username } = useParams(); // ✅ username

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
    description: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckout = async () => {
    if (!username) return alert("Invalid restaurant link");
    if (!details.name || !details.tableNumber)
      return alert("Please fill all required fields");
    if (cart.length === 0) return alert("Your cart is empty");

    setLoading(true);

    try {
      const payload = {
        customerName: details.name.trim(),
        phoneNumber: details.phone ? String(details.phone) : "",
        tableNumber: Number(details.tableNumber),
        description: details.description || "",
        items: cart.map(item => ({
          itemId: item._id,
          name: item.name,
          qty: Number(item.qty),
          price: Number(item.price),
          imageUrl: item.imageUrl || ""
        }))
      };

      await api.post(`/api/checkout/${username}`, payload);

      localStorage.removeItem("cart");
      navigate(`/greet/${username}`);

    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 pb-20">
      <CheckoutHeader navigate={navigate} username={username} />

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
