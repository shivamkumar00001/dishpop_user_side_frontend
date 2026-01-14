// src/utils/constants/orderStatusMap.js
export const CUSTOMER_STATUS_MAP = {
  pending: {
    label: "Order Received",
    step: 1,
    color: "text-yellow-400",
  },
  confirmed: {
    label: "Preparing",
    step: 2,
    color: "text-cyan-400",
  },
  completed: {
    label: "Prepared",
    step: 3,
    color: "text-green-400",
  },
  cancelled: {
    label: "Cancelled",
    step: -1,
    color: "text-red-400",
  },
};
