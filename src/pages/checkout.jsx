// import { useEffect, useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const sessionKey = `session_${username}`;
//   const sessionMetaKey = `session_meta_${username}`;

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [details, setDetails] = useState({
//     name: "",
//     phone: "",
//     tableNumber: "",
//     description: "",
//   });

//   /* ---------------- LOAD CART ---------------- */
//   useEffect(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//       setCart(Array.isArray(saved) ? saved : []);
//     } catch {
//       setCart([]);
//     }
//   }, [cartKey]);

//   /* ---------------- TOTAL ---------------- */
//   const grandTotal = useMemo(
//     () =>
//       cart.reduce(
//         (sum, item) => sum + Number(item.totalPrice || 0),
//         0
//       ),
//     [cart]
//   );

//   /* ---------------- FORM ---------------- */
//   const handleChange = (e) => {
//     setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   /* ---------------- CHECKOUT ---------------- */
//   const handleCheckout = async () => {
//     if (!details.name || !details.tableNumber) {
//       alert("Please fill required fields");
//       return;
//     }

//     if (!cart.length) {
//       alert("Your cart is empty");
//       return;
//     }

//     setLoading(true);

//     try {
//       const items = cart.map((item) => ({
//         itemId: item.itemId || item.id,
//         name: item.name,
//         imageUrl: item.imageUrl || "",
//         variant: item.variant,
//         addons: item.addons || [],
//         qty: Number(item.qty),
//         unitPrice: Number(item.totalPrice) / Number(item.qty),
//         totalPrice: Number(item.totalPrice),
//       }));

//       const payload = {
//         customerName: details.name,
//         phoneNumber: details.phone,
//         tableNumber: Number(details.tableNumber),
//         description: details.description,
//         items,
//         grandTotal,
//       };

//       const res = await api.post(`/api/checkout/${username}`, payload);

//       const { sessionId, sessionStatus } = res.data;

//       /* ---------------- STORE SESSION ---------------- */
//       if (sessionId && sessionStatus === "ACTIVE") {
//         localStorage.setItem(sessionKey, sessionId);

//         localStorage.setItem(
//           sessionMetaKey,
//           JSON.stringify({
//             customerName: details.name,
//             tableNumber: Number(details.tableNumber),
//             phoneNumber: details.phone,
//           })
//         );
//       }

//       /* ---------------- CLEAR CART ---------------- */
//       localStorage.removeItem(cartKey);
//       setCart([]);

//       navigate(`/greet/${username}`, { replace: true });
//     } catch (err) {
//       const message =
//         err?.response?.data?.message || "Checkout failed";

//       /* 🔥 SESSION CLOSED / EXPIRED */
//       if (message.toLowerCase().includes("session")) {
//         localStorage.removeItem(sessionKey);
//         localStorage.removeItem(sessionMetaKey);

//         alert("Session expired. Please place order again.");
//         return;
//       }

//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- EMPTY CART ---------------- */
//   if (!cart.length) {
//     return (
//       <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center px-4">
//         <h2 className="text-lg font-semibold text-emerald-900 mb-2">
//           Your cart is empty
//         </h2>
//         <p className="text-sm text-emerald-600 mb-6 text-center">
//           Add items from the menu to place an order
//         </p>

//         <button
//           onClick={() => navigate(`/menu/${username}`)}
//           className="bg-emerald-600 hover:bg-emerald-700 
//                      text-white px-6 py-3 rounded-xl 
//                      font-semibold shadow transition"
//         >
//           Go to Menu
//         </button>
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
//       {/* HEADER */}
//       <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-emerald-200">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 flex items-center justify-center rounded-full 
//                        bg-emerald-100 text-emerald-700 
//                        hover:bg-emerald-200 transition"
//           >
//             ←
//           </button>

//           <div>
//             <h1 className="text-lg font-semibold text-emerald-900">
//               Checkout
//             </h1>
//             <p className="text-xs text-emerald-600">
//               Ordering from {username}
//             </p>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT */}
// <div className="lg:col-span-2">
//   <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6">
//     <h2 className="text-sm font-semibold text-emerald-900 mb-4">
//       Customer & Table Details
//     </h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {[
//         { label: "Customer Name *", name: "name" },
//         { label: "Phone Number", name: "phone" },
//         { label: "Table Number *", name: "tableNumber" },
//       ].map((f) => (
//         <div key={f.name}>
//           <label className="block text-xs font-medium text-emerald-700 mb-1">
//             {f.label}
//           </label>
//           <input
//             name={f.name}
//             value={details[f.name]}
//             onChange={handleChange}
//             className="w-full rounded-xl border border-emerald-300 
//                        px-4 py-3 text-sm
//                        focus:ring-2 focus:ring-emerald-500 
//                        focus:border-emerald-500 outline-none"
//           />
//         </div>
//       ))}
//     </div>

//     {/* ✅ DESCRIPTION FIELD — ADD HERE */}
//     <div className="mt-4">
//       <label className="block text-xs font-medium text-emerald-700 mb-1">
//         Order Notes (optional)
//       </label>
//       <textarea
//         name="description"
//         value={details.description}
//         onChange={handleChange}
//         placeholder="Any special instructions? (less spicy, no onions, etc.)"
//         rows={3}
//         className="w-full rounded-xl border border-emerald-300
//                    px-4 py-3 text-sm resize-none
//                    focus:ring-2 focus:ring-emerald-500
//                    focus:border-emerald-500 outline-none"
//       />
//     </div>
//   </div>
// </div>


//         {/* RIGHT */}
//         <div className="lg:sticky lg:top-24 h-fit">
//           <div className="bg-white rounded-3xl border border-emerald-200 shadow-lg p-6 space-y-4">
//             <h2 className="text-sm font-semibold text-emerald-900">
//               Order Summary
//             </h2>

//             <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center text-sm"
//                 >
//                   <span className="text-emerald-700 truncate">
//                     {item.name} × {item.qty}
//                   </span>
//                   <span className="font-semibold text-emerald-900">
//                     ₹{item.totalPrice}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <button
//               disabled={loading}
//               onClick={handleCheckout}
//               className="w-full bg-emerald-600 hover:bg-emerald-700
//                          text-white py-4 rounded-2xl font-semibold
//                          shadow-xl active:scale-[0.98]
//                          disabled:opacity-60 transition"
//             >
//               {loading ? "Placing Order..." : "Confirm Order"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
