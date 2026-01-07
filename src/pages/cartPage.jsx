// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import { useNavigate, useParams } from "react-router-dom";

// // // // // // // // import CartHeader from "../components/cart/CartHeader";
// // // // // // // // import CartItem from "../components/cart/CartItem";
// // // // // // // // import CartSummary from "../components/cart/CartSummary";

// // // // // // // // export default function CartPage() {
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { id: username } = useParams();

// // // // // // // //   const cartKey = `cart_${username}`;
// // // // // // // //   const [cart, setCart] = useState([]);

// // // // // // // //   /* ---------------- LOAD CART ---------------- */
// // // // // // // //   useEffect(() => {
// // // // // // // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // // // // // // //     setCart(saved);
// // // // // // // //   }, [cartKey]);

// // // // // // // //   const updateCart = (updated) => {
// // // // // // // //     setCart(updated);
// // // // // // // //     localStorage.setItem(cartKey, JSON.stringify(updated));
// // // // // // // //   };

// // // // // // // //   /* ---------------- QTY CONTROLS ---------------- */
// // // // // // // //   const increaseQty = (itemId) => {
// // // // // // // //     updateCart(
// // // // // // // //       cart.map((item) =>
// // // // // // // //         item.id === itemId
// // // // // // // //           ? {
// // // // // // // //               ...item,
// // // // // // // //               qty: item.qty + 1,
// // // // // // // //               totalPrice: item.unitPrice * (item.qty + 1),
// // // // // // // //             }
// // // // // // // //           : item
// // // // // // // //       )
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   const decreaseQty = (itemId) => {
// // // // // // // //     updateCart(
// // // // // // // //       cart
// // // // // // // //         .map((item) =>
// // // // // // // //           item.id === itemId
// // // // // // // //             ? {
// // // // // // // //                 ...item,
// // // // // // // //                 qty: item.qty - 1,
// // // // // // // //                 totalPrice: item.unitPrice * (item.qty - 1),
// // // // // // // //               }
// // // // // // // //             : item
// // // // // // // //         )
// // // // // // // //         .filter((item) => item.qty > 0)
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   /* ---------------- TOTAL ---------------- */
// // // // // // // //   const totalAmount = cart.reduce(
// // // // // // // //     (sum, item) => sum + Number(item.totalPrice || 0),
// // // // // // // //     0
// // // // // // // //   );

// // // // // // // //   /* ---------------- UI ---------------- */
// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex flex-col">
// // // // // // // //       <CartHeader cart={cart} navigate={navigate} username={username} />

// // // // // // // //       <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
// // // // // // // //         {cart.length === 0 ? (
// // // // // // // //           <div className="mt-20 text-center px-4">
// // // // // // // //             <div className="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-slate-100">
// // // // // // // //               <span className="text-4xl">🛒</span>
// // // // // // // //             </div>
// // // // // // // //             <p className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
// // // // // // // //               Your cart is empty
// // // // // // // //             </p>
// // // // // // // //             <p className="text-slate-600 mb-6">
// // // // // // // //               Add some delicious items to get started
// // // // // // // //             </p>

// // // // // // // //             <button
// // // // // // // //               onClick={() => navigate(`/menu/${username}`)}
// // // // // // // //               className="bg-gradient-to-r from-slate-800 to-slate-700 text-white 
// // // // // // // //                        px-6 sm:px-8 py-3 rounded-xl font-bold shadow-lg
// // // // // // // //                        hover:from-slate-700 hover:to-slate-600 hover:shadow-xl
// // // // // // // //                        active:scale-95 transition-all duration-200"
// // // // // // // //             >
// // // // // // // //               Browse Menu
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         ) : (
// // // // // // // //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // // // // // //             {/* ITEMS */}
// // // // // // // //             <section className="space-y-4 lg:col-span-2">
// // // // // // // //               {cart.map((item) => (
// // // // // // // //                 <CartItem
// // // // // // // //                   key={item.id}
// // // // // // // //                   item={item}
// // // // // // // //                   increaseQty={increaseQty}
// // // // // // // //                   decreaseQty={decreaseQty}
// // // // // // // //                 />
// // // // // // // //               ))}
// // // // // // // //             </section>

// // // // // // // //             {/* SUMMARY */}
// // // // // // // //             <aside className="lg:sticky lg:top-24 lg:self-start">
// // // // // // // //               <CartSummary
// // // // // // // //                 totalAmount={totalAmount}
// // // // // // // //                 navigate={navigate}
// // // // // // // //                 username={username}
// // // // // // // //               />
// // // // // // // //             </aside>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </main>

// // // // // // // //       <footer className="text-center text-slate-500 py-4 sm:py-6 text-sm border-t border-slate-200">
// // // // // // // //         © 2025 DishPop — Order Happiness 🍽️
// // // // // // // //       </footer>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { useNavigate, useParams } from "react-router-dom";

// // // // // // // import CartHeader from "../components/cart/CartHeader";
// // // // // // // import CartItem from "../components/cart/CartItem";
// // // // // // // import CartSummary from "../components/cart/CartSummary";

// // // // // // // export default function CartPage() {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { id: username } = useParams();

// // // // // // //   const cartKey = `cart_${username}`;
// // // // // // //   const [cart, setCart] = useState([]);

// // // // // // //   /* ---------------- LOAD CART ---------------- */
// // // // // // //   useEffect(() => {
// // // // // // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // // // // // //     setCart(saved);
// // // // // // //   }, [cartKey]);

// // // // // // //   const updateCart = (updated) => {
// // // // // // //     setCart(updated);
// // // // // // //     localStorage.setItem(cartKey, JSON.stringify(updated));
// // // // // // //   };

// // // // // // //   /* ---------------- QTY CONTROLS ---------------- */
// // // // // // //   const increaseQty = (itemId) => {
// // // // // // //     updateCart(
// // // // // // //       cart.map((item) =>
// // // // // // //         item.id === itemId
// // // // // // //           ? {
// // // // // // //               ...item,
// // // // // // //               qty: item.qty + 1,
// // // // // // //               totalPrice: item.unitPrice * (item.qty + 1),
// // // // // // //             }
// // // // // // //           : item
// // // // // // //       )
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const decreaseQty = (itemId) => {
// // // // // // //     updateCart(
// // // // // // //       cart
// // // // // // //         .map((item) =>
// // // // // // //           item.id === itemId
// // // // // // //             ? {
// // // // // // //                 ...item,
// // // // // // //                 qty: item.qty - 1,
// // // // // // //                 totalPrice: item.unitPrice * (item.qty - 1),
// // // // // // //               }
// // // // // // //             : item
// // // // // // //         )
// // // // // // //         .filter((item) => item.qty > 0)
// // // // // // //     );
// // // // // // //   };

// // // // // // //   /* ---------------- TOTAL ---------------- */
// // // // // // //   const totalAmount = cart.reduce(
// // // // // // //     (sum, item) => sum + Number(item.totalPrice || 0),
// // // // // // //     0
// // // // // // //   );

// // // // // // //   /* ---------------- UI ---------------- */
// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex flex-col">
// // // // // // //       <CartHeader cart={cart} navigate={navigate} username={username} />

// // // // // // //       <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
// // // // // // //         {cart.length === 0 ? (
// // // // // // //           <div className="mt-20 text-center px-4">
// // // // // // //             <div className="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-slate-100">
// // // // // // //               <span className="text-4xl">🛒</span>
// // // // // // //             </div>
// // // // // // //             <p className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
// // // // // // //               Your cart is empty
// // // // // // //             </p>
// // // // // // //             <p className="text-slate-600 mb-6">
// // // // // // //               Add some delicious items to get started
// // // // // // //             </p>

// // // // // // //             <button
// // // // // // //               onClick={() => navigate(`/menu/${username}`)}
// // // // // // //               className="bg-gradient-to-r from-slate-800 to-slate-700 text-white 
// // // // // // //                        px-6 sm:px-8 py-3 rounded-xl font-bold shadow-lg
// // // // // // //                        hover:from-slate-700 hover:to-slate-600 hover:shadow-xl
// // // // // // //                        active:scale-95 transition-all duration-200"
// // // // // // //             >
// // // // // // //               Browse Menu
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // // // // //             {/* ITEMS */}
// // // // // // //             <section className="space-y-4 lg:col-span-2">
// // // // // // //               {cart.map((item) => (
// // // // // // //                 <CartItem
// // // // // // //                   key={item.id}
// // // // // // //                   item={item}
// // // // // // //                   increaseQty={increaseQty}
// // // // // // //                   decreaseQty={decreaseQty}
// // // // // // //                 />
// // // // // // //               ))}
// // // // // // //             </section>

// // // // // // //             {/* SUMMARY */}
// // // // // // //             <aside className="lg:sticky lg:top-24 lg:self-start">
// // // // // // //               <CartSummary
// // // // // // //                 totalAmount={totalAmount}
// // // // // // //                 navigate={navigate}
// // // // // // //                 username={username}
// // // // // // //               />
// // // // // // //             </aside>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </main>

// // // // // // //       <footer className="text-center text-slate-500 py-4 sm:py-6 text-sm border-t border-slate-200">
// // // // // // //         © 2025 DishPop — Order Happiness 🍽️
// // // // // // //       </footer>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useNavigate, useParams } from "react-router-dom";

// // // // // // export default function CartPage() {
// // // // // //   const navigate = useNavigate();
// // // // // //   const { id: username } = useParams();

// // // // // //   const cartKey = `cart_${username}`;
// // // // // //   const [cart, setCart] = useState([]);

// // // // // //   /* ---------------- LOAD CART ---------------- */
// // // // // //   useEffect(() => {
// // // // // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // // // // //     setCart(saved);
// // // // // //   }, [cartKey]);

// // // // // //   const updateCart = (updated) => {
// // // // // //     setCart(updated);
// // // // // //     localStorage.setItem(cartKey, JSON.stringify(updated));
// // // // // //   };

// // // // // //   /* ---------------- QTY CONTROLS ---------------- */
// // // // // //   const increaseQty = (itemId) => {
// // // // // //     updateCart(
// // // // // //       cart.map((item) =>
// // // // // //         item.id === itemId
// // // // // //           ? {
// // // // // //               ...item,
// // // // // //               qty: item.qty + 1,
// // // // // //               totalPrice: item.unitPrice * (item.qty + 1),
// // // // // //             }
// // // // // //           : item
// // // // // //       )
// // // // // //     );
// // // // // //   };

// // // // // //   const decreaseQty = (itemId) => {
// // // // // //     updateCart(
// // // // // //       cart
// // // // // //         .map((item) =>
// // // // // //           item.id === itemId
// // // // // //             ? {
// // // // // //                 ...item,
// // // // // //                 qty: item.qty - 1,
// // // // // //                 totalPrice: item.unitPrice * (item.qty - 1),
// // // // // //               }
// // // // // //             : item
// // // // // //         )
// // // // // //         .filter((item) => item.qty > 0)
// // // // // //     );
// // // // // //   };

// // // // // //   /* ---------------- TOTALS ---------------- */
// // // // // //   const itemsTotal = cart.reduce(
// // // // // //     (sum, item) => sum + Number(item.totalPrice || 0),
// // // // // //     0
// // // // // //   );

// // // // // //   const deliveryCharge = itemsTotal > 0 ? 0 : 0;
// // // // // //   const convenienceFee = itemsTotal > 0 ? 9 : 0;
// // // // // //   const grandTotal = itemsTotal + deliveryCharge + convenienceFee;

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-slate-50 pb-24">
// // // // // //       {/* HEADER */}
// // // // // //       <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
// // // // // //         <button onClick={() => navigate(-1)}>←</button>
// // // // // //         <h1 className="text-lg font-semibold">Checkout</h1>
// // // // // //       </div>

// // // // // //       {/* CART CARD */}
// // // // // //       <div className="m-4 bg-white rounded-2xl shadow-sm overflow-hidden">
// // // // // //         <div className="px-4 py-3 border-b">
// // // // // //           <p className="font-semibold text-slate-800">
// // // // // //             Delivery in <span className="text-green-600">10 minutes</span>
// // // // // //           </p>
// // // // // //           <p className="text-sm text-slate-500">{cart.length} items</p>
// // // // // //         </div>

// // // // // //         {cart.map((item) => (
// // // // // //           <div
// // // // // //             key={item.id}
// // // // // //             className="flex gap-3 px-4 py-4 border-b last:border-none"
// // // // // //           >
// // // // // //             <img
// // // // // //               src={item.image}
// // // // // //               alt={item.name}
// // // // // //               className="w-16 h-16 rounded-xl object-cover"
// // // // // //             />

// // // // // //             <div className="flex-1">
// // // // // //               <p className="font-medium text-slate-800">{item.name}</p>
// // // // // //               <p className="text-sm text-slate-500">
// // // // // //                 {item.quantityLabel || "1 piece"}
// // // // // //               </p>
// // // // // //             </div>

// // // // // //             <div className="flex flex-col items-end gap-2">
// // // // // //               <div className="flex items-center border rounded-lg overflow-hidden">
// // // // // //                 <button
// // // // // //                   onClick={() => decreaseQty(item.id)}
// // // // // //                   className="px-3 py-1 text-lg"
// // // // // //                 >
// // // // // //                   −
// // // // // //                 </button>
// // // // // //                 <span className="px-3">{item.qty}</span>
// // // // // //                 <button
// // // // // //                   onClick={() => increaseQty(item.id)}
// // // // // //                   className="px-3 py-1 text-lg"
// // // // // //                 >
// // // // // //                   +
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //               <p className="font-semibold">₹{item.totalPrice}</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}

// // // // // //         <button
// // // // // //           onClick={() => navigate(`/menu/${username}`)}
// // // // // //           className="w-full text-green-600 font-semibold py-3"
// // // // // //         >
// // // // // //           + Add more items
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* BILL DETAILS */}
// // // // // //       <div className="m-4 bg-white rounded-2xl shadow-sm p-4 space-y-3">
// // // // // //         <h3 className="font-semibold text-slate-800">Bill details</h3>

// // // // // //         <div className="flex justify-between text-sm">
// // // // // //           <span>Items total</span>
// // // // // //           <span>₹{itemsTotal}</span>
// // // // // //         </div>

// // // // // //         <div className="flex justify-between text-sm">
// // // // // //           <span>Delivery charge</span>
// // // // // //           <span className="text-green-600">FREE</span>
// // // // // //         </div>

// // // // // //         <div className="flex justify-between text-sm">
// // // // // //           <span>Convenience fee</span>
// // // // // //           <span>₹{convenienceFee}</span>
// // // // // //         </div>

// // // // // //         <div className="border-t pt-3 flex justify-between font-semibold">
// // // // // //           <span>Grand total</span>
// // // // // //           <span>₹{grandTotal}</span>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* FOOTER CTA */}
// // // // // //       <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
// // // // // //         <button
// // // // // //           onClick={() => navigate(`/login`)}
// // // // // //           className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg"
// // // // // //         >
// // // // // //           Login to proceed
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate, useParams } from "react-router-dom";

// // // // // export default function CartPage() {
// // // // //   const navigate = useNavigate();
// // // // //   const { id: username } = useParams();

// // // // //   const cartKey = `cart_${username}`;
// // // // //   const [cart, setCart] = useState([]);

// // // // //   /* ---------------- LOAD CART ---------------- */
// // // // //   useEffect(() => {
// // // // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // // // //     setCart(saved);
// // // // //   }, [cartKey]);

// // // // //   const updateCart = (updated) => {
// // // // //     setCart(updated);
// // // // //     localStorage.setItem(cartKey, JSON.stringify(updated));
// // // // //   };

// // // // //   /* ---------------- QTY CONTROLS ---------------- */
// // // // //   const increaseQty = (itemId) => {
// // // // //     updateCart(
// // // // //       cart.map((item) =>
// // // // //         item.id === itemId
// // // // //           ? {
// // // // //               ...item,
// // // // //               qty: item.qty + 1,
// // // // //               totalPrice: item.unitPrice * (item.qty + 1),
// // // // //             }
// // // // //           : item
// // // // //       )
// // // // //     );
// // // // //   };

// // // // //   const decreaseQty = (itemId) => {
// // // // //     updateCart(
// // // // //       cart
// // // // //         .map((item) =>
// // // // //           item.id === itemId
// // // // //             ? {
// // // // //                 ...item,
// // // // //                 qty: item.qty - 1,
// // // // //                 totalPrice: item.unitPrice * (item.qty - 1),
// // // // //               }
// // // // //             : item
// // // // //         )
// // // // //         .filter((item) => item.qty > 0)
// // // // //     );
// // // // //   };

// // // // //   /* ---------------- TOTALS ---------------- */
// // // // //   const itemsTotal = cart.reduce(
// // // // //     (sum, item) => sum + Number(item.totalPrice || 0),
// // // // //     0
// // // // //   );

// // // // //   const convenienceFee = itemsTotal > 0 ? 9 : 0;
// // // // //   const grandTotal = itemsTotal + convenienceFee;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-slate-50 pb-28">
// // // // //       {/* HEADER */}
// // // // //       <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
// // // // //         <button onClick={() => navigate(-1)}>←</button>
// // // // //         <h1 className="text-lg font-semibold">Checkout</h1>
// // // // //       </div>

// // // // //       {/* CART */}
// // // // //       <div className="m-4 bg-white rounded-2xl shadow-sm overflow-hidden">
// // // // //         <div className="px-4 py-3 border-b">
// // // // //           <p className="font-semibold">
// // // // //             Delivery in <span className="text-green-600">10 minutes</span>
// // // // //           </p>
// // // // //           <p className="text-sm text-slate-500">{cart.length} items</p>
// // // // //         </div>

// // // // //         {cart.map((item) => {
// // // // //           const imageSrc =
// // // // //             item.image ||
// // // // //             item.imageUrl ||
// // // // //             item.photo ||
// // // // //             item.images?.[0] ||
// // // // //             "/placeholder-food.png";

// // // // //           return (
// // // // //             <div
// // // // //               key={item.id}
// // // // //               className="flex gap-3 px-4 py-4 border-b last:border-none"
// // // // //             >
// // // // //               <img
// // // // //                 src={imageSrc}
// // // // //                 alt={item.name}
// // // // //                 className="w-16 h-16 rounded-xl object-cover bg-slate-100"
// // // // //                 onError={(e) => {
// // // // //                   e.currentTarget.src = "/placeholder-food.png";
// // // // //                 }}
// // // // //               />

// // // // //               <div className="flex-1">
// // // // //                 <p className="font-medium text-slate-800">{item.name}</p>
// // // // //                 <p className="text-sm text-slate-500">
// // // // //                   {item.quantityLabel || "1 piece"}
// // // // //                 </p>
// // // // //               </div>

// // // // //               <div className="flex flex-col items-end gap-2">
// // // // //                 <div className="flex items-center bg-green-600 text-white rounded-lg overflow-hidden">
// // // // //                   <button
// // // // //                     onClick={() => decreaseQty(item.id)}
// // // // //                     className="px-3 py-1 text-lg"
// // // // //                   >
// // // // //                     −
// // // // //                   </button>
// // // // //                   <span className="px-3 bg-white text-green-700 font-semibold">
// // // // //                     {item.qty}
// // // // //                   </span>
// // // // //                   <button
// // // // //                     onClick={() => increaseQty(item.id)}
// // // // //                     className="px-3 py-1 text-lg"
// // // // //                   >
// // // // //                     +
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <p className="font-semibold text-slate-800">
// // // // //                   ₹{item.totalPrice}
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //           );
// // // // //         })}

// // // // //         <button
// // // // //           onClick={() => navigate(`/menu/${username}`)}
// // // // //           className="w-full text-green-600 font-semibold py-3"
// // // // //         >
// // // // //           + Add more items
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* BILL DETAILS */}
// // // // //       <div className="m-4 bg-white rounded-2xl shadow-sm p-4 space-y-3">
// // // // //         <h3 className="font-semibold">Bill details</h3>

// // // // //         <div className="flex justify-between text-sm">
// // // // //           <span>Items total</span>
// // // // //           <span>₹{itemsTotal}</span>
// // // // //         </div>

// // // // //         <div className="flex justify-between text-sm">
// // // // //           <span>Convenience fee</span>
// // // // //           <span>₹{convenienceFee}</span>
// // // // //         </div>

// // // // //         <div className="border-t pt-3 flex justify-between font-semibold">
// // // // //           <span>Grand total</span>
// // // // //           <span>₹{grandTotal}</span>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* OLD STYLE CTA */}
// // // // //       <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
// // // // //         <button
// // // // //           onClick={() => navigate(`/checkout/${username}`)}
// // // // //           className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg"
// // // // //         >
// // // // //           Proceed to Checkout
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // import { useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";

// // // export default function CartPage() {
// // //   const navigate = useNavigate();
// // //   const { id: username } = useParams();

// // //   const cartKey = `cart_${username}`;
// // //   const [cart, setCart] = useState([]);

// // //   /* ---------------- LOAD CART ---------------- */
// // //   useEffect(() => {
// // //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// // //     setCart(saved);
// // //   }, [cartKey]);

// // //   const updateCart = (updated) => {
// // //     setCart(updated);
// // //     localStorage.setItem(cartKey, JSON.stringify(updated));
// // //   };

// // //   /* ---------------- QTY CONTROLS ---------------- */
// // //   const increaseQty = (itemId) => {
// // //     updateCart(
// // //       cart.map((item) =>
// // //         item.id === itemId
// // //           ? {
// // //               ...item,
// // //               qty: item.qty + 1,
// // //               totalPrice: item.unitPrice * (item.qty + 1),
// // //             }
// // //           : item
// // //       )
// // //     );
// // //   };

// // //   const decreaseQty = (itemId) => {
// // //     updateCart(
// // //       cart
// // //         .map((item) =>
// // //           item.id === itemId
// // //             ? {
// // //                 ...item,
// // //                 qty: item.qty - 1,
// // //                 totalPrice: item.unitPrice * (item.qty - 1),
// // //               }
// // //             : item
// // //         )
// // //         .filter((item) => item.qty > 0)
// // //     );
// // //   };

// // //   /* ---------------- TOTALS ---------------- */
// // //   const itemsTotal = cart.reduce(
// // //     (sum, item) => sum + Number(item.totalPrice || 0),
// // //     0
// // //   );

// // //   // 🔹 backend-ready
// // //   const taxAmount = 0;
// // //   const grandTotal = itemsTotal + taxAmount;

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-28">
// // //       {/* HEADER */}
// // //       <header className="bg-white px-4 py-4 flex items-center gap-3 border-b">
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           className="text-xl text-slate-700"
// // //         >
// // //           ←
// // //         </button>
// // //         <h1 className="text-lg font-semibold text-slate-900">
// // //           Checkout
// // //         </h1>
// // //       </header>

// // //       {/* ORDER SUMMARY */}
// // //       <section className="mx-4 mt-4 bg-white rounded-2xl border shadow-sm overflow-hidden">
// // //         <div className="px-4 py-3 border-b">
// // //           <h2 className="font-semibold text-slate-900">
// // //             Order Summary
// // //           </h2>
// // //           <p className="text-sm text-slate-500">
// // //             {cart.length} item{cart.length !== 1 && "s"}
// // //           </p>
// // //         </div>

// // //         {cart.map((item) => {
// // //           const imageSrc =
// // //             item.image ||
// // //             item.imageUrl ||
// // //             item.photo ||
// // //             item.images?.[0] ||
// // //             "/placeholder-food.png";

// // //           return (
// // //             <div
// // //               key={item.id}
// // //               className="flex items-center gap-4 px-4 py-4 border-b last:border-none"
// // //             >
// // //               <img
// // //                 src={imageSrc}
// // //                 alt={item.name}
// // //                 className="w-14 h-14 rounded-xl object-cover bg-slate-200"
// // //                 onError={(e) =>
// // //                   (e.currentTarget.src = "/placeholder-food.png")
// // //                 }
// // //               />

// // //               <div className="flex-1">
// // //                 <p className="font-medium text-slate-900">
// // //                   {item.name}
// // //                 </p>
// // //                 <p className="text-xs text-slate-500">
// // //                   {item.quantityLabel || "Standard serving"}
// // //                 </p>
// // //               </div>

// // //               <div className="flex flex-col items-end gap-2">
// // //                 <div className="flex items-center border rounded-lg overflow-hidden">
// // //                   <button
// // //                     onClick={() => decreaseQty(item.id)}
// // //                     className="px-3 py-1 text-slate-700 hover:bg-slate-100"
// // //                   >
// // //                     −
// // //                   </button>
// // //                   <span className="px-3 text-sm font-semibold">
// // //                     {item.qty}
// // //                   </span>
// // //                   <button
// // //                     onClick={() => increaseQty(item.id)}
// // //                     className="px-3 py-1 text-slate-700 hover:bg-slate-100"
// // //                   >
// // //                     +
// // //                   </button>
// // //                 </div>

// // //                 <p className="text-sm font-semibold text-slate-900">
// // //                   ₹{item.totalPrice}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}

// // //         <button
// // //           onClick={() => navigate(`/menu/${username}`)}
// // //           className="w-full py-3 text-sm font-semibold text-emerald-600 border-t hover:bg-emerald-50 transition"
// // //         >
// // //           + Add more items
// // //         </button>
// // //       </section>

// // //       {/* BILL DETAILS */}
// // //       <section className="mx-4 mt-4 bg-white rounded-2xl border shadow-sm p-4 space-y-3">
// // //         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
// // //           Bill Details
// // //         </h3>

// // //         <div className="flex justify-between text-sm text-slate-700">
// // //           <span>Items total</span>
// // //           <span>₹{itemsTotal}</span>
// // //         </div>

// // //         <div className="flex justify-between text-sm text-slate-700">
// // //           <span>Tax</span>
// // //           <span>₹{taxAmount}</span>
// // //         </div>

// // //         <div className="border-t pt-3 flex justify-between font-semibold text-slate-900">
// // //           <span>Grand Total</span>
// // //           <span>₹{grandTotal}</span>
// // //         </div>
// // //       </section>

// // //       {/* FOOTER CTA */}
// // //       <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
// // //         <button
// // //           onClick={() => navigate(`/checkout/${username}`)}
// // //           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold text-base shadow-md transition"
// // //         >
// // //           Proceed to Checkout
// // //         </button>
// // //       </footer>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";

// // export default function CartPage() {
// //   const navigate = useNavigate();
// //   const { id: username } = useParams();

// //   const cartKey = `cart_${username}`;
// //   const [cart, setCart] = useState([]);

// //   /* ---------------- LOAD CART ---------------- */
// //   useEffect(() => {
// //     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
// //     setCart(saved);
// //   }, [cartKey]);

// //   const updateCart = (updated) => {
// //     setCart(updated);
// //     localStorage.setItem(cartKey, JSON.stringify(updated));
// //   };

// //   /* ---------------- QTY CONTROLS ---------------- */
// //   const increaseQty = (itemId) => {
// //     updateCart(
// //       cart.map((item) =>
// //         item.id === itemId
// //           ? {
// //               ...item,
// //               qty: item.qty + 1,
// //               totalPrice: item.unitPrice * (item.qty + 1),
// //             }
// //           : item
// //       )
// //     );
// //   };

// //   const decreaseQty = (itemId) => {
// //     updateCart(
// //       cart
// //         .map((item) =>
// //           item.id === itemId
// //             ? {
// //                 ...item,
// //                 qty: item.qty - 1,
// //                 totalPrice: item.unitPrice * (item.qty - 1),
// //               }
// //             : item
// //         )
// //         .filter((item) => item.qty > 0)
// //     );
// //   };

// //   /* ---------------- TOTALS ---------------- */
// //   const itemsTotal = cart.reduce(
// //     (sum, item) => sum + Number(item.totalPrice || 0),
// //     0
// //   );

// //   const taxAmount = 0; // backend-ready
// //   const grandTotal = itemsTotal + taxAmount;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-28">
// //       {/* HEADER */}
// //       <header className="bg-white px-4 py-4 flex items-center gap-3 border-b">
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="text-xl text-slate-700 hover:text-slate-900 transition"
// //         >
// //           ←
// //         </button>
// //         <h1 className="text-lg font-semibold text-slate-900">
// //           Checkout
// //         </h1>
// //       </header>

// //       {/* ORDER SUMMARY */}
// //       <section className="mx-4 mt-4 bg-white rounded-2xl border shadow-sm overflow-hidden">
// //         <div className="px-4 py-3 border-b">
// //           <h2 className="font-semibold text-slate-900">
// //             Order Summary
// //           </h2>
// //           <p className="text-sm text-slate-500">
// //             {cart.length} item{cart.length !== 1 && "s"}
// //           </p>
// //         </div>

// //         {cart.map((item) => {
// //           const imageSrc =
// //             item.image ||
// //             item.imageUrl ||
// //             item.photo ||
// //             item.images?.[0] ||
// //             "/placeholder-food.png";

// //           return (
// //             <div
// //               key={item.id}
// //               className="flex items-center gap-4 px-4 py-4 border-b last:border-none"
// //             >
// //               {/* IMAGE */}
// //               <img
// //                 src={imageSrc}
// //                 alt={item.name}
// //                 className="w-14 h-14 rounded-xl object-cover bg-slate-200"
// //                 onError={(e) =>
// //                   (e.currentTarget.src = "/placeholder-food.png")
// //                 }
// //               />

// //               {/* INFO */}
// //               <div className="flex-1">
// //                 <p className="font-medium text-slate-900 leading-tight">
// //                   {item.name}
// //                 </p>
// //                 <p className="text-xs text-slate-500 mt-0.5">
// //                   {item.quantityLabel || "Standard serving"}
// //                 </p>
// //               </div>

// //               {/* CONTROLS */}
// //               <div className="flex flex-col items-end gap-2">
// //                 <div className="flex items-center rounded-full border bg-white shadow-sm overflow-hidden">
// //                   {/* DECREMENT */}
// //                   <button
// //                     onClick={() => decreaseQty(item.id)}
// //                     className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
// //                   >
// //                     −
// //                   </button>

// //                   {/* QTY */}
// //                   <span className="w-8 text-center text-sm font-semibold text-slate-900">
// //                     {item.qty}
// //                   </span>

// //                   {/* INCREMENT */}
// //                   <button
// //                     onClick={() => increaseQty(item.id)}
// //                     className="w-8 h-8 flex items-center justify-center 
// //                                bg-emerald-600 text-white 
// //                                hover:bg-emerald-700 active:scale-95 
// //                                transition"
// //                   >
// //                     +
// //                   </button>
// //                 </div>

// //                 <p className="text-sm font-semibold text-slate-900">
// //                   ₹{item.totalPrice}
// //                 </p>
// //               </div>
// //             </div>
// //           );
// //         })}

// //         <button
// //           onClick={() => navigate(`/menu/${username}`)}
// //           className="w-full py-3 text-sm font-semibold text-emerald-600 border-t hover:bg-emerald-50 transition"
// //         >
// //           + Add more items
// //         </button>
// //       </section>

// //       {/* BILL DETAILS */}
// //       <section className="mx-4 mt-4 bg-white rounded-2xl border shadow-sm p-4 space-y-3">
// //         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
// //           Bill Details
// //         </h3>

// //         <div className="flex justify-between text-sm text-slate-700">
// //           <span>Items total</span>
// //           <span>₹{itemsTotal}</span>
// //         </div>

// //         <div className="flex justify-between text-sm text-slate-700">
// //           <span>Tax</span>
// //           <span>₹{taxAmount}</span>
// //         </div>

// //         <div className="border-t pt-3 flex justify-between font-semibold text-slate-900">
// //           <span>Grand Total</span>
// //           <span>₹{grandTotal}</span>
// //         </div>
// //       </section>

// //       {/* FOOTER CTA */}
// //       <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
// //         <button
// //           onClick={() => navigate(`/checkout/${username}`)}
// //           className="w-full bg-emerald-600 hover:bg-emerald-700 
// //                      text-white py-4 rounded-xl 
// //                      font-semibold text-base 
// //                      shadow-lg active:scale-[0.98] transition"
// //         >
// //           Proceed to Checkout
// //         </button>
// //       </footer>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const [cart, setCart] = useState([]);

//   /* ---------------- LOAD CART ---------------- */
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//     setCart(saved);
//   }, [cartKey]);

//   const updateCart = (updated) => {
//     setCart(updated);
//     localStorage.setItem(cartKey, JSON.stringify(updated));
//   };

//   /* ---------------- QTY CONTROLS ---------------- */
//   const increaseQty = (itemId) => {
//     updateCart(
//       cart.map((item) =>
//         item.id === itemId
//           ? {
//               ...item,
//               qty: item.qty + 1,
//               totalPrice: item.unitPrice * (item.qty + 1),
//             }
//           : item
//       )
//     );
//   };

//   const decreaseQty = (itemId) => {
//     updateCart(
//       cart
//         .map((item) =>
//           item.id === itemId
//             ? {
//                 ...item,
//                 qty: item.qty - 1,
//                 totalPrice: item.unitPrice * (item.qty - 1),
//               }
//             : item
//         )
//         .filter((item) => item.qty > 0)
//     );
//   };

//   /* ---------------- TOTALS ---------------- */
//   const itemsTotal = cart.reduce(
//     (sum, item) => sum + Number(item.totalPrice || 0),
//     0
//   );

//   const taxAmount = 0; // backend-ready
//   const grandTotal = itemsTotal + taxAmount;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-28">
//       {/* HEADER */}
//       <header className="bg-white px-4 py-4 flex items-center gap-3 border-b">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-xl text-slate-700 hover:text-slate-900 transition"
//         >
//           ←
//         </button>
//         <h1 className="text-lg font-semibold text-slate-900">
//           Checkout
//         </h1>
//       </header>

//       {/* ORDER SUMMARY */}
//       <section className="mx-4 mt-4 bg-white rounded-2xl border shadow-sm overflow-hidden">
//         <div className="px-4 py-3 border-b">
//           <h2 className="font-semibold text-slate-900">
//             Order Summary
//           </h2>
//           <p className="text-sm text-slate-500">
//             {cart.length} item{cart.length !== 1 && "s"}
//           </p>
//         </div>

//         {cart.map((item) => {
//           const imageSrc =
//             item.image ||
//             item.imageUrl ||
//             item.photo ||
//             item.images?.[0] ||
//             "/placeholder-food.png";

//           return (
//             <div
//               key={item.id}
//               className="flex items-center gap-4 px-4 py-4 border-b last:border-none"
//             >
//               {/* IMAGE */}
//               <img
//                 src={imageSrc}
//                 alt={item.name}
//                 className="w-14 h-14 rounded-xl object-cover bg-slate-200"
//                 onError={(e) =>
//                   (e.currentTarget.src = "/placeholder-food.png")
//                 }
//               />

//               {/* INFO */}
//               <div className="flex-1">
//                 <p className="font-medium text-slate-900 leading-tight">
//                   {item.name}
//                 </p>
//                 <p className="text-xs text-slate-500 mt-0.5">
//                   {item.quantityLabel || "Standard serving"}
//                 </p>
//               </div>

//               {/* CONTROLS */}
//               <div className="flex flex-col items-end gap-2">
//                 <div className="flex items-center rounded-full border bg-white shadow-sm overflow-hidden">
//                   {/* DECREMENT */}
//                   <button
//                     onClick={() => decreaseQty(item.id)}
//                     className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
//                   >
//                     −
//                   </button>

//                   {/* QTY */}
//                   <span className="w-8 text-center text-sm font-semibold text-slate-900">
//                     {item.qty}
//                   </span>

//                   {/* INCREMENT */}
//                   <button
//                     onClick={() => increaseQty(item.id)}
//                     className="w-8 h-8 flex items-center justify-center 
//                                bg-emerald-600 text-white 
//                                hover:bg-emerald-700 active:scale-95 
//                                transition"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <p className="text-sm font-semibold text-slate-900">
//                   ₹{item.totalPrice}
//                 </p>
//               </div>
//             </div>
//           );
//         })}

//         <button
//           onClick={() => navigate(`/menu/${username}`)}
//           className="w-full py-3 text-sm font-semibold text-emerald-600 border-t hover:bg-emerald-50 transition"
//         >
//           + Add more items
//         </button>
//       </section>

//       {/* BILL DETAILS */}
//       <section className="mx-4 mt-4 bg-white rounded-2xl border shadow-sm p-4 space-y-3">
//         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
//           Bill Details
//         </h3>

//         <div className="flex justify-between text-sm text-slate-700">
//           <span>Items total</span>
//           <span>₹{itemsTotal}</span>
//         </div>

//         <div className="flex justify-between text-sm text-slate-700">
//           <span>Tax</span>
//           <span>₹{taxAmount}</span>
//         </div>

//         <div className="border-t pt-3 flex justify-between font-semibold text-slate-900">
//           <span>Grand Total</span>
//           <span>₹{grandTotal}</span>
//         </div>
//       </section>

//       {/* FOOTER CTA */}
//       <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
//         <button
//           onClick={() => navigate(`/checkout/${username}`)}
//           className="w-full bg-emerald-600 hover:bg-emerald-700 
//                      text-white py-4 rounded-xl 
//                      font-semibold text-base 
//                      shadow-lg active:scale-[0.98] transition"
//         >
//           Proceed to Checkout
//         </button>
//       </footer>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const cartKey = `cart_${username}`;
  const [cart, setCart] = useState([]);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(saved);
  }, [cartKey]);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  /* ---------------- QTY CONTROLS ---------------- */
  const increaseQty = (itemId) => {
    updateCart(
      cart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              qty: item.qty + 1,
              totalPrice: item.unitPrice * (item.qty + 1),
            }
          : item
      )
    );
  };

  const decreaseQty = (itemId) => {
    updateCart(
      cart
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                qty: item.qty - 1,
                totalPrice: item.unitPrice * (item.qty - 1),
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  /* ---------------- TOTALS ---------------- */
  const itemsTotal = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0
  );

  const taxAmount = 0; // backend-ready
  const grandTotal = itemsTotal + taxAmount;

  return (
    <div className="min-h-screen bg-slate-100 pb-28">
      {/* HEADER */}
      <header className="bg-white px-4 py-4 flex items-center gap-3 border-b sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-slate-700 hover:text-slate-900 transition"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-slate-900">
          Checkout
        </h1>
      </header>

      {/* ORDER SUMMARY */}
      <section className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b bg-slate-50">
          <h2 className="font-semibold text-slate-900">
            Order Summary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {cart.length} item{cart.length !== 1 && "s"}
          </p>
        </div>

        {cart.map((item) => {
          const imageSrc =
            item.image ||
            item.imageUrl ||
            item.photo ||
            item.images?.[0] ||
            "/placeholder-food.png";

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 px-4 py-4 border-b last:border-none"
            >
              {/* IMAGE */}
              <img
                src={imageSrc}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover bg-slate-200"
                onError={(e) =>
                  (e.currentTarget.src = "/placeholder-food.png")
                }
              />

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.quantityLabel || "Standard serving"}
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center rounded-full border bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center 
                               text-slate-600 hover:bg-slate-100 transition"
                  >
                    −
                  </button>

                  <span className="w-8 text-center text-sm font-semibold text-slate-900">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center 
                               bg-emerald-600 text-white 
                               hover:bg-emerald-700 active:scale-95 transition"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  ₹{item.totalPrice}
                </p>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="w-full py-3 text-sm font-semibold 
                     text-emerald-600 border-t 
                     hover:bg-emerald-50 transition"
        >
          + Add more items
        </button>
      </section>

      {/* BILL DETAILS */}
      <section className="mx-4 mt-4 bg-white rounded-2xl shadow-sm p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Bill Details
        </h3>

        <div className="flex justify-between text-sm text-slate-700">
          <span>Items total</span>
          <span>₹{itemsTotal}</span>
        </div>

        <div className="flex justify-between text-sm text-slate-700">
          <span>Tax</span>
          <span>₹{taxAmount}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold text-slate-900">
          <span>Grand Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button
          onClick={() => navigate(`/checkout/${username}`)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 
                     text-white py-4 rounded-xl 
                     font-semibold text-base 
                     shadow-lg active:scale-[0.98] transition"
        >
          Proceed to Checkout
        </button>
      </footer>
    </div>
  );
}
