// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";

// // export default function OrdersPage() {
// //   const [orders, setOrders] = useState([]);
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const ordersKey = `orders_${id}`;

// //   useEffect(() => {
// //     const savedRaw = JSON.parse(localStorage.getItem(ordersKey)) || [];

// //     let flattenedOrders = [];

// //     // ✅ NEW FORMAT (session-based object)
// //     if (
// //       savedRaw &&
// //       typeof savedRaw === "object" &&
// //       !Array.isArray(savedRaw)
// //     ) {
// //       Object.values(savedRaw).forEach((session) => {
// //         session.orders.forEach((order) => {
// //           flattenedOrders.push({
// //             ...order,
// //             customerName: session.customerName,
// //             phoneNumber: session.phoneNumber,
// //             tableNumber: session.tableNumber,
// //             description: order.description,
// //           });
// //         });
// //       });
// //     }
// //     // ✅ OLD FORMAT (array)
// //     else if (Array.isArray(savedRaw)) {
// //       flattenedOrders = savedRaw;
// //     }

// //     // 🔥 Existing expiry logic (kept)
// //     const now = Date.now();
// //     const validOrders = flattenedOrders.filter(
// //       (order) => !order.expiresAt || order.expiresAt > now
// //     );

// //     setOrders(validOrders);
// //   }, [ordersKey]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6">
// //       {/* HEADER */}
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-3xl font-bold text-slate-800">
// //           My Orders
// //         </h1>

// //         <button
// //           onClick={() => navigate(`/menu/${id}`)}
// //           className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-2.5 rounded-xl 
// //                    shadow-md hover:shadow-lg hover:from-slate-700 hover:to-slate-600 transition-all duration-200
// //                    font-semibold"
// //         >
// //           Go to Menu →
// //         </button>
// //       </div>

// //       {/* EMPTY STATE */}
// //       {orders.length === 0 ? (
// //         <div className="text-center mt-20">
// //           <div className="mx-auto mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-slate-100">
// //             <span className="text-4xl">🍽️</span>
// //           </div>
// //           <p className="text-slate-600 text-lg font-medium">
// //             No previous orders found.
// //           </p>
// //           <p className="text-slate-500 text-sm mt-2">
// //             Your order history will appear here
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="space-y-6">
// //           {orders.map((order) => (
// //             <div
// //               key={order.id}
// //               className="bg-white p-6 rounded-3xl shadow-md border border-slate-200 
// //                        hover:shadow-lg transition-shadow duration-200"
// //             >
// //               {/* ORDER HEADER */}
// //               <div className="flex justify-between items-center mb-4">
// //                 <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
// //                   <span className="text-amber-600">🧾</span>
// //                   Order Summary
// //                 </h2>

// //                 <span className="text-sm text-slate-500">
// //                   {new Date(order.timestamp).toLocaleString()}
// //                 </span>
// //               </div>

// //               {/* CUSTOMER DETAILS */}
// //               <div className="bg-gradient-to-br from-slate-50 to-amber-50 rounded-2xl p-4 border border-slate-200 mb-5">
// //                 <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
// //                   <span>👤</span>
// //                   Customer Details
// //                 </h3>

// //                 <div className="space-y-2 text-slate-700">
// //                   <p>
// //                     <span className="font-semibold text-slate-800">Name:</span>{" "}
// //                     {order.customerName}
// //                   </p>

// //                   {order.phoneNumber && (
// //                     <p>
// //                       <span className="font-semibold text-slate-800">Phone:</span>{" "}
// //                       {order.phoneNumber}
// //                     </p>
// //                   )}

// //                   <p>
// //                     <span className="font-semibold text-slate-800">Table:</span>{" "}
// //                     {order.tableNumber}
// //                   </p>

// //                   {order.description && (
// //                     <p>
// //                       <span className="font-semibold text-slate-800">Notes:</span>{" "}
// //                       {order.description}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* ITEMS */}
// //               <div className="bg-slate-50 rounded-2xl p-4 space-y-4 border border-slate-200">
// //                 <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
// //                   <span>🍽</span>
// //                   Items Ordered
// //                 </h3>

// //                 {order.items.map((item, idx) => (
// //                   <div
// //                     key={`${item.itemId}-${idx}`}
// //                     className="border-b border-slate-200 last:border-none pb-3 last:pb-0"
// //                   >
// //                     <div className="flex justify-between items-start">
// //                       <div>
// //                         <p className="font-semibold text-slate-900">
// //                           {item.name} × {item.qty}
// //                         </p>

// //                         {item.variant && (
// //                           <p className="text-sm text-slate-600">
// //                             Variant: {item.variant.name} (₹
// //                             {item.variant.price})
// //                           </p>
// //                         )}

// //                         {item.addons?.length > 0 && (
// //                           <div className="mt-1 space-y-0.5">
// //                             {item.addons.map((addon) => (
// //                               <p
// //                                 key={addon.id}
// //                                 className="text-xs text-slate-600"
// //                               >
// //                                 + {addon.name} (₹{addon.price})
// //                               </p>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>

// //                       <p className="text-amber-600 font-bold">
// //                         ₹{item.totalPrice}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* TOTAL */}
// //               <div className="border-t border-slate-200 mt-5 pt-4 flex justify-between items-center">
// //                 <p className="text-lg font-bold text-slate-800">
// //                   Total
// //                 </p>
// //                 <p className="text-2xl font-bold text-amber-600">
// //                   ₹{order.grandTotal ?? order.totalAmount}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const ordersKey = `orders_${id}`;

//   useEffect(() => {
//     const savedRaw = JSON.parse(localStorage.getItem(ordersKey)) || [];

//     let flattenedOrders = [];

//     // ✅ NEW FORMAT (session-based object)
//     if (savedRaw && typeof savedRaw === "object" && !Array.isArray(savedRaw)) {
//       Object.values(savedRaw).forEach((session) => {
//         session.orders.forEach((order) => {
//           flattenedOrders.push({
//             ...order,
//             customerName: session.customerName,
//             phoneNumber: session.phoneNumber,
//             tableNumber: session.tableNumber,
//             description: order.description,
//           });
//         });
//       });
//     }
//     // ✅ OLD FORMAT (array)
//     else if (Array.isArray(savedRaw)) {
//       flattenedOrders = savedRaw;
//     }

//     // 🔥 Expiry logic
//     const now = Date.now();
//     const validOrders = flattenedOrders.filter(
//       (order) => !order.expiresAt || order.expiresAt > now
//     );

//     setOrders(validOrders);
//   }, [ordersKey]);

//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-white to-slate-100 px-4 md:px-8 py-10">
//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
//         <div>
//           <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
//             Order History
//           </h1>
//           <p className="text-slate-500 mt-1">
//             Review your past dining experience
//           </p>
//         </div>

//         <button
//           onClick={() => navigate(`/menu/${id}`)}
//           className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 
//                      px-7 py-3 text-white font-semibold shadow-lg hover:shadow-xl 
//                      hover:scale-[1.02] transition-all duration-300"
//         >
//           Go to Menu
//           <span className="group-hover:translate-x-1 transition-transform">
//             →
//           </span>
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-6xl mx-auto">
//         {orders.length === 0 ? (
//           <div className="mt-28 text-center">
//             <div className="mx-auto h-24 w-24 rounded-full bg-white shadow-md flex items-center justify-center">
//               <span className="text-5xl">🍽️</span>
//             </div>
//             <h3 className="mt-6 text-xl font-semibold text-slate-800">
//               No Orders Yet
//             </h3>
//             <p className="text-slate-500 mt-2">
//               Your previous orders will appear here once placed
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-10">
//             {orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200 
//                            shadow-[0_20px_40px_rgba(0,0,0,0.06)]
//                            hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
//                            transition-all duration-300"
//               >
//                 <div className="p-8">
//                   {/* ORDER HEADER */}
//                   <div className="flex justify-between items-start mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                         🧾 Order Summary
//                       </h2>
//                       <p className="text-sm text-slate-500 mt-1">
//                         {new Date(order.timestamp).toLocaleString()}
//                       </p>
//                     </div>

//                     <span className="rounded-full bg-amber-100 text-amber-700 px-4 py-1 text-sm font-semibold">
//                       Completed
//                     </span>
//                   </div>

//                   {/* CUSTOMER DETAILS */}
//                   <div className="rounded-2xl bg-gradient-to-br from-white to-amber-50 border border-slate-200 p-6 mb-8">
//                     <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
//                       👤 Customer Details
//                     </h3>

//                     <div className="grid sm:grid-cols-2 gap-4 text-slate-700">
//                       <p>
//                         <span className="font-semibold">Name:</span>{" "}
//                         {order.customerName}
//                       </p>

//                       {order.phoneNumber && (
//                         <p>
//                           <span className="font-semibold">Phone:</span>{" "}
//                           {order.phoneNumber}
//                         </p>
//                       )}

//                       <p>
//                         <span className="font-semibold">Table:</span>{" "}
//                         {order.tableNumber}
//                       </p>

//                       {order.description && (
//                         <p className="sm:col-span-2">
//                           <span className="font-semibold">Notes:</span>{" "}
//                           {order.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* ITEMS ORDERED */}
//                   <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
//                     <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
//                       🍽 Items Ordered
//                     </h3>

//                     <div className="space-y-5">
//                       {order.items.map((item, idx) => (
//                         <div
//                           key={`${item.itemId}-${idx}`}
//                           className="flex justify-between gap-6 pb-5 border-b last:border-none"
//                         >
//                           <div>
//                             <p className="font-semibold text-slate-900">
//                               {item.name} × {item.qty}
//                             </p>

//                             {item.variant && (
//                               <p className="text-sm text-slate-600 mt-1">
//                                 Variant: {item.variant.name} (₹
//                                 {item.variant.price})
//                               </p>
//                             )}

//                             {item.addons?.length > 0 && (
//                               <div className="mt-1 space-y-1">
//                                 {item.addons.map((addon) => (
//                                   <p
//                                     key={addon.id}
//                                     className="text-xs text-slate-600"
//                                   >
//                                     + {addon.name} (₹{addon.price})
//                                   </p>
//                                 ))}
//                               </div>
//                             )}
//                           </div>

//                           <p className="text-lg font-bold text-amber-600">
//                             ₹{item.totalPrice}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* TOTAL */}
//                   <div className="mt-8 pt-6 border-t flex justify-between items-center">
//                     <p className="text-xl font-bold text-slate-900">
//                       Grand Total
//                     </p>
//                     <p className="text-3xl font-extrabold text-amber-600">
//                       ₹{order.grandTotal ?? order.totalAmount}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const ordersKey = `orders_${id}`;

  useEffect(() => {
    const savedRaw = JSON.parse(localStorage.getItem(ordersKey)) || [];

    let flattenedOrders = [];

    // ✅ NEW FORMAT (session-based object)
    if (savedRaw && typeof savedRaw === "object" && !Array.isArray(savedRaw)) {
      Object.values(savedRaw).forEach((session) => {
        session.orders.forEach((order) => {
          flattenedOrders.push({
            ...order,
            customerName: session.customerName,
            phoneNumber: session.phoneNumber,
            tableNumber: session.tableNumber,
            description: order.description,
          });
        });
      });
    }
    // ✅ OLD FORMAT (array)
    else if (Array.isArray(savedRaw)) {
      flattenedOrders = savedRaw;
    }

    // 🔥 Expiry logic
    const now = Date.now();
    const validOrders = flattenedOrders.filter(
      (order) => !order.expiresAt || order.expiresAt > now
    );

    setOrders(validOrders);
  }, [ordersKey]);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - SIMILAR TO LANDING PAGE BANNER */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <button
            onClick={() => navigate(`/menu/${id}`)}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Menu</span>
          </button>

          <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-3">
            Order History
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-lg">
            Review your past dining experiences and order details
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
              <div className="text-center py-20">
                <div className="mx-auto h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-200">
                  <span className="text-5xl">🍽️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Your previous orders will appear here once placed
                </p>
                <button
                  onClick={() => navigate(`/menu/${id}`)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* ORDER HEADER */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <h2 className="text-xl font-bold text-gray-900">
                              Order Summary
                            </h2>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(order.timestamp).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                        <span className="rounded-full bg-green-100 text-green-700 px-4 py-1.5 text-xs font-bold">
                          COMPLETED
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* CUSTOMER DETAILS */}
                      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 mb-6">
                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span>👤</span> Customer Details
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Name:</span>
                            <p className="text-gray-900 mt-0.5">{order.customerName}</p>
                          </div>

                          {order.phoneNumber && (
                            <div>
                              <span className="font-semibold text-gray-700">Phone:</span>
                              <p className="text-gray-900 mt-0.5">{order.phoneNumber}</p>
                            </div>
                          )}

                          <div>
                            <span className="font-semibold text-gray-700">Table:</span>
                            <p className="text-gray-900 mt-0.5">{order.tableNumber}</p>
                          </div>

                          {order.description && (
                            <div className="sm:col-span-2">
                              <span className="font-semibold text-gray-700">Notes:</span>
                              <p className="text-gray-900 mt-0.5">{order.description}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ITEMS ORDERED */}
                      <div className="rounded-2xl bg-white border border-gray-200 p-5">
                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span>🍽</span> Items Ordered
                        </h3>

                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div
                              key={`${item.itemId}-${idx}`}
                              className="flex justify-between gap-4 pb-4 border-b border-gray-200 last:border-none"
                            >
                              <div className="flex-1">
                                <p className="font-bold text-gray-900 mb-1">
                                  {item.name} × {item.qty}
                                </p>

                                {item.variant && (
                                  <p className="text-sm text-gray-600">
                                    Variant: {item.variant.name} (₹{item.variant.price})
                                  </p>
                                )}

                                {item.addons?.length > 0 && (
                                  <div className="mt-1 space-y-0.5">
                                    {item.addons.map((addon) => (
                                      <p
                                        key={addon.id}
                                        className="text-xs text-gray-600"
                                      >
                                        + {addon.name} (₹{addon.price})
                                      </p>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <p className="text-lg font-bold text-green-600 flex-shrink-0">
                                ₹{item.totalPrice}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* TOTAL */}
                      <div className="mt-6 pt-5 border-t-2 border-gray-200 flex justify-between items-center">
                        <p className="text-xl font-bold text-gray-900">
                          Grand Total
                        </p>
                        <p className="text-3xl font-extrabold text-green-600">
                          ₹{order.grandTotal ?? order.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER - MATCHING LANDING PAGE */}
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