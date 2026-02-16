// // import { useEffect, useState, useMemo } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import api from "../lib/api";

// // import CheckoutHeader from "../components/checkout/CheckoutHeader";
// // import CustomerDetails from "../components/checkout/CustomerDetails";
// // import OrderSummary from "../components/checkout/OrderSummary";

// // export default function CheckoutPage() {
// //   const navigate = useNavigate();
// //   const { id: username } = useParams();

// //   const cartKey = `cart_${username}`;
// //   const sessionKey = `session_${username}`;
// //   const sessionMetaKey = `session_meta_${username}`;
// //   const tableKey = `table_${username}`;

// //   const [cart, setCart] = useState([]);
// //   const [loading, setLoading] = useState(false);
  
// //   const [details, setDetails] = useState({
// //     name: "",
// //     phone: "",
// //     tableNumber: "",
// //     description: "",
// //   });

// //   /* LOAD CART */
// //   useEffect(() => {
// //     try {
// //       const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// //       setCart(Array.isArray(saved) ? saved : []);
// //     } catch {
// //       setCart([]);
// //     }
// //   }, [cartKey]);

// //   /* TOTAL */
// //   const grandTotal = useMemo(
// //     () =>
// //       cart.reduce(
// //         (sum, item) => sum + Number(item.totalPrice || 0),
// //         0
// //       ),
// //     [cart]
// //   );

// //   /* FORM */
// //   const handleChange = (e) => {
// //     setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
// //   };

// //   /* CHECKOUT */
// //   const handleCheckout = async () => {
// //     if (!details.name || !details.tableNumber) {
// //       alert("Please fill required fields");
// //       return;
// //     }

// //     if (!cart.length) {
// //       alert("Your cart is empty");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// // const items = cart.map((item) => {
// //   const addons =
// //     Array.isArray(item.addons)
// //       ? item.addons
// //       : Array.isArray(item.addOns)
// //       ? item.addOns
// //       : [];

// //   return {
// //     itemId: item.itemId || item.id,
// //     name: item.name,
// //     imageUrl: item.imageUrl || "",
// //     variant: item.variant,
// //     addons, // ✅ correct
// //     qty: Number(item.qty),
// //     unitPrice: Number(item.unitPrice),
// //     totalPrice: Number(item.totalPrice),
// //   };
// // });


// //       const res = await api.post(`/api/checkout/${username}`, {
// //         customerName: details.name,
// //         phoneNumber: details.phone,
// //         tableNumber: Number(details.tableNumber),
// //         description: details.description,
// //         items,
// //         grandTotal,
// //       });

// //       const { sessionId, sessionStatus } = res.data;

// //       // if (sessionId && sessionStatus === "ACTIVE") {
// //       //   localStorage.setItem(sessionKey, sessionId);
// //       //   localStorage.setItem(
// //       //     sessionMetaKey,
// //       //     JSON.stringify({
// //       //       customerName: details.name,
// //       //       tableNumber: Number(details.tableNumber),
// //       //       phoneNumber: details.phone,
// //       //     })
// //       //   );
// //       // }
      
// //       if (sessionId && sessionStatus === "ACTIVE") {
// //         localStorage.setItem(sessionKey, sessionId);

// //         localStorage.setItem(
// //           sessionMetaKey,
// //           JSON.stringify({
// //             customerName: details.name,
// //             tableNumber: Number(details.tableNumber),
// //             phoneNumber: details.phone,
// //           })
// //         );

// //         // ✅ SAVE TABLE NUMBER ONLY AFTER SUCCESS
// //         localStorage.setItem(tableKey, String(details.tableNumber));
// //       }

// //       localStorage.removeItem(cartKey);
// //       setCart([]);

// //       navigate(`/greet/${username}`, { replace: true });
// //     } catch (err) {
// //       alert(
// //         err?.response?.data?.message || "Checkout failed"
// //       );
// //       localStorage.removeItem(sessionKey);
// //       localStorage.removeItem(sessionMetaKey);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* EMPTY CART */
// //   if (!cart.length) {
// //     return (
// //       <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center">
// //         <h2 className="text-lg font-semibold text-emerald-900">
// //           Your cart is empty
// //         </h2>
// //         <button
// //           onClick={() => navigate(`/menu/${username}`)}
// //           className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl"
// //         >
// //           Go to Menu
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
// //       <CheckoutHeader
// //         username={username}
// //         onBack={() => navigate(-1)}
// //       />

// //       <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         <div className="lg:col-span-2">
// //           <CustomerDetails
// //             details={details}
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <div className="lg:sticky lg:top-24 h-fit">
// //          <OrderSummary
// //   cart={cart}
// //   loading={loading}
// //   grandTotal={grandTotal}
// //   onCheckout={handleCheckout}
// // />

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import { useEffect, useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// import CheckoutHeader from "../components/checkout/CheckoutHeader";
// import CustomerDetails from "../components/checkout/CustomerDetails";
// import OrderSummary from "../components/checkout/OrderSummary";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const sessionKey = `session_${username}`;
//   const sessionMetaKey = `session_meta_${username}`;
//   const tableKey = `table_${username}`;

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [orderType, setOrderType] = useState("DINE_IN");
  
//   const [details, setDetails] = useState({
//     name: "",
//     phone: "",
//     tableNumber: "",
//     description: "",
//     address: "",
//     city: "",
//     pincode: "",
//   });

//   useEffect(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//       setCart(Array.isArray(saved) ? saved : []);
//     } catch {
//       setCart([]);
//     }
//   }, [cartKey]);

//   const grandTotal = useMemo(
//     () =>
//       cart.reduce(
//         (sum, item) => sum + Number(item.totalPrice || 0),
//         0
//       ),
//     [cart]
//   );

//   const handleChange = (e) => {
//     setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handleCheckout = async () => {
//     if (!details.name) {
//       alert("Please enter customer name");
//       return;
//     }

//     if (orderType === "DINE_IN" && !details.tableNumber) {
//       alert("Please enter table number");
//       return;
//     }

//     if (orderType === "ONLINE") {
//       if (!details.address || !details.city || !details.pincode) {
//         alert("Please fill complete delivery address");
//         return;
//       }
//     }

//     if (!cart.length) {
//       alert("Your cart is empty");
//       return;
//     }

//     setLoading(true);

//     try {
//       const items = cart.map((item) => {
//         const addons =
//           Array.isArray(item.addons)
//             ? item.addons
//             : Array.isArray(item.addOns)
//             ? item.addOns
//             : [];

//         return {
//           itemId: item.itemId || item.id,
//           name: item.name,
//           imageUrl: item.imageUrl || "",
//           variant: item.variant,
//           addons,
//           qty: Number(item.qty),
//           unitPrice: Number(item.unitPrice),
//           totalPrice: Number(item.totalPrice),
//         };
//       });

//       const payload = {
//         customerName: details.name,
//         phoneNumber: details.phone,
//         description: details.description,
//         items,
//         grandTotal,
//         orderType,
//       };

//       if (orderType === "DINE_IN") {
//         payload.tableNumber = Number(details.tableNumber);
//       }

//       if (orderType === "ONLINE") {
//         payload.deliveryAddress = {
//           address: details.address,
//           city: details.city,
//           pincode: details.pincode,
//         };
//       }

//       const res = await api.post(`/api/checkout/${username}`, payload);

//       const { sessionId, sessionStatus } = res.data;

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

//         localStorage.setItem(tableKey, String(details.tableNumber));
//       }

//       localStorage.removeItem(cartKey);
//       setCart([]);

//       navigate(`/greet/${username}`, { replace: true });
//     } catch (err) {
//       alert(
//         err?.response?.data?.message || "Checkout failed"
//       );
//       localStorage.removeItem(sessionKey);
//       localStorage.removeItem(sessionMetaKey);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cart.length) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center justify-center px-4">
//         <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
//           <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
//             <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-3">
//             Your cart is empty
//           </h2>
//           <p className="text-gray-600 mb-8">
//             Add some delicious items to get started
//           </p>
//           <button
//             onClick={() => navigate(`/menu/${username}`)}
//             className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
//           >
//             Browse Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
//       <CheckoutHeader
//         username={username}
//         onBack={() => navigate(-1)}
//       />

//       <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//               <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold">1</span>
//               Select Order Type
//             </h2>
//             <div className="grid grid-cols-3 gap-4">
//               {[
//                 { value: "DINE_IN", label: "Dine In", icon: "🍽️" },
//                 { value: "TAKEAWAY", label: "Takeaway", icon: "🥡" },
//                 { value: "ONLINE", label: "Delivery", icon: "🚚" },
//               ].map((type) => (
//                 <button
//                   key={type.value}
//                   onClick={() => setOrderType(type.value)}
//                   className={`
//                     relative overflow-hidden rounded-2xl border-2 p-6 
//                     transition-all duration-300 transform hover:scale-105
//                     ${
//                       orderType === type.value
//                         ? "border-emerald-600 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg"
//                         : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
//                     }
//                   `}
//                 >
//                   {orderType === type.value && (
//                     <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                   <div className="text-4xl mb-3">{type.icon}</div>
//                   <div className={`font-bold text-sm ${
//                     orderType === type.value ? "text-emerald-700" : "text-gray-700"
//                   }`}>
//                     {type.label}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <CustomerDetails
//             details={details}
//             onChange={handleChange}
//             orderType={orderType}
//           />
//         </div>

//         <div className="lg:sticky lg:top-24 h-fit">
//           <OrderSummary
//             cart={cart}
//             loading={loading}
//             grandTotal={grandTotal}
//             onCheckout={handleCheckout}
//             orderType={orderType}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




// // pages/CheckoutPage.jsx
// import { useEffect, useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// import CheckoutHeader from "../components/checkout/CheckoutHeader";
// import CustomerDetails from "../components/checkout/CustomerDetails";
// import OrderSummary from "../components/checkout/OrderSummary";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const sessionKey = `session_${username}`;
//   const sessionMetaKey = `session_meta_${username}`;
//   const tableKey = `table_${username}`;

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [orderType, setOrderType] = useState("DINE_IN");
  
//   const [details, setDetails] = useState({
//     name: "",
//     phone: "",
//     tableNumber: "",
//     description: "",
//     address: "",
//     city: "",
//     pincode: "",
//   });

//   useEffect(() => {
//     if (orderType === "DINE_IN") {
//       const storedSessionId = localStorage.getItem(sessionKey);
      
//       if (storedSessionId) {
//         navigate(`/cart/${username}`, { replace: true });
//         return;
//       }
//     }
//   }, [orderType, sessionKey, username, navigate]);

//   useEffect(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//       setCart(Array.isArray(saved) ? saved : []);
//     } catch {
//       setCart([]);
//     }
//   }, [cartKey]);

//   const grandTotal = useMemo(
//     () =>
//       cart.reduce(
//         (sum, item) => sum + Number(item.totalPrice || 0),
//         0
//       ),
//     [cart]
//   );

//   const handleChange = (e) => {
//     setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handleCheckout = async () => {
//     if (!details.name) {
//       alert("Please enter customer name");
//       return;
//     }

//     if (orderType === "DINE_IN" && !details.tableNumber) {
//       alert("Please enter table number");
//       return;
//     }

//     if (orderType === "ONLINE") {
//       if (!details.address || !details.city || !details.pincode) {
//         alert("Please fill complete delivery address");
//         return;
//       }
//     }

//     if (!cart.length) {
//       alert("Your cart is empty");
//       return;
//     }

//     setLoading(true);

//     try {
//       const items = cart.map((item) => {
//         const addons =
//           Array.isArray(item.addons)
//             ? item.addons
//             : Array.isArray(item.addOns)
//             ? item.addOns
//             : [];

//         return {
//           itemId: item.itemId || item.id,
//           name: item.name,
//           imageUrl: item.imageUrl || "",
//           variant: item.variant,
//           addons,
//           qty: Number(item.qty),
//           unitPrice: Number(item.unitPrice),
//           totalPrice: Number(item.totalPrice),
//         };
//       });

//       const payload = {
//         customerName: details.name,
//         phoneNumber: details.phone,
//         description: details.description,
//         items,
//         grandTotal,
//         orderType,
//       };

//       if (orderType === "DINE_IN") {
//         payload.tableNumber = Number(details.tableNumber);
//       }

//       if (orderType === "ONLINE") {
//         payload.deliveryAddress = {
//           address: details.address,
//           city: details.city,
//           pincode: details.pincode,
//         };
//       }

//       const res = await api.post(`/api/checkout/${username}`, payload);

//       const { sessionId, sessionStatus } = res.data;

//       if (orderType === "DINE_IN" && sessionId && sessionStatus === "ACTIVE") {
//         localStorage.setItem(sessionKey, sessionId);

//         localStorage.setItem(
//           sessionMetaKey,
//           JSON.stringify({
//             customerName: details.name,
//             tableNumber: Number(details.tableNumber),
//             phoneNumber: details.phone,
//           })
//         );

//         localStorage.setItem(tableKey, String(details.tableNumber));
//       }

//       localStorage.removeItem(cartKey);
//       setCart([]);

//       navigate(`/greet/${username}`, { replace: true });
//     } catch (err) {
//       alert(
//         err?.response?.data?.message || "Checkout failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cart.length) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center justify-center px-4">
//         <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
//           <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
//             <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-3">
//             Your cart is empty
//           </h2>
//           <p className="text-gray-600 mb-8">
//             Add some delicious items to get started
//           </p>
//           <button
//             onClick={() => navigate(`/menu/${username}`)}
//             className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
//           >
//             Browse Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
//       <CheckoutHeader
//         username={username}
//         onBack={() => navigate(-1)}
//       />

//       <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//               <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold">1</span>
//               Select Order Type
//             </h2>
//             <div className="grid grid-cols-3 gap-4">
//               {[
//                 { value: "DINE_IN", label: "Dine In", icon: "🍽️" },
//                 { value: "TAKEAWAY", label: "Takeaway", icon: "🥡" },
//                 { value: "ONLINE", label: "Delivery", icon: "🚚" },
//               ].map((type) => (
//                 <button
//                   key={type.value}
//                   onClick={() => setOrderType(type.value)}
//                   className={`
//                     relative overflow-hidden rounded-2xl border-2 p-6 
//                     transition-all duration-300 transform hover:scale-105
//                     ${
//                       orderType === type.value
//                         ? "border-emerald-600 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg"
//                         : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
//                     }
//                   `}
//                 >
//                   {orderType === type.value && (
//                     <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                   <div className="text-4xl mb-3">{type.icon}</div>
//                   <div className={`font-bold text-sm ${
//                     orderType === type.value ? "text-emerald-700" : "text-gray-700"
//                   }`}>
//                     {type.label}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <CustomerDetails
//             details={details}
//             onChange={handleChange}
//             orderType={orderType}
//           />
//         </div>

//         <div className="lg:sticky lg:top-24 h-fit">
//           <OrderSummary
//             cart={cart}
//             loading={loading}
//             grandTotal={grandTotal}
//             onCheckout={handleCheckout}
//             orderType={orderType}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }





// pages/CheckoutPage.jsx
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
  const [orderType, setOrderType] = useState("DINE_IN");
  
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
    description: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (orderType === "DINE_IN") {
      const storedSessionId = localStorage.getItem(sessionKey);
      
      if (storedSessionId) {
        navigate(`/cart/${username}`, { replace: true });
        return;
      }
    }
  }, [orderType, sessionKey, username, navigate]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }
  }, [cartKey]);

  const grandTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.totalPrice || 0),
        0
      ),
    [cart]
  );

  const handleChange = (e) => {
    setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (!details.name) {
      alert("Please enter customer name");
      return;
    }

    if (orderType === "DINE_IN" && !details.tableNumber) {
      alert("Please enter table number");
      return;
    }

    if (orderType === "ONLINE") {
      if (!details.line1 || !details.city || !details.state || !details.pincode) {
        alert("Please fill complete delivery address");
        return;
      }
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
          addons,
          qty: Number(item.qty),
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.totalPrice),
        };
      });

      const payload = {
        customerName: details.name,
        phoneNumber: details.phone,
        description: details.description,
        items,
        grandTotal,
        orderType,
      };

      if (orderType === "DINE_IN") {
        payload.tableNumber = Number(details.tableNumber);
      }

      if (orderType === "ONLINE") {
        payload.deliveryAddress = {
          line1: details.line1,
          city: details.city,
          state: details.state,
          pincode: details.pincode,
        };
      }

      const res = await api.post(`/api/checkout/${username}`, payload);

      const { sessionId, sessionStatus } = res.data;
      
            // 🔥 SAVE PHONE FOR ONLINE TRACKING
      if (orderType === "ONLINE" && details.phone) {
        localStorage.setItem(`phone_${username}`, details.phone);
      }

      if (orderType === "DINE_IN" && sessionId && sessionStatus === "ACTIVE") {
        localStorage.setItem(sessionKey, sessionId);

        localStorage.setItem(
          sessionMetaKey,
          JSON.stringify({
            customerName: details.name,
            tableNumber: Number(details.tableNumber),
            phoneNumber: details.phone,
          })
        );

        localStorage.setItem(tableKey, String(details.tableNumber));
      }

      localStorage.removeItem(cartKey);
      setCart([]);

      navigate(`/greet/${username}`, { replace: true });
    } catch (err) {
      alert(
        err?.response?.data?.message || "Checkout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some delicious items to get started
          </p>
          <button
            onClick={() => navigate(`/menu/${username}`)}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-28">
      <CheckoutHeader
        username={username}
        onBack={() => navigate(-1)}
      />

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold">1</span>
              Select Order Type
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "DINE_IN", label: "Dine In", icon: "🍽️" },
                { value: "TAKEAWAY", label: "Takeaway", icon: "🥡" },
                { value: "ONLINE", label: "Delivery", icon: "🚚" },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setOrderType(type.value)}
                  className={`
                    relative overflow-hidden rounded-2xl border-2 p-6 
                    transition-all duration-300 transform hover:scale-105
                    ${
                      orderType === type.value
                        ? "border-emerald-600 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
                    }
                  `}
                >
                  {orderType === type.value && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <div className={`font-bold text-sm ${
                    orderType === type.value ? "text-emerald-700" : "text-gray-700"
                  }`}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <CustomerDetails
            details={details}
            onChange={handleChange}
            orderType={orderType}
          />
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <OrderSummary
            cart={cart}
            loading={loading}
            grandTotal={grandTotal}
            onCheckout={handleCheckout}
            orderType={orderType}
          />
        </div>
      </div>
    </div>
  );
}