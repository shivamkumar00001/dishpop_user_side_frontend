// src/components/orders/OrderStatusCard.jsx
import { CUSTOMER_STATUS_MAP } from "../../utils/constants/orderStatusMap";

export default function OrderStatusCard({ order, orderNumber }) {
  const status = CUSTOMER_STATUS_MAP[order.status];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6">
      {/* Status Label */}
      <div className="mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${status.color}`}>
          {status.label}
        </h3>
        <p className="text-sm text-gray-500">
          Your order is being processed
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-3 rounded-full transition-all duration-500 ${
                status.step >= step
                  ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Labels */}
      <div className="flex justify-between text-sm">
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              status.step >= 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {status.step >= 1 ? "✓" : "1"}
          </div>
          <span
            className={`font-medium ${
              status.step >= 1 ? "text-green-700" : "text-gray-500"
            }`}
          >
            Received
          </span>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              status.step >= 2
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {status.step >= 2 ? "✓" : "2"}
          </div>
          <span
            className={`font-medium ${
              status.step >= 2 ? "text-green-700" : "text-gray-500"
            }`}
          >
            Preparing
          </span>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              status.step >= 3
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {status.step >= 3 ? "✓" : "3"}
          </div>
          <span
            className={`font-medium ${
              status.step >= 3 ? "text-green-700" : "text-gray-500"
            }`}
          >
            Ready
          </span>
        </div>
      </div>

      {/* Additional Info */}
      {order.status === "completed" && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-700 text-sm font-semibold text-center">
            🎉 Your order is ready! Please collect from the counter.
          </p>
        </div>
      )}

      {order.status === "cancelled" && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-semibold text-center">
            ❌ This order has been cancelled.
          </p>
        </div>
      )}
    </div>
  );
}