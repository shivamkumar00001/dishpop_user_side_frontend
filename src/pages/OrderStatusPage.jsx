// import { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchOrders } from "../services/orderApi";
// import useLiveOrders from "../hooks/useLiveOrders";
// import OrderStatusCard from "../components/orders/OrderStatusCard";
// import { ArrowLeft } from "lucide-react";

// export default function OrderStatusPage() {
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ===============================
//   // SORT ORDERS BY PRIORITY
//   // ===============================
//   const sortOrdersByPriority = (orders) => {
//     const statusPriority = {
//       confirmed: 1,  // Preparing (highest priority)
//       pending: 2,    // Order Received
//       completed: 3,  // Prepared
//       cancelled: 4   // Cancelled (lowest priority)
//     };

//     return orders.sort((a, b) => {
//       const priorityDiff = statusPriority[a.status] - statusPriority[b.status];
      
//       // If same status, sort by creation time (oldest first)
//       if (priorityDiff === 0) {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }
      
//       return priorityDiff;
//     });
//   };

//   // ===============================
//   // INITIAL LOAD
//   // ===============================
//   const loadOrders = useCallback(async () => {
//     if (!username) return;

//     try {
//       const res = await fetchOrders(username);
//       const data = Array.isArray(res.data?.data) ? res.data.data : [];
//       const sortedData = sortOrdersByPriority(data);
//       setOrders(sortedData);
//     } catch (err) {
//       console.error("❌ Failed to load orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [username]);

//   useEffect(() => {
//     loadOrders();
//   }, [loadOrders]);

//   // ===============================
//   // LIVE SOCKET EVENTS
//   // ===============================
//   const handleOrderEvent = useCallback((type, order) => {
//     setOrders((prev) => {
//       let updated = [...prev];

//       if (type === "created") {
//         updated.push(order);
//       } else if (type === "updated" || type === "replaced") {
//         updated = updated.map((o) =>
//           o._id === order._id ? { ...o, ...order } : o
//         );
//       } else if (type === "deleted") {
//         const orderId = typeof order === "string" ? order : order._id;
//         updated = updated.filter((o) => o._id !== orderId);
//       }

//       // Sort by priority after any change
//       return sortOrdersByPriority(updated);
//     });
//   }, []);

//   useLiveOrders(username, handleOrderEvent);

//   // ===============================
//   // LOADING STATE
//   // ===============================
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order status...</p>
//         </div>
//       </div>
//     );
//   }

//   // ===============================
//   // MAIN RENDER
//   // ===============================
//   return (
//     <div className="min-h-screen bg-white">
//       {/* HEADER */}
//       <section className="relative pt-20 pb-32 bg-gradient-to-br from-green-600 to-green-700">
//         <div className="max-w-7xl mx-auto px-4 md:px-16">
//           <button
//             onClick={() => navigate(`/${username}`)}
//             className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-semibold">Back to Menu</span>
//           </button>

//           <div className="flex items-center gap-3 mb-3">
//             <h1 className="text-white text-3xl md:text-5xl font-extrabold">
//               Live Order Status
//             </h1>
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
//             </span>
//           </div>

//           <p className="text-white/90 text-base md:text-lg">
//             Track your orders in real-time • {orders.length} active{" "}
//             {orders.length === 1 ? "order" : "orders"}
//           </p>
//         </div>
//       </section>

//       {/* CURVED WHITE SECTION */}
//       <section className="relative bg-white">
//         <svg
//           viewBox="0 0 1440 120"
//           className="absolute -top-[119px] left-0 w-full h-[120px]"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,80 C240,120 480,120 720,100 960,80 1200,40 1440,0 L1440,120 L0,120 Z"
//             fill="white"
//           />
//         </svg>

//         {/* CONTENT */}
//         <div className="pt-16 md:pt-20 pb-16 md:pb-24">
//           <div className="max-w-7xl mx-auto px-4 md:px-16">
//             {orders.length === 0 ? (
//               // EMPTY STATE
//               <div className="text-center py-20">
//                 <div className="mx-auto h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-200">
//                   <span className="text-5xl">📦</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   No Active Orders
//                 </h3>
//                 <p className="text-gray-600 mb-8">
//                   Your orders will appear here in real-time once placed
//                 </p>
//                 <button
//                   onClick={() => navigate(`/${username}`)}
//                   className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
//                 >
//                   Explore Menu
//                 </button>
//               </div>
//             ) : (
//               // ORDER CARDS
//               <div className="space-y-6">
//                 {orders.map((order, index) => {
//                   // Calculate sequential order number based on creation time
//                   const allOrdersSorted = [...orders].sort(
//                     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//                   );
//                   const sequentialNumber = allOrdersSorted.findIndex(o => o._id === order._id) + 1;

//                   return (
//                     <div
//                       key={order._id}
//                       className="rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
//                     >
//                       {/* ORDER NUMBER BADGE */}
//                       <div className="absolute -top-3 -left-3 bg-green-600 text-white font-bold text-base w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
//                         #{sequentialNumber}
//                       </div>

//                       {/* ORDER HEADER */}
//                       <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="text-2xl">🍽️</span>
//                               <h2 className="text-xl font-bold text-gray-900">
//                                 Order #{order._id.slice(-6)}
//                               </h2>
//                             </div>
//                             <p className="text-sm text-gray-600">
//                               Table {order.tableNumber} • {order.items.length}{" "}
//                               {order.items.length === 1 ? "item" : "items"}
//                             </p>
//                           </div>

//                           {/* STATUS BADGE */}
//                           <span
//                             className={`rounded-full px-4 py-1.5 text-xs font-bold ${
//                               order.status === "pending"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : order.status === "confirmed"
//                                 ? "bg-cyan-100 text-cyan-700"
//                                 : order.status === "completed"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {order.status.toUpperCase()}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="p-6">
//                         {/* STATUS DISPLAY */}
//                         <OrderStatusCard order={order} orderNumber={sequentialNumber} />

//                         {/* ORDER TIME */}
//                         <div className="mt-4 pt-4 border-t border-gray-200">
//                           <p className="text-sm text-gray-600">
//                             <span className="font-semibold">Placed at:</span>{" "}
//                             {new Date(order.createdAt).toLocaleString("en-US", {
//                               dateStyle: "medium",
//                               timeStyle: "short",
//                             })}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* LIVE INDICATOR */}
//             {orders.length > 0 && (
//               <div className="mt-8 text-center">
//                 <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
//                   <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                   </span>
//                   <span>Live Updates Active</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} Powered by DishPop
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchOrders } from "../services/orderApi";
// import useLiveOrders from "../hooks/useLiveOrders";
// import OrderStatusCard from "../components/orders/OrderStatusCard";
// import { ArrowLeft, User } from "lucide-react";

// export default function OrderStatusPage() {
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentTableNumber, setCurrentTableNumber] = useState(null);

//   // ===============================
//   // GET CURRENT USER'S TABLE NUMBER
//   // ===============================
//   useEffect(() => {
//     const tableKey = `table_${username}`;
//     const storedTableNumber = localStorage.getItem(tableKey);
    
//     if (storedTableNumber) {
//       const tableNum = Number(storedTableNumber);
//       console.log(`✅ Retrieved table number: ${tableNum} from key: ${tableKey}`);
//       setCurrentTableNumber(tableNum);
//     } else {
//       console.log(`⚠️ No table number found for key: ${tableKey}`);
//     }
//   }, [username]);

//   // ===============================
//   // SORT ORDERS BY PRIORITY
//   // ===============================
//   const sortOrdersByPriority = useCallback((orders) => {
//     const statusPriority = {
//       confirmed: 1,  // Preparing (highest priority)
//       pending: 2,    // Order Received
//       completed: 3,  // Prepared
//       cancelled: 4   // Cancelled (lowest priority)
//     };

//     return orders.sort((a, b) => {
//       const priorityDiff = statusPriority[a.status] - statusPriority[b.status];
      
//       // If same status, sort by creation time (oldest first)
//       if (priorityDiff === 0) {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }
      
//       return priorityDiff;
//     });
//   }, []);

//   // ===============================
//   // SEPARATE ORDERS BY TABLE
//   // ===============================
//   const { myOrders, otherOrders } = useMemo(() => {
//     if (currentTableNumber === null) {
//       return { myOrders: [], otherOrders: sortOrdersByPriority([...orders]) };
//     }

//     const my = [];
//     const others = [];

//     orders.forEach(order => {
//       if (Number(order.tableNumber) === currentTableNumber) {
//         my.push(order);
//       } else {
//         others.push(order);
//       }
//     });

//     return {
//       myOrders: sortOrdersByPriority(my),
//       otherOrders: sortOrdersByPriority(others)
//     };
//   }, [orders, currentTableNumber, sortOrdersByPriority]);

//   // ===============================
//   // INITIAL LOAD
//   // ===============================
//   const loadOrders = useCallback(async () => {
//     if (!username) return;

//     try {
//       const res = await fetchOrders(username);
//       const data = Array.isArray(res.data?.data) ? res.data.data : [];
//       setOrders(data);
//     } catch (err) {
//       console.error("❌ Failed to load orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [username]);

//   useEffect(() => {
//     loadOrders();
//   }, [loadOrders]);

//   // ===============================
//   // LIVE SOCKET EVENTS
//   // ===============================
//   const handleOrderEvent = useCallback((type, order) => {
//     setOrders((prev) => {
//       let updated = [...prev];

//       if (type === "created") {
//         updated.push(order);
//       } else if (type === "updated" || type === "replaced") {
//         updated = updated.map((o) =>
//           o._id === order._id ? { ...o, ...order } : o
//         );
//       } else if (type === "deleted") {
//         const orderId = typeof order === "string" ? order : order._id;
//         updated = updated.filter((o) => o._id !== orderId);
//       }

//       return updated;
//     });
//   }, []);

//   useLiveOrders(username, handleOrderEvent);

//   // ===============================
//   // RENDER ORDER CARD
//   // ===============================
//   const renderOrderCard = (order, sequentialNumber, isMyOrder = false) => (
//     <div
//       key={order._id}
//       className={`rounded-3xl bg-white border-2 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative ${
//         isMyOrder ? 'border-green-500' : 'border-gray-200'
//       }`}
//     >
//       {/* ORDER NUMBER BADGE */}
//       <div className={`absolute -top-3 -left-3 font-bold text-base w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10 ${
//         isMyOrder ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
//       }`}>
//         #{sequentialNumber}
//       </div>

//       {/* MY ORDER INDICATOR */}
//       {isMyOrder && (
//         <div className="absolute -top-3 -right-3 bg-green-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border-4 border-white z-10 flex items-center gap-1">
//           <User className="w-3 h-3" />
//           YOUR ORDER
//         </div>
//       )}

//       {/* ORDER HEADER */}
//       <div className={`px-6 py-5 border-b-2 ${
//         isMyOrder 
//           ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
//           : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
//       }`}>
//         <div className="flex justify-between items-start">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <span className="text-2xl">🍽️</span>
//               <h2 className="text-xl font-bold text-gray-900">
//                 Order #{order._id.slice(-6)}
//               </h2>
//             </div>
//             <p className="text-sm text-gray-600">
//               Table {order.tableNumber} • {order.items.length}{" "}
//               {order.items.length === 1 ? "item" : "items"}
//             </p>
//           </div>

//           {/* STATUS BADGE */}
//           <span
//             className={`rounded-full px-4 py-1.5 text-xs font-bold ${
//               order.status === "pending"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : order.status === "confirmed"
//                 ? "bg-cyan-100 text-cyan-700"
//                 : order.status === "completed"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {order.status.toUpperCase()}
//           </span>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* STATUS DISPLAY */}
//         <OrderStatusCard order={order} orderNumber={sequentialNumber} />

//         {/* ORDER TIME */}
//         <div className="mt-4 pt-4 border-t border-gray-200">
//           <p className="text-sm text-gray-600">
//             <span className="font-semibold">Placed at:</span>{" "}
//             {new Date(order.createdAt).toLocaleString("en-US", {
//               dateStyle: "medium",
//               timeStyle: "short",
//             })}
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   // ===============================
//   // LOADING STATE
//   // ===============================
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order status...</p>
//         </div>
//       </div>
//     );
//   }

//   // ===============================
//   // MAIN RENDER
//   // ===============================
//   return (
//     <div className="min-h-screen bg-white">
//       {/* HEADER */}
//       <section className="relative pt-20 pb-32 bg-gradient-to-br from-green-600 to-green-700">
//         <div className="max-w-7xl mx-auto px-4 md:px-16">
//           <button
//             onClick={() => navigate(`/${username}`)}
//             className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-semibold">Back to Menu</span>
//           </button>

//           <div className="flex items-center gap-3 mb-3">
//             <h1 className="text-white text-3xl md:text-5xl font-extrabold">
//               Live Order Status
//             </h1>
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
//             </span>
//           </div>

//           <p className="text-white/90 text-base md:text-lg">
//             Track your orders in real-time
//             {currentTableNumber && ` • Your Table: ${currentTableNumber}`}
//           </p>
//         </div>
//       </section>

//       {/* CURVED WHITE SECTION */}
//       <section className="relative bg-white">
//         <svg
//           viewBox="0 0 1440 120"
//           className="absolute -top-[119px] left-0 w-full h-[120px]"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,80 C240,120 480,120 720,100 960,80 1200,40 1440,0 L1440,120 L0,120 Z"
//             fill="white"
//           />
//         </svg>

//         {/* CONTENT */}
//         <div className="pt-16 md:pt-20 pb-16 md:pb-24">
//           <div className="max-w-7xl mx-auto px-4 md:px-16">
//             {orders.length === 0 ? (
//               // EMPTY STATE
//               <div className="text-center py-20">
//                 <div className="mx-auto h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-200">
//                   <span className="text-5xl">📦</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   No Active Orders
//                 </h3>
//                 <p className="text-gray-600 mb-8">
//                   Your orders will appear here in real-time once placed
//                 </p>
//                 <button
//                   onClick={() => navigate(`/${username}`)}
//                   className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
//                 >
//                   Explore Menu
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-8">
//                 {/* MY ORDERS SECTION */}
//                 {myOrders.length > 0 && (
//                   <div>
//                     <div className="mb-6">
//                       <div className="flex items-center gap-3 mb-2">
//                         <User className="w-6 h-6 text-green-600" />
//                         <h2 className="text-2xl font-bold text-gray-900">
//                           Your Orders (Table {currentTableNumber})
//                         </h2>
//                       </div>
//                       <p className="text-gray-600 text-sm">
//                         {myOrders.length} {myOrders.length === 1 ? 'order' : 'orders'} from your table
//                       </p>
//                     </div>
//                     <div className="space-y-6">
//                       {myOrders.map((order) => {
//                         const allOrdersSorted = [...orders].sort(
//                           (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//                         );
//                         const sequentialNumber = allOrdersSorted.findIndex(o => o._id === order._id) + 1;
//                         return renderOrderCard(order, sequentialNumber, true);
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* OTHER ORDERS SECTION */}
//                 {otherOrders.length > 0 && (
//                   <div>
//                     {myOrders.length > 0 && (
//                       <div className="mb-6">
//                         <div className="flex items-center gap-3 mb-2">
//                           <span className="text-2xl">🍽️</span>
//                           <h2 className="text-2xl font-bold text-gray-900">
//                             Other Tables
//                           </h2>
//                         </div>
//                         <p className="text-gray-600 text-sm">
//                           {otherOrders.length} {otherOrders.length === 1 ? 'order' : 'orders'} from other tables
//                         </p>
//                       </div>
//                     )}
//                     <div className="space-y-6">
//                       {otherOrders.map((order) => {
//                         const allOrdersSorted = [...orders].sort(
//                           (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//                         );
//                         const sequentialNumber = allOrdersSorted.findIndex(o => o._id === order._id) + 1;
//                         return renderOrderCard(order, sequentialNumber, false);
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* LIVE INDICATOR */}
//             {orders.length > 0 && (
//               <div className="mt-8 text-center">
//                 <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
//                   <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                   </span>
//                   <span>Live Updates Active</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} Powered by DishPop
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }








import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrders } from "../services/orderApi";
import useLiveOrders from "../hooks/useLiveOrders";
import OrderStatusCard from "../components/orders/OrderStatusCard";
import { ArrowLeft, Package, Clock, Sparkles } from "lucide-react";

export default function OrderStatusPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTableNumber, setCurrentTableNumber] = useState(null);
  
  useEffect(() => {
  console.log("🔥 Orders from API:", orders);
}, [orders]);

  // ===============================
  // GET CURRENT USER'S TABLE NUMBER
  // ===============================
  useEffect(() => {
    const tableKey = `table_${username}`;
    const storedTableNumber = localStorage.getItem(tableKey);
    
    if (storedTableNumber) {
      const tableNum = Number(storedTableNumber);
      console.log(`✅ Retrieved table number: ${tableNum} from key: ${tableKey}`);
      setCurrentTableNumber(tableNum);
    } else {
      console.log(`⚠️ No table number found for key: ${tableKey}`);
    }
  }, [username]);

  // ===============================
  // SORT ORDERS BY LATEST FIRST
  // ===============================
  const sortOrdersByPriority = useCallback((orders) => {
    // Sort by creation time - newest first
    return orders.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, []);

  // ===============================
  // GET ONLY USER'S ORDERS
  // ===============================
  // const myOrders = useMemo(() => {
  //   if (currentTableNumber === null) return [];

  //   const my = orders.filter(order => 
  //     Number(order.tableNumber) === currentTableNumber
  //   );

  //   return sortOrdersByPriority(my);
  // }, [orders, currentTableNumber, sortOrdersByPriority]);

const myOrders = useMemo(() => {
  if (!orders.length) return [];

  const storedPhone = localStorage.getItem(`phone_${username}`);

  console.log("📱 Stored phone:", storedPhone);

  return sortOrdersByPriority(
    orders.filter(order => {

      // DINE IN
      if (order.orderType === "DINE_IN") {
        return Number(order.tableNumber) === currentTableNumber;
      }

      // ONLINE
      if (order.orderType === "ONLINE") {
        return order.phoneNumber === storedPhone;
      }

      return false;
    })
  );

}, [orders, currentTableNumber, username, sortOrdersByPriority]);


  // ===============================
  // COUNT PENDING ORDERS AHEAD (DYNAMIC)
  // ===============================
  const getPendingOrdersAhead = useCallback((currentOrder) => {
    if (currentOrder.status !== 'pending') return 0;

    // Count only pending/confirmed orders created BEFORE this order
    // This will decrease as orders ahead get completed
    return orders.filter(order => 
      order._id !== currentOrder._id && // Don't count self
      (order.status === 'confirmed' || order.status === 'pending') &&
      new Date(order.createdAt) < new Date(currentOrder.createdAt)
    ).length;
  }, [orders]);

  // ===============================
  // INITIAL LOAD
  // ===============================
  const loadOrders = useCallback(async () => {
    if (!username) return;

    try {
      const res = await fetchOrders(username);
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      setOrders(data);
    } catch (err) {
      console.error("❌ Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // ===============================
  // LIVE SOCKET EVENTS
  // ===============================
  const handleOrderEvent = useCallback((type, order) => {
    setOrders((prev) => {
      let updated = [...prev];

      if (type === "created") {
        updated.push(order);
      } else if (type === "updated" || type === "replaced") {
        updated = updated.map((o) =>
          o._id === order._id ? { ...o, ...order } : o
        );
      } else if (type === "deleted") {
        const orderId = typeof order === "string" ? order : order._id;
        updated = updated.filter((o) => o._id !== orderId);
      }

      return updated;
    });
  }, []);

  useLiveOrders(username, handleOrderEvent);

  // ===============================
  // HELPER FUNCTIONS
  // ===============================
  const getTimeAgo = (date) => {
    const minutes = Math.floor((Date.now() - new Date(date)) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min ago";
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  };

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // ===============================
  // MAIN RENDER
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/${username}`)}
              className="p-2 -ml-2 hover:bg-green-50 rounded-full transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <h1 className="text-lg font-bold text-gray-900">Order Tracking</h1>
            </div>
            
            <div className="flex items-center gap-1.5 bg-green-100 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              <span className="text-xs font-semibold text-green-700">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* TABLE INFO BANNER */}
      {currentTableNumber && (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-4">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{currentTableNumber}</span>
            </div>
            <span className="font-medium">Table {currentTableNumber}</span>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {myOrders.length === 0 ? (
          // EMPTY STATE
          <div className="text-center py-16 animate-fade-in">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl flex items-center justify-center">
                <Package className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Active Orders
            </h3>
            <p className="text-gray-600 mb-6">
              Your orders will appear here once placed
            </p>
            <button
              onClick={() => navigate(`/${username}`)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          // ORDERS LIST
          <div className="space-y-4">
            {myOrders.map((order, index) => {
              const pendingAhead = getPendingOrdersAhead(order);
              
              return (
                <div 
                  key={order._id} 
                  className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  style={{
                    animation: `slideUp 0.4s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* ORDER HEADER */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 border-b border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-base font-bold text-gray-900">
                            #{order._id.slice(-6)}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {getTimeAgo(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PENDING ORDERS AHEAD BANNER */}
                  {order.status === 'pending' && pendingAhead > 0 && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                            {pendingAhead}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-amber-900">
                            {pendingAhead} order{pendingAhead !== 1 ? 's' : ''} ahead
                          </p>
                          <p className="text-xs text-amber-700">
                            Your order will start preparing soon
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STATUS CARD */}
                  <div className="p-6">
                    <OrderStatusCard order={order} orderNumber={index + 1} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}