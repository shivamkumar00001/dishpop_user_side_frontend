 
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// import CartHeader from "../components/cart/CartHeader";
// import CartSummary from "../components/cart/CartSummary";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { id: username } = useParams();

//   const cartKey = `cart_${username}`;
//   const sessionKey = `session_${username}`;
//   const sessionMetaKey = `session_meta_${username}`;

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);

//   /* ---------------- LOAD CART ---------------- */
//   useEffect(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
//       setCart(Array.isArray(saved) ? saved : []);
//     } catch {
//       setCart([]);
//     }
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

//   const taxAmount = 0;
//   const grandTotal = itemsTotal + taxAmount;

//   /* ---------------- PROCEED ---------------- */
//   const handleProceed = async () => {
//     if (!cart.length || loading) return;

//     const sessionId = localStorage.getItem(sessionKey);
//     let sessionMeta = null;

//     try {
//       sessionMeta = JSON.parse(localStorage.getItem(sessionMetaKey));
//     } catch {
//       sessionMeta = null;
//     }

//     if (!sessionId) {
//       navigate(`/checkout/${username}`);
//       return;
//     }

//     if (!sessionMeta?.customerName || !sessionMeta?.tableNumber) {
//       localStorage.removeItem(sessionKey);
//       localStorage.removeItem(sessionMetaKey);
//       navigate(`/checkout/${username}`, { replace: true });
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

//       await api.post(`/api/checkout/${username}`, {
//         sessionId,
//         customerName: sessionMeta.customerName,
//         tableNumber: sessionMeta.tableNumber,
//         phoneNumber: sessionMeta.phoneNumber,
//         items,
//         grandTotal,
//       });

//       localStorage.removeItem(cartKey);
//       setCart([]);
//       navigate(`/greet/${username}`, { replace: true });
//     } catch {
//       alert("Session expired. Please start a new order.");
//       localStorage.removeItem(sessionKey);
//       localStorage.removeItem(sessionMetaKey);
//       navigate(`/checkout/${username}`, { replace: true });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- EMPTY CART ---------------- */
//   if (!cart.length) {
//     return (
//       <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4">
//         <h2 className="text-lg font-semibold text-slate-800 mb-2">
//           Your cart is empty
//         </h2>
//         <button
//           onClick={() => navigate(`/menu/${username}`)}
//           className="bg-emerald-600 text-white px-6 py-3 rounded-xl"
//         >
//           Go to Menu
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 pb-28">
//       <CartHeader onBack={() => navigate(-1)} />

//       <CartSummary
//         cart={cart}
//         itemsTotal={itemsTotal}
//         taxAmount={taxAmount}
//         grandTotal={grandTotal}
//         onAddMore={() => navigate(`/menu/${username}`)}
//         increaseQty={increaseQty}
//         decreaseQty={decreaseQty}
//       />

//       <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
//         <button
//           disabled={loading}
//           onClick={handleProceed}
//           className="w-full bg-emerald-600 text-white py-4 rounded-xl"
//         >
//           {loading ? "Placing Order..." : "Proceed"}
//         </button>
//       </footer>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

import CartHeader from "../components/cart/CartHeader";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage() {
  const navigate = useNavigate();
  const { id: username } = useParams();

  const cartKey = `cart_${username}`;
  const sessionKey = `session_${username}`;
  const sessionMetaKey = `session_meta_${username}`;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }
  }, [cartKey]);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

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

  const itemsTotal = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0
  );

  const taxAmount = 0;
  const grandTotal = itemsTotal + taxAmount;

  const handleProceed = async () => {
    if (!cart.length || loading) return;

    const sessionId = localStorage.getItem(sessionKey);
    let sessionMeta = null;

    try {
      sessionMeta = JSON.parse(localStorage.getItem(sessionMetaKey));
    } catch {
      sessionMeta = null;
    }

    if (!sessionId) {
      navigate(`/checkout/${username}`);
      return;
    }

    if (!sessionMeta?.customerName || !sessionMeta?.tableNumber) {
      localStorage.removeItem(sessionKey);
      localStorage.removeItem(sessionMetaKey);
      navigate(`/checkout/${username}`, { replace: true });
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

      await api.post(`/api/checkout/${username}`, {
        sessionId,
        customerName: sessionMeta.customerName,
        tableNumber: sessionMeta.tableNumber,
        phoneNumber: sessionMeta.phoneNumber,
        items,
        grandTotal,
        orderType: "DINE_IN",
      });

      localStorage.removeItem(cartKey);
      setCart([]);
      navigate(`/greet/${username}`, { replace: true });
    } catch {
      alert("Session expired. Please start a new order.");
      localStorage.removeItem(sessionKey);
      localStorage.removeItem(sessionMetaKey);
      navigate(`/checkout/${username}`, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate(`/menu/${username}`)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-28">
      <CartHeader onBack={() => navigate(-1)} />

      <CartSummary
        cart={cart}
        itemsTotal={itemsTotal}
        taxAmount={taxAmount}
        grandTotal={grandTotal}
        onAddMore={() => navigate(`/menu/${username}`)}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button
          disabled={loading}
          onClick={handleProceed}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl"
        >
          {loading ? "Placing Order..." : "Proceed"}
        </button>
      </footer>
    </div>
  );
}