import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const ordersKey = `orders_${id}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(ordersKey)) || [];

    // 🔥 Auto-delete expired orders
    const now = Date.now();
    const validOrders = saved.filter(
      (order) => order.expiresAt > now
    );

    if (validOrders.length !== saved.length) {
      localStorage.setItem(
        ordersKey,
        JSON.stringify(validOrders)
      );
    }

    setOrders(validOrders);
  }, [ordersKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          My Orders
        </h1>

        <button
          onClick={() => navigate(`/menu/${id}`)}
          className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-2.5 rounded-xl 
                   shadow-md hover:shadow-lg hover:from-slate-700 hover:to-slate-600 transition-all duration-200
                   font-semibold"
        >
          Go to Menu →
        </button>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <div className="mx-auto mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-slate-100">
            <span className="text-4xl">🍽️</span>
          </div>
          <p className="text-slate-600 text-lg font-medium">
            No previous orders found.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Your order history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-3xl shadow-md border border-slate-200 
                       hover:shadow-lg transition-shadow duration-200"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-amber-600">🧾</span>
                  Order Summary
                </h2>

                <span className="text-sm text-slate-500">
                  {new Date(order.timestamp).toLocaleString()}
                </span>
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="bg-gradient-to-br from-slate-50 to-amber-50 rounded-2xl p-4 border border-slate-200 mb-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <span>👤</span>
                  Customer Details
                </h3>

                <div className="space-y-2 text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-800">Name:</span>{" "}
                    {order.customerName}
                  </p>

                  {order.phoneNumber && (
                    <p>
                      <span className="font-semibold text-slate-800">Phone:</span>{" "}
                      {order.phoneNumber}
                    </p>
                  )}

                  <p>
                    <span className="font-semibold text-slate-800">Table:</span>{" "}
                    {order.tableNumber}
                  </p>

                  {order.description && (
                    <p>
                      <span className="font-semibold text-slate-800">Notes:</span>{" "}
                      {order.description}
                    </p>
                  )}
                </div>
              </div>

              {/* ITEMS */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-4 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <span>🍽</span>
                  Items Ordered
                </h3>

                {order.items.map((item, idx) => (
                  <div
                    key={`${item.itemId}-${idx}`}
                    className="border-b border-slate-200 last:border-none pb-3 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.name} × {item.qty}
                        </p>

                        {/* VARIANT */}
                        {item.variant && (
                          <p className="text-sm text-slate-600">
                            Variant: {item.variant.name} (₹
                            {item.variant.price})
                          </p>
                        )}

                        {/* ADDONS */}
                        {item.addons?.length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            {item.addons.map((addon) => (
                              <p
                                key={addon.id}
                                className="text-xs text-slate-600"
                              >
                                + {addon.name} (₹{addon.price})
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-amber-600 font-bold">
                        ₹{item.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="border-t border-slate-200 mt-5 pt-4 flex justify-between items-center">
                <p className="text-lg font-bold text-slate-800">
                  Total
                </p>
                <p className="text-2xl font-bold text-amber-600">
                  ₹{order.grandTotal ?? order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}