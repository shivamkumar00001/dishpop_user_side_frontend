// // // // import { useEffect, useState, useMemo } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";

// // // // import CheckoutHeader from "../components/checkout/CheckoutHeader";
// // // // import CustomerDetails from "../components/checkout/CustomerDetails";
// // // // import OrderSummary from "../components/checkout/OrderSummary";
// // // // import api from "../lib/api";

// // // // export default function CheckoutPage() {
// // // //   const navigate = useNavigate();
// // // //   const { id: username } = useParams();

// // // //   const cartKey = `cart_${username}`;

// // // //   const [cart, setCart] = useState([]);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const [details, setDetails] = useState({
// // // //     name: "",
// // // //     phone: "",
// // // //     tableNumber: "",
// // // //     description: "",
// // // //   });

// // // //   /* ---------------- LOAD CART ---------------- */
// // // //   useEffect(() => {
// // // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // // //     setCart(saved);
// // // //   }, [cartKey]);

// // // //   /* ---------------- GRAND TOTAL ---------------- */
// // // //   const grandTotal = useMemo(() => {
// // // //     return cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);
// // // //   }, [cart]);

// // // //   /* ---------------- FORM HANDLING ---------------- */
// // // //   const handleChange = (e) => {
// // // //     setDetails((prev) => ({
// // // //       ...prev,
// // // //       [e.target.name]: e.target.value,
// // // //     }));
// // // //   };

// // // //   /* ---------------- CHECKOUT ---------------- */
// // // //   const ordersKey = `orders_${username}`;

// // // //   const handleCheckout = async () => {
// // // //     if (!username) return alert("Invalid restaurant link");
// // // //     if (!details.name || !details.tableNumber)
// // // //       return alert("Please fill all required fields");
// // // //     if (cart.length === 0) return alert("Your cart is empty");

// // // //     setLoading(true);

// // // //     try {
// // // //       const items = cart.map(item => {
// // // //         const addonsTotal =
// // // //           item.addons?.reduce((s, a) => s + a.price, 0) || 0;

// // // //         const unitPrice = item.variant.price + addonsTotal;
// // // //         const totalPrice = unitPrice * item.qty;

// // // //         return {
// // // //           itemId: item.itemId || item.id,
// // // //           name: item.name,
// // // //           imageUrl: item.imageUrl || "",

// // // //           variant: item.variant,
// // // //           addons: item.addons || [],

// // // //           qty: item.qty,
// // // //           unitPrice,
// // // //           totalPrice,
// // // //         };
// // // //       });

// // // //       const grandTotal = items.reduce(
// // // //         (sum, i) => sum + i.totalPrice,
// // // //         0
// // // //       );

// // // //       const payload = {
// // // //         customerName: details.name.trim(),
// // // //         phoneNumber: details.phone || "",
// // // //         tableNumber: Number(details.tableNumber),
// // // //         description: details.description || "",
// // // //         items,
// // // //         grandTotal,
// // // //       };

// // // //       // ✅ BACKEND
// // // //       await api.post(`/api/checkout/${username}`, payload);

// // // //       // ✅ BUILD LOCAL ORDER
// // // //       const newOrder = {
// // // //         id: Date.now(),
// // // //         customerName: payload.customerName,
// // // //         phoneNumber: payload.phoneNumber,
// // // //         tableNumber: payload.tableNumber,
// // // //         description: payload.description,
// // // //         items,
// // // //         totalAmount: grandTotal,
// // // //         grandTotal: grandTotal,
// // // //         timestamp: Date.now(),
// // // //         expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hrs
// // // //       };

// // // //       const existingOrders =
// // // //         JSON.parse(localStorage.getItem(ordersKey)) || [];

// // // //       localStorage.setItem(
// // // //         ordersKey,
// // // //         JSON.stringify([newOrder, ...existingOrders])
// // // //       );

// // // //       // ✅ CLEAR CART & REDIRECT
// // // //       localStorage.removeItem(cartKey);
// // // //       navigate(`/greet/${username}`);

// // // //     } catch (err) {
// // // //       alert(err.message || "Checkout failed");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   /* ---------------- UI ---------------- */
// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 pb-20">
// // // //       <CheckoutHeader navigate={navigate} username={username} />

// // // //       <div className="max-w-screen-xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
// // // //         <CustomerDetails
// // // //           details={details}
// // // //           handleChange={handleChange}
// // // //         />

// // // //         <OrderSummary
// // // //           cart={cart}
// // // //           totalAmount={grandTotal}
// // // //           loading={loading}
// // // //           handleCheckout={handleCheckout}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState, useMemo } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";

// // // import CheckoutHeader from "../components/checkout/CheckoutHeader";
// // // import CustomerDetails from "../components/checkout/CustomerDetails";
// // // import OrderSummary from "../components/checkout/OrderSummary";
// // // import api from "../lib/api";

// // // export default function CheckoutPage() {
// // //   const navigate = useNavigate();
// // //   const { id: username } = useParams();

// // //   const cartKey = `cart_${username}`;

// // //   const [cart, setCart] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   const [details, setDetails] = useState({
// // //     name: "",
// // //     phone: "",
// // //     tableNumber: "",
// // //     description: "",
// // //   });

// // //   // 🔥 NEW: Payment Mode
// // //   const [paymentMode, setPaymentMode] = useState("COUNTER"); // COUNTER | ONLINE

// // //   /* ---------------- LOAD CART ---------------- */
// // //   useEffect(() => {
// // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // //     setCart(saved);
// // //   }, [cartKey]);

// // //   /* ---------------- GRAND TOTAL ---------------- */
// // //   const grandTotal = useMemo(() => {
// // //     return cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);
// // //   }, [cart]);

// // //   /* ---------------- FORM HANDLING ---------------- */
// // //   const handleChange = (e) => {
// // //     setDetails((prev) => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value,
// // //     }));
// // //   };

// // //   /* ---------------- CHECKOUT ---------------- */
// // //   const ordersKey = `orders_${username}`;

// // //   const handleCheckout = async () => {
// // //     if (!username) return alert("Invalid restaurant link");
// // //     if (!details.name || !details.tableNumber)
// // //       return alert("Please fill all required fields");
// // //     if (cart.length === 0) return alert("Your cart is empty");

// // //     setLoading(true);

// // //     try {
// // //       const items = cart.map((item) => {
// // //         const addonsTotal =
// // //           item.addons?.reduce((s, a) => s + a.price, 0) || 0;

// // //         const unitPrice = item.variant.price + addonsTotal;
// // //         const totalPrice = unitPrice * item.qty;

// // //         return {
// // //           itemId: item.itemId || item.id,
// // //           name: item.name,
// // //           imageUrl: item.imageUrl || "",
// // //           variant: item.variant,
// // //           addons: item.addons || [],
// // //           qty: item.qty,
// // //           unitPrice,
// // //           totalPrice,
// // //         };
// // //       });

// // //       const payload = {
// // //         customerName: details.name.trim(),
// // //         phoneNumber: details.phone || "",
// // //         tableNumber: Number(details.tableNumber),
// // //         description: details.description || "",
// // //         items,
// // //         grandTotal,
// // //         paymentMode, // 🔥 NEW FIELD
// // //       };

// // //       // ✅ BACKEND
// // //       await api.post(`/api/checkout/${username}`, payload);

// // //       // ✅ LOCAL ORDER SAVE
// // //       const newOrder = {
// // //         id: Date.now(),
// // //         customerName: payload.customerName,
// // //         phoneNumber: payload.phoneNumber,
// // //         tableNumber: payload.tableNumber,
// // //         description: payload.description,
// // //         items,
// // //         paymentMode,
// // //         totalAmount: grandTotal,
// // //         grandTotal,
// // //         timestamp: Date.now(),
// // //         expiresAt: Date.now() + 24 * 60 * 60 * 1000,
// // //       };

// // //       const existingOrders =
// // //         JSON.parse(localStorage.getItem(ordersKey)) || [];

// // //       localStorage.setItem(
// // //         ordersKey,
// // //         JSON.stringify([newOrder, ...existingOrders])
// // //       );

// // //       localStorage.removeItem(cartKey);
// // //       navigate(`/greet/${username}`);
// // //     } catch (err) {
// // //       alert(err.message || "Checkout failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   /* ---------------- UI ---------------- */
// // //   return (
// // //     <div className="min-h-screen bg-slate-100 pb-24">
// // //       <CheckoutHeader navigate={navigate} username={username} />

// // //       <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         {/* LEFT SECTION */}
// // //         <div className="lg:col-span-2 space-y-6">
// // //           {/* CUSTOMER DETAILS */}
// // //           <div className="bg-white rounded-2xl border p-5">
// // //             <h2 className="text-base font-semibold text-slate-900 mb-4">
// // //               Customer & Table Details
// // //             </h2>

// // //             <CustomerDetails
// // //               details={details}
// // //               handleChange={handleChange}
// // //             />
// // //           </div>

// // //           {/* 🔥 PAYMENT MODE */}
// // //           <div className="bg-white rounded-2xl border p-5">
// // //             <h2 className="text-base font-semibold text-slate-900 mb-4">
// // //               Payment Method
// // //             </h2>

// // //             <div className="flex gap-3">
// // //               {/* PAY AT COUNTER */}
// // //               <button
// // //                 onClick={() => setPaymentMode("COUNTER")}
// // //                 className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition
// // //                   ${
// // //                     paymentMode === "COUNTER"
// // //                       ? "border-emerald-600 bg-emerald-50 text-emerald-700"
// // //                       : "border-slate-200 text-slate-600 hover:border-slate-300"
// // //                   }`}
// // //               >
// // //                 Pay at Counter
// // //                 <p className="text-xs font-normal mt-1">
// // //                   Pay after dining
// // //                 </p>
// // //               </button>

// // //               {/* PAY NOW */}
// // //               <button
// // //                 onClick={() => setPaymentMode("ONLINE")}
// // //                 className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition
// // //                   ${
// // //                     paymentMode === "ONLINE"
// // //                       ? "border-emerald-600 bg-emerald-50 text-emerald-700"
// // //                       : "border-slate-200 text-slate-600 hover:border-slate-300"
// // //                   }`}
// // //               >
// // //                 Pay Now
// // //                 <p className="text-xs font-normal mt-1">
// // //                   Online payment
// // //                 </p>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* RIGHT SECTION */}
// // //         <div className="lg:sticky lg:top-24 h-fit">
// // //           <div className="bg-white rounded-2xl border p-5">
// // //             <OrderSummary
// // //               cart={cart}
// // //               totalAmount={grandTotal}
// // //               loading={loading}
// // //               handleCheckout={handleCheckout}
// // //               paymentMode={paymentMode} // optional future use
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState, useMemo } from "react";
// // import { useNavigate, useParams } from "react-router-dom";

// // import CheckoutHeader from "../components/checkout/CheckoutHeader";
// // import CustomerDetails from "../components/checkout/CustomerDetails";
// // import OrderSummary from "../components/checkout/OrderSummary";
// // import api from "../lib/api";

// // export default function CheckoutPage() {
// //   const navigate = useNavigate();
// //   const { id: username } = useParams();

// //   const cartKey = `cart_${username}`;

// //   const [cart, setCart] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const [details, setDetails] = useState({
// //     name: "",
// //     phone: "",
// //     tableNumber: "",
// //     description: "",
// //   });

// //   // 🔥 Payment Mode
// //   const [paymentMode, setPaymentMode] = useState("COUNTER");

// //   /* ---------------- LOAD CART ---------------- */
// //   useEffect(() => {
// //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// //     setCart(saved);
// //   }, [cartKey]);

// //   /* ---------------- GRAND TOTAL ---------------- */
// //   const grandTotal = useMemo(() => {
// //     return cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);
// //   }, [cart]);

// //   /* ---------------- FORM HANDLING ---------------- */
// //   const handleChange = (e) => {
// //     setDetails((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   /* ---------------- CHECKOUT ---------------- */
// //   const ordersKey = `orders_${username}`;

// //   const handleCheckout = async () => {
// //     if (!username) return alert("Invalid restaurant link");
// //     if (!details.name || !details.tableNumber)
// //       return alert("Please fill all required fields");
// //     if (cart.length === 0) return alert("Your cart is empty");

// //     setLoading(true);

// //     try {
// //       const items = cart.map((item) => {
// //         const addonsTotal =
// //           item.addons?.reduce((s, a) => s + a.price, 0) || 0;

// //         const unitPrice = item.variant.price + addonsTotal;
// //         const totalPrice = unitPrice * item.qty;

// //         return {
// //           itemId: item.itemId || item.id,
// //           name: item.name,
// //           imageUrl: item.imageUrl || "",
// //           variant: item.variant,
// //           addons: item.addons || [],
// //           qty: item.qty,
// //           unitPrice,
// //           totalPrice,
// //         };
// //       });

// //       const payload = {
// //         customerName: details.name.trim(),
// //         phoneNumber: details.phone || "",
// //         tableNumber: Number(details.tableNumber),
// //         description: details.description || "",
// //         items,
// //         grandTotal,
// //         paymentMode,
// //       };

// //       await api.post(`/api/checkout/${username}`, payload);

// //       const newOrder = {
// //         id: Date.now(),
// //         customerName: payload.customerName,
// //         phoneNumber: payload.phoneNumber,
// //         tableNumber: payload.tableNumber,
// //         description: payload.description,
// //         items,
// //         paymentMode,
// //         totalAmount: grandTotal,
// //         grandTotal,
// //         timestamp: Date.now(),
// //         expiresAt: Date.now() + 24 * 60 * 60 * 1000,
// //       };

// //       const existingOrders =
// //         JSON.parse(localStorage.getItem(ordersKey)) || [];

// //       localStorage.setItem(
// //         ordersKey,
// //         JSON.stringify([newOrder, ...existingOrders])
// //       );

// //       localStorage.removeItem(cartKey);
// //       navigate(`/greet/${username}`);
// //     } catch (err) {
// //       alert(err.message || "Checkout failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ---------------- UI ---------------- */
// //   return (
// //     <div className="min-h-screen bg-emerald-50 pb-24">
// //       <CheckoutHeader navigate={navigate} username={username} />

// //       <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* LEFT SECTION */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* CUSTOMER DETAILS */}
// //           <div className="bg-white rounded-2xl border border-emerald-200 p-5">
// //             <h2 className="text-base font-semibold text-emerald-800 mb-4">
// //               Customer & Table Details
// //             </h2>

// //             <CustomerDetails
// //               details={details}
// //               handleChange={handleChange}
// //             />
// //           </div>

// //           {/* PAYMENT MODE */}
// //           <div className="bg-white rounded-2xl border border-emerald-200 p-5">
// //             <h2 className="text-base font-semibold text-emerald-800 mb-4">
// //               Payment Method
// //             </h2>

// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => setPaymentMode("COUNTER")}
// //                 className={`flex-1 rounded-xl border px-4 py-4 text-sm font-semibold transition
// //                   ${
// //                     paymentMode === "COUNTER"
// //                       ? "border-emerald-600 bg-emerald-100 text-emerald-800"
// //                       : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
// //                   }`}
// //               >
// //                 Pay at Counter
// //                 <p className="text-xs font-normal mt-1">
// //                   Pay after dining
// //                 </p>
// //               </button>

// //               <button
// //                 onClick={() => setPaymentMode("ONLINE")}
// //                 className={`flex-1 rounded-xl border px-4 py-4 text-sm font-semibold transition
// //                   ${
// //                     paymentMode === "ONLINE"
// //                       ? "border-emerald-600 bg-emerald-100 text-emerald-800"
// //                       : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
// //                   }`}
// //               >
// //                 Pay Now
// //                 <p className="text-xs font-normal mt-1">
// //                   Online payment
// //                 </p>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT SECTION */}
// //         <div className="lg:sticky lg:top-24 h-fit">
// //           <div className="bg-white rounded-2xl border border-emerald-200 p-5">
// //             <OrderSummary
// //               cart={cart}
// //               totalAmount={grandTotal}
// //               loading={loading}
// //               handleCheckout={handleCheckout}
// //               paymentMode={paymentMode}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const ordersKey = `orders_${username}`;

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [details, setDetails] = useState({
//     name: "",
//     phone: "",
//     tableNumber: "",
//     description: "",
//   });

//   const [paymentMode, setPaymentMode] = useState("COUNTER");

//   /* ---------------- LOAD CART ---------------- */
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//     setCart(saved);
//   }, [cartKey]);

//   /* ---------------- TOTAL ---------------- */
//   const grandTotal = useMemo(() => {
//     return cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);
//   }, [cart]);

//   /* ---------------- FORM ---------------- */
//   const handleChange = (e) => {
//     setDetails((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   /* ---------------- CHECKOUT ---------------- */
//   const handleCheckout = async () => {
//     if (!details.name || !details.tableNumber)
//       return alert("Please fill required fields");
//     if (!cart.length) return alert("Your cart is empty");

//     setLoading(true);

//     try {
//       const items = cart.map((item) => ({
//         itemId: item.itemId || item.id,
//         name: item.name,
//         imageUrl: item.imageUrl || "",
//         variant: item.variant,
//         addons: item.addons || [],
//         qty: item.qty,
//         unitPrice: item.totalPrice / item.qty,
//         totalPrice: item.totalPrice,
//       }));

//       const payload = {
//         customerName: details.name,
//         phoneNumber: details.phone,
//         tableNumber: Number(details.tableNumber),
//         description: details.description,
//         items,
//         grandTotal,
//         paymentMode,
//       };

//       await api.post(`/api/checkout/${username}`, payload);

//       const newOrder = {
//         id: Date.now(),
//         ...payload,
//         timestamp: Date.now(),
//       };

//       const existing =
//         JSON.parse(localStorage.getItem(ordersKey)) || [];

//       localStorage.setItem(
//         ordersKey,
//         JSON.stringify([newOrder, ...existing])
//       );

//       localStorage.removeItem(cartKey);
//       navigate(`/greet/${username}`);
//     } catch (err) {
//       alert("Checkout failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen bg-emerald-50 pb-28">
//       {/* HEADER */}
//       <header className="sticky top-0 z-20 bg-white border-b border-emerald-200">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-emerald-700 text-xl"
//           >
//             ←
//           </button>
//           <div>
//             <h1 className="text-lg font-semibold text-emerald-800">
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
//         <div className="lg:col-span-2 space-y-6">
//           {/* CUSTOMER DETAILS */}
//           <div className="bg-white rounded-2xl border border-emerald-200 p-5">
//             <h2 className="text-emerald-800 font-semibold mb-4">
//               Customer & Table Details
//             </h2>

//             <div className="space-y-4">
//               {[
//                 { label: "Customer Name *", name: "name" },
//                 { label: "Phone Number", name: "phone" },
//                 { label: "Table Number *", name: "tableNumber" },
//               ].map((f) => (
//                 <div key={f.name}>
//                   <label className="block text-sm text-emerald-800 mb-1">
//                     {f.label}
//                   </label>
//                   <input
//                     name={f.name}
//                     value={details[f.name]}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-emerald-300 px-4 py-3
//                                focus:ring-2 focus:ring-emerald-500 outline-none"
//                   />
//                 </div>
//               ))}

//               <div>
//                 <label className="block text-sm text-emerald-800 mb-1">
//                   Special Instructions
//                 </label>
//                 <textarea
//                   name="description"
//                   value={details.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full rounded-xl border border-emerald-300 px-4 py-3
//                              focus:ring-2 focus:ring-emerald-500 outline-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* PAYMENT MODE */}
//           <div className="bg-white rounded-2xl border border-emerald-200 p-5">
//             <h2 className="text-emerald-800 font-semibold mb-4">
//               Payment Method
//             </h2>

//             <div className="flex gap-3">
//               {["COUNTER", "ONLINE"].map((mode) => (
//                 <button
//                   key={mode}
//                   onClick={() => setPaymentMode(mode)}
//                   className={`flex-1 rounded-xl px-4 py-4 border transition font-semibold
//                     ${
//                       paymentMode === mode
//                         ? "bg-emerald-100 border-emerald-600 text-emerald-800"
//                         : "border-emerald-300 text-emerald-700"
//                     }`}
//                 >
//                   {mode === "COUNTER" ? "Pay at Counter" : "Pay Now"}
//                   <p className="text-xs font-normal mt-1">
//                     {mode === "COUNTER"
//                       ? "Pay after dining"
//                       : "Online payment"}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="lg:sticky lg:top-24 h-fit">
//           <div className="bg-white rounded-2xl border border-emerald-200 p-5 space-y-4">
//             <h2 className="text-emerald-800 font-semibold">
//               Order Summary
//             </h2>

//             <div className="space-y-3 max-h-64 overflow-y-auto">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between text-sm"
//                 >
//                   <span className="text-emerald-700">
//                     {item.name} × {item.qty}
//                   </span>
//                   <span className="font-semibold text-emerald-800">
//                     ₹{item.totalPrice}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-emerald-200 pt-3 space-y-2">
//               <div className="flex justify-between text-sm text-emerald-700">
//                 <span>Total</span>
//                 <span>₹{grandTotal}</span>
//               </div>
//               <div className="flex justify-between font-semibold text-emerald-900">
//                 <span>Grand Total</span>
//                 <span>₹{grandTotal}</span>
//               </div>
//             </div>

//             <div className="text-xs bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-emerald-700">
//               Payment:{" "}
//               <b>
//                 {paymentMode === "COUNTER"
//                   ? "Pay at Counter"
//                   : "Pay Now"}
//               </b>
//             </div>

//             <button
//               disabled={loading}
//               onClick={handleCheckout}
//               className="w-full bg-emerald-600 hover:bg-emerald-700
//                          text-white py-4 rounded-xl font-semibold
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










// import { useEffect, useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const ordersKey = `orders_${username}`;

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [details, setDetails] = useState({
//     name: "",
//     phone: "",
//     tableNumber: "",
//     description: "",
//   });

//   const [paymentMode, setPaymentMode] = useState("COUNTER");

//   /* ---------------- LOAD CART ---------------- */
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//     setCart(saved);
//   }, [cartKey]);

//   /* ---------------- TOTAL ---------------- */
//   const grandTotal = useMemo(
//     () => cart.reduce((sum, item) => sum + Number(item.totalPrice), 0),
//     [cart]
//   );

//   /* ---------------- FORM ---------------- */
//   const handleChange = (e) => {
//     setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   /* ---------------- CHECKOUT ---------------- */
//   const handleCheckout = async () => {
//     if (!details.name || !details.tableNumber)
//       return alert("Please fill required fields");
//     if (!cart.length) return alert("Your cart is empty");

//     setLoading(true);

//     try {
//       const items = cart.map((item) => ({
//         itemId: item.itemId || item.id,
//         name: item.name,
//         imageUrl: item.imageUrl || "",
//         variant: item.variant,
//         addons: item.addons || [],
//         qty: item.qty,
//         unitPrice: item.totalPrice / item.qty,
//         totalPrice: item.totalPrice,
//       }));

//       /* -------- PAYLOAD -------- */
//       const payload = {
//         customerName: details.name,
//         phoneNumber: details.phone,
//         tableNumber: Number(details.tableNumber),
//         description: details.description,
//         items,
//         grandTotal,
//         paymentMode,
//       };

//       await api.post(`/api/checkout/${username}`, payload);

//       const newOrder = {
//         id: Date.now(),
//         ...payload,
//         timestamp: Date.now(),
//       };

//       const existing =
//         JSON.parse(localStorage.getItem(ordersKey)) || [];

//       localStorage.setItem(
//         ordersKey,
//         JSON.stringify([newOrder, ...existing])
//       );

//       localStorage.removeItem(cartKey);
//       navigate(`/greet/${username}`);
//     } catch {
//       alert("Checkout failed");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* CUSTOMER DETAILS */}
//           <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6">
//             <h2 className="text-sm font-semibold text-emerald-900 mb-4">
//               Customer & Table Details
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { label: "Customer Name *", name: "name" },
//                 { label: "Phone Number", name: "phone" },
//                 { label: "Table Number *", name: "tableNumber" },
//               ].map((f) => (
//                 <div key={f.name} className="sm:col-span-1">
//                   <label className="block text-xs font-medium text-emerald-700 mb-1">
//                     {f.label}
//                   </label>
//                   <input
//                     name={f.name}
//                     value={details[f.name]}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-emerald-300 
//                                px-4 py-3 text-sm
//                                focus:ring-2 focus:ring-emerald-500 
//                                focus:border-emerald-500 outline-none"
//                   />
//                 </div>
//               ))}

//               <div className="sm:col-span-2">
//                 <label className="block text-xs font-medium text-emerald-700 mb-1">
//                   Special Instructions
//                 </label>
//                 <textarea
//                   name="description"
//                   value={details.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full rounded-xl border border-emerald-300 
//                              px-4 py-3 text-sm resize-none
//                              focus:ring-2 focus:ring-emerald-500 
//                              focus:border-emerald-500 outline-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* PAYMENT MODE */}
//           <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6">
//             <h2 className="text-sm font-semibold text-emerald-900 mb-4">
//               Payment Method
//             </h2>

//             <div className="flex bg-emerald-100 rounded-2xl p-1">
//               {["COUNTER", "ONLINE"].map((mode) => (
//                 <button
//                   key={mode}
//                   onClick={() => setPaymentMode(mode)}
//                   className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition
//                     ${
//                       paymentMode === mode
//                         ? "bg-white text-emerald-700 shadow"
//                         : "text-emerald-600"
//                     }`}
//                 >
//                   {mode === "COUNTER" ? "Pay at Counter" : "Pay Now"}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
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

//             <div className="border-t border-emerald-200 pt-3 space-y-2">
//               <div className="flex justify-between text-sm text-emerald-700">
//                 <span>Total</span>
//                 <span>₹{grandTotal}</span>
//               </div>

//               <div className="flex justify-between text-base font-semibold text-emerald-900">
//                 <span>Grand Total</span>
//                 <span>₹{grandTotal}</span>
//               </div>
//             </div>

//             <div className="text-xs bg-emerald-50 border border-emerald-200 
//                             rounded-xl px-3 py-2 text-emerald-700">
//               Payment:{" "}
//               <b>
//                 {paymentMode === "COUNTER"
//                   ? "Pay at Counter"
//                   : "Pay Now"}
//               </b>
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

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }
  }, [cartKey]);

  /* ---------------- TOTAL ---------------- */
  const grandTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.totalPrice || 0),
        0
      ),
    [cart]
  );

  /* ---------------- FORM ---------------- */
  const handleChange = (e) => {
    setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* ---------------- CHECKOUT ---------------- */
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
      const items = cart.map((item) => ({
        itemId: item.itemId || item.id,
        name: item.name,
        imageUrl: item.imageUrl || "",
        variant: item.variant,
        addons: item.addons || [],
        qty: Number(item.qty),
        unitPrice: Number(item.totalPrice) / Number(item.qty),
        totalPrice: Number(item.totalPrice),
      }));

      const payload = {
        customerName: details.name,
        phoneNumber: details.phone,
        tableNumber: Number(details.tableNumber),
        description: details.description,
        items,
        grandTotal,
      };

      const res = await api.post(`/api/checkout/${username}`, payload);

      const { sessionId, sessionStatus } = res.data;

      /* ---------------- STORE SESSION ---------------- */
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

      /* ---------------- CLEAR CART ---------------- */
      localStorage.removeItem(cartKey);
      setCart([]);

      navigate(`/greet/${username}`, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message || "Checkout failed";

      /* 🔥 SESSION CLOSED / EXPIRED */
      if (message.toLowerCase().includes("session")) {
        localStorage.removeItem(sessionKey);
        localStorage.removeItem(sessionMetaKey);

        alert("Session expired. Please place order again.");
        return;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMPTY CART ---------------- */
  if (!cart.length) {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center px-4">
        <h2 className="text-lg font-semibold text-emerald-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm text-emerald-600 mb-6 text-center">
          Add items from the menu to place an order
        </p>

        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="bg-emerald-600 hover:bg-emerald-700 
                     text-white px-6 py-3 rounded-xl 
                     font-semibold shadow transition"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-emerald-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full 
                       bg-emerald-100 text-emerald-700 
                       hover:bg-emerald-200 transition"
          >
            ←
          </button>

          <div>
            <h1 className="text-lg font-semibold text-emerald-900">
              Checkout
            </h1>
            <p className="text-xs text-emerald-600">
              Ordering from {username}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
<div className="lg:col-span-2">
  <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6">
    <h2 className="text-sm font-semibold text-emerald-900 mb-4">
      Customer & Table Details
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { label: "Customer Name *", name: "name" },
        { label: "Phone Number", name: "phone" },
        { label: "Table Number *", name: "tableNumber" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-xs font-medium text-emerald-700 mb-1">
            {f.label}
          </label>
          <input
            name={f.name}
            value={details[f.name]}
            onChange={handleChange}
            className="w-full rounded-xl border border-emerald-300 
                       px-4 py-3 text-sm
                       focus:ring-2 focus:ring-emerald-500 
                       focus:border-emerald-500 outline-none"
          />
        </div>
      ))}
    </div>

    {/* ✅ DESCRIPTION FIELD — ADD HERE */}
    <div className="mt-4">
      <label className="block text-xs font-medium text-emerald-700 mb-1">
        Order Notes (optional)
      </label>
      <textarea
        name="description"
        value={details.description}
        onChange={handleChange}
        placeholder="Any special instructions? (less spicy, no onions, etc.)"
        rows={3}
        className="w-full rounded-xl border border-emerald-300
                   px-4 py-3 text-sm resize-none
                   focus:ring-2 focus:ring-emerald-500
                   focus:border-emerald-500 outline-none"
      />
    </div>
  </div>
</div>


        {/* RIGHT */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-3xl border border-emerald-200 shadow-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold text-emerald-900">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-emerald-700 truncate">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-semibold text-emerald-900">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            <button
              disabled={loading}
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700
                         text-white py-4 rounded-2xl font-semibold
                         shadow-xl active:scale-[0.98]
                         disabled:opacity-60 transition"
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
