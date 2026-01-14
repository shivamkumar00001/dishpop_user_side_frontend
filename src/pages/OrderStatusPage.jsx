// // import { useEffect, useState, useCallback } from "react";
// // import { useParams } from "react-router-dom";
// // import { fetchOrders } from "../services/orderApi";
// // import useLiveOrders from "../hooks/useLiveOrders";
// // import OrderStatusCard from "../components/orders/OrderStatusCard";

// // export default function OrderStatusPage() {
// //   console.log("✅ OrderStatusPage rendered");

// //   const { username } = useParams();
// //   console.log("👤 username from route:", username);

// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const loadOrders = useCallback(async () => {
// //     if (!username) return;

// //     try {
// //       const res = await fetchOrders(username);
// //       const data = Array.isArray(res.data?.data) ? res.data.data : [];
      
// //       // Sort by creation date (oldest first)
// //       data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
// //       setOrders(data);
// //     } catch (err) {
// //       console.error("Failed to load orders", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [username]);

// //   useEffect(() => {
// //     loadOrders();
// //   }, [loadOrders]);

// //   const handleOrderEvent = useCallback((type, order) => {
// //     console.log("🔄 Handling order event:", type, order);
    
// //     setOrders((prev) => {
// //       let updated = [...prev];

// //       if (type === "created") {
// //         // Add new order
// //         updated = [...updated, order];
// //       } else if (type === "updated" || type === "replaced") {
// //         // Update existing order
// //         updated = updated.map((o) =>
// //           o._id === order._id ? { ...o, ...order } : o
// //         );
// //       } else if (type === "deleted") {
// //         // Remove order (handle both string and object)
// //         const orderId = typeof order === "string" ? order : order._id;
// //         updated = updated.filter((o) => o._id !== orderId);
// //       }

// //       // Keep sorted by creation date
// //       updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
// //       return updated;
// //     });
// //   }, []);

// //   useLiveOrders(username, handleOrderEvent);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
// //         Loading order status…
// //       </div>
// //     );
// //   }

// //   if (orders.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
// //         <div className="text-center">
// //           <p className="text-xl mb-2">No orders yet</p>
// //           <p className="text-sm">Your orders will appear here</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-black text-white p-4">
// //       <h1 className="text-xl font-bold text-center mb-4">
// //         Order Status - {username}
// //       </h1>

// //       <div className="max-w-xl mx-auto space-y-4">
// //         {orders.map((order) => (
// //           <OrderStatusCard key={order._id} order={order} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// // import { useEffect, useState, useCallback, useRef } from "react";
// // import { useParams } from "react-router-dom";
// // import { fetchOrders } from "../services/orderApi";
// // import useLiveOrders from "../hooks/useLiveOrders";
// // import OrderStatusCard from "../components/orders/OrderStatusCard";

// // export default function OrderStatusPage() {
// //   console.log("✅ OrderStatusPage rendered");

// //   const { username } = useParams();
// //   console.log("👤 username from route:", username);

// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Track if this is the initial load
// //   const isInitialLoadRef = useRef(true);

// //   // ===============================
// //   // INITIAL LOAD
// //   // ===============================
// //   const loadOrders = useCallback(async () => {
// //     if (!username) return;

// //     try {
// //       const res = await fetchOrders(username);
// //       const data = Array.isArray(res.data?.data) ? res.data.data : [];

// //       // Oldest → newest (order sequence)
// //       data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
// //       setOrders(data);
// //     } catch (err) {
// //       console.error("Failed to load orders", err);
// //     } finally {
// //       setLoading(false);
// //       // Mark initial load as complete
// //       isInitialLoadRef.current = false;
// //     }
// //   }, [username]);

// //   useEffect(() => {
// //     loadOrders();
// //   }, [loadOrders]);

// //   // ===============================
// //   // LIVE SOCKET EVENTS
// //   // ===============================
// //   const handleOrderEvent = useCallback((type, order) => {
// //     console.log("🔄 Handling order event:", type, order);

// //     setOrders((prev) => {
// //       let updated = [...prev];

// //       if (type === "created") {
// //         updated.push(order);
// //       } 
// //       else if (type === "updated" || type === "replaced") {
// //         updated = updated.map((o) =>
// //           o._id === order._id ? { ...o, ...order } : o
// //         );
// //       } 
// //       else if (type === "deleted") {
// //         const orderId = typeof order === "string" ? order : order._id;
// //         updated = updated.filter((o) => o._id !== orderId);
// //       }

// //       // Maintain order numbering
// //       updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
// //       return updated;
// //     });
// //   }, []);

// //   useLiveOrders(username, handleOrderEvent);

// //   // ===============================
// //   // UI STATES
// //   // ===============================
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
// //         Loading order status…
// //       </div>
// //     );
// //   }

// //   if (orders.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
// //         <div className="text-center">
// //           <p className="text-xl mb-2">No orders yet</p>
// //           <p className="text-sm">Your orders will appear here</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ===============================
// //   // MAIN RENDER
// //   // ===============================
// //   return (
// //     <div className="min-h-screen bg-black text-white p-4">
// //       <h1 className="text-xl font-bold text-center mb-4">
// //         Order Status - {username}
// //       </h1>

// //       <div className="max-w-xl mx-auto space-y-4">
// //         {orders.map((order, index) => (
// //           <OrderStatusCard
// //             key={order._id}
// //             order={order}
// //             orderNumber={index + 1}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/OrderStatusPage.jsx
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
//   // INITIAL LOAD
//   // ===============================
//   const loadOrders = useCallback(async () => {
//     if (!username) return;

//     try {
//       const res = await fetchOrders(username);
//       const data = Array.isArray(res.data?.data) ? res.data.data : [];
//       data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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

//       updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       return updated;
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
//                 {orders.map((order, index) => (
//                   <div
//                     key={order._id}
//                     className="rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
//                   >
//                     {/* ORDER NUMBER BADGE */}
//                     <div className="absolute -top-3 -left-3 bg-green-600 text-white font-bold text-base w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
//                       #{index + 1}
//                     </div>

//                     {/* ORDER HEADER */}
//                     <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="text-2xl">🍽️</span>
//                             <h2 className="text-xl font-bold text-gray-900">
//                               Order #{order._id.slice(-6)}
//                             </h2>
//                           </div>
//                           <p className="text-sm text-gray-600">
//                             Table {order.tableNumber} • {order.items.length}{" "}
//                             {order.items.length === 1 ? "item" : "items"}
//                           </p>
//                         </div>

//                         {/* STATUS BADGE */}
//                         <span
//                           className={`rounded-full px-4 py-1.5 text-xs font-bold ${
//                             order.status === "pending"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : order.status === "confirmed"
//                               ? "bg-cyan-100 text-cyan-700"
//                               : order.status === "completed"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {order.status.toUpperCase()}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="p-6">
//                       {/* STATUS DISPLAY */}
//                       <OrderStatusCard order={order} orderNumber={index + 1} />

//                       {/* ORDER TIME */}
//                       <div className="mt-4 pt-4 border-t border-gray-200">
//                         <p className="text-sm text-gray-600">
//                           <span className="font-semibold">Placed at:</span>{" "}
//                           {new Date(order.createdAt).toLocaleString("en-US", {
//                             dateStyle: "medium",
//                             timeStyle: "short",
//                           })}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
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
// src/pages/OrderStatusPage.jsx
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrders } from "../services/orderApi";
import useLiveOrders from "../hooks/useLiveOrders";
import OrderStatusCard from "../components/orders/OrderStatusCard";
import { ArrowLeft } from "lucide-react";

export default function OrderStatusPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // SORT ORDERS BY PRIORITY
  // ===============================
  const sortOrdersByPriority = (orders) => {
    const statusPriority = {
      confirmed: 1,  // Preparing (highest priority)
      pending: 2,    // Order Received
      completed: 3,  // Prepared
      cancelled: 4   // Cancelled (lowest priority)
    };

    return orders.sort((a, b) => {
      const priorityDiff = statusPriority[a.status] - statusPriority[b.status];
      
      // If same status, sort by creation time (oldest first)
      if (priorityDiff === 0) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      
      return priorityDiff;
    });
  };

  // ===============================
  // INITIAL LOAD
  // ===============================
  const loadOrders = useCallback(async () => {
    if (!username) return;

    try {
      const res = await fetchOrders(username);
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      const sortedData = sortOrdersByPriority(data);
      setOrders(sortedData);
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

      // Sort by priority after any change
      return sortOrdersByPriority(updated);
    });
  }, []);

  useLiveOrders(username, handleOrderEvent);

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order status...</p>
        </div>
      </div>
    );
  }

  // ===============================
  // MAIN RENDER
  // ===============================
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <button
            onClick={() => navigate(`/${username}`)}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Menu</span>
          </button>

          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold">
              Live Order Status
            </h1>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>

          <p className="text-white/90 text-base md:text-lg">
            Track your orders in real-time • {orders.length} active{" "}
            {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>
      </section>

      {/* CURVED WHITE SECTION */}
      <section className="relative bg-white">
        <svg
          viewBox="0 0 1440 120"
          className="absolute -top-[119px] left-0 w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,120 480,120 720,100 960,80 1200,40 1440,0 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>

        {/* CONTENT */}
        <div className="pt-16 md:pt-20 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-16">
            {orders.length === 0 ? (
              // EMPTY STATE
              <div className="text-center py-20">
                <div className="mx-auto h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-200">
                  <span className="text-5xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Active Orders
                </h3>
                <p className="text-gray-600 mb-8">
                  Your orders will appear here in real-time once placed
                </p>
                <button
                  onClick={() => navigate(`/${username}`)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              // ORDER CARDS
              <div className="space-y-6">
                {orders.map((order, index) => {
                  // Calculate sequential order number based on creation time
                  const allOrdersSorted = [...orders].sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                  );
                  const sequentialNumber = allOrdersSorted.findIndex(o => o._id === order._id) + 1;

                  return (
                    <div
                      key={order._id}
                      className="rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                    >
                      {/* ORDER NUMBER BADGE */}
                      <div className="absolute -top-3 -left-3 bg-green-600 text-white font-bold text-base w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                        #{sequentialNumber}
                      </div>

                      {/* ORDER HEADER */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl">🍽️</span>
                              <h2 className="text-xl font-bold text-gray-900">
                                Order #{order._id.slice(-6)}
                              </h2>
                            </div>
                            <p className="text-sm text-gray-600">
                              Table {order.tableNumber} • {order.items.length}{" "}
                              {order.items.length === 1 ? "item" : "items"}
                            </p>
                          </div>

                          {/* STATUS BADGE */}
                          <span
                            className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "confirmed"
                                ? "bg-cyan-100 text-cyan-700"
                                : order.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* STATUS DISPLAY */}
                        <OrderStatusCard order={order} orderNumber={sequentialNumber} />

                        {/* ORDER TIME */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Placed at:</span>{" "}
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LIVE INDICATOR */}
            {orders.length > 0 && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Live Updates Active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Powered by DishPop
          </p>
        </div>
      </footer>
    </div>
  );
}