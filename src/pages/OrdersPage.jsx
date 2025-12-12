import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("orders")) || [];

    // 🔥 Auto-delete expired orders
    const now = Date.now();
    const validOrders = saved.filter(order => order.expiresAt > now);

    // If any orders expired, update localStorage
    if (validOrders.length !== saved.length) {
      localStorage.setItem("orders", JSON.stringify(validOrders));
    }

    const Set = ()=>{
      setOrders(validOrders);
    }
    Set();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-green-800">My Orders</h1>

        <button
          onClick={() => navigate(`/menu/${params.id}`)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition flex items-center gap-1"
        >
          Go to Menu →
        </button>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg">No previous orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-3xl shadow-md border border-green-100 transition hover:shadow-lg"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
                  🧾 Order Summary
                </h2>

                <span className="text-sm text-gray-500">
                  {new Date(order.timestamp).toLocaleString()}
                </span>
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="bg-green-100 rounded-2xl p-4 border border-green-200 mb-5">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  👤 Customer Details
                </h3>

                <div className="space-y-1 text-gray-700">
                  <p>
                    <span className="font-semibold text-green-900">Name:</span>{" "}
                    {order.customerName}
                  </p>

                  <p>
                    <span className="font-semibold text-green-900">Phone:</span>{" "}
                    {order.phoneNumber}
                  </p>

                  <p>
                    <span className="font-semibold text-green-900">Table:</span>{" "}
                    {order.tableNumber}
                  </p>

                  {order.description && (
                    <p>
                      <span className="font-semibold text-green-900">Notes:</span>{" "}
                      {order.description}
                    </p>
                  )}
                </div>
              </div>

              {/* ITEMS LIST */}
              <div className="bg-green-50 rounded-2xl p-4 space-y-3 border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🍽 Items Ordered
                </h3>

                {order.items.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="text-green-900 font-semibold">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.qty}</p>
                    </div>

                    <p className="text-green-700 font-bold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL SECTION */}
              <div className="border-t mt-5 pt-4 flex justify-between items-center">
                <p className="text-lg font-bold text-green-800">Total</p>
                <p className="text-xl font-extrabold text-green-700">
                  ₹{order.totalAmount}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
