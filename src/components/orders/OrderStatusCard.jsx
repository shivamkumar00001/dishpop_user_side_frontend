// // src/components/orders/OrderStatusCard.jsx
// import { CUSTOMER_STATUS_MAP } from "../../utils/constants/orderStatusMap";

// export default function OrderStatusCard({ order, orderNumber }) {
//   const status = CUSTOMER_STATUS_MAP[order.status];

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6">
//       {/* Status Label */}
//       <div className="mb-6">
//         <h3 className={`text-2xl font-bold mb-2 ${status.color}`}>
//           {status.label}
//         </h3>
//         <p className="text-sm text-gray-500">
//           Your order is being processed
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-4">
//         <div className="flex gap-2">
//           {[1, 2, 3].map((step) => (
//             <div
//               key={step}
//               className={`flex-1 h-3 rounded-full transition-all duration-500 ${
//                 status.step >= step
//                   ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
//                   : "bg-gray-200"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Progress Labels */}
//       <div className="flex justify-between text-sm">
//         <div className="flex flex-col items-center flex-1">
//           <div
//             className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
//               status.step >= 1
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-400"
//             }`}
//           >
//             {status.step >= 1 ? "✓" : "1"}
//           </div>
//           <span
//             className={`font-medium ${
//               status.step >= 1 ? "text-green-700" : "text-gray-500"
//             }`}
//           >
//             Received
//           </span>
//         </div>

//         <div className="flex flex-col items-center flex-1">
//           <div
//             className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
//               status.step >= 2
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-400"
//             }`}
//           >
//             {status.step >= 2 ? "✓" : "2"}
//           </div>
//           <span
//             className={`font-medium ${
//               status.step >= 2 ? "text-green-700" : "text-gray-500"
//             }`}
//           >
//             Preparing
//           </span>
//         </div>

//         <div className="flex flex-col items-center flex-1">
//           <div
//             className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
//               status.step >= 3
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-400"
//             }`}
//           >
//             {status.step >= 3 ? "✓" : "3"}
//           </div>
//           <span
//             className={`font-medium ${
//               status.step >= 3 ? "text-green-700" : "text-gray-500"
//             }`}
//           >
//             Ready
//           </span>
//         </div>
//       </div>

//       {/* Additional Info */}
//       {order.status === "completed" && (
//         <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//           <p className="text-green-700 text-sm font-semibold text-center">
//             🎉 Your order is ready! Please collect from the counter.
//           </p>
//         </div>
//       )}

//       {order.status === "cancelled" && (
//         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//           <p className="text-red-700 text-sm font-semibold text-center">
//             ❌ This order has been cancelled.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }






// // src/components/orders/OrderStatusCard.jsx
// import { Clock, ChefHat, CheckCircle, XCircle, Sparkles, Package, Flame } from "lucide-react";
// import { CUSTOMER_STATUS_MAP } from "../../utils/constants/orderStatusMap";

// export default function OrderStatusCard({ order }) {
//   const status = CUSTOMER_STATUS_MAP[order.status];

//   // Status configurations
//   const statusConfig = {
//     pending: {
//       icon: Clock,
//       iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
//       textColor: "text-amber-800",
//       bgGradient: "from-amber-50 via-orange-50 to-amber-50",
//       borderColor: "border-amber-300",
//       glowColor: "shadow-amber-300/50",
//       dotColor: "bg-gradient-to-b from-amber-400 to-orange-500",
//       label: "Order Received",
//       emoji: "📝",
//       shimmer: true
//     },
//     confirmed: {
//       icon: ChefHat,
//       iconBg: "bg-gradient-to-br from-blue-400 to-cyan-500",
//       textColor: "text-blue-800",
//       bgGradient: "from-blue-50 via-cyan-50 to-blue-50",
//       borderColor: "border-blue-300",
//       glowColor: "shadow-blue-300/50",
//       dotColor: "bg-gradient-to-b from-blue-400 to-cyan-500",
//       label: "Being Prepared",
//       emoji: "👨‍🍳",
//       shimmer: true
//     },
//     completed: {
//       icon: CheckCircle,
//       iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
//       textColor: "text-green-800",
//       bgGradient: "from-green-50 via-emerald-50 to-green-50",
//       borderColor: "border-green-300",
//       glowColor: "shadow-green-300/50",
//       dotColor: "bg-gradient-to-b from-green-400 to-emerald-500",
//       label: "Ready to Serve",
//       emoji: "✅",
//       shimmer: false
//     },
//     cancelled: {
//       icon: XCircle,
//       iconBg: "bg-gradient-to-br from-red-400 to-rose-500",
//       textColor: "text-red-800",
//       bgGradient: "from-red-50 via-rose-50 to-red-50",
//       borderColor: "border-red-300",
//       glowColor: "shadow-red-300/50",
//       dotColor: "bg-gradient-to-b from-red-400 to-rose-500",
//       label: "Cancelled",
//       emoji: "❌",
//       shimmer: false
//     }
//   };

//   const currentConfig = statusConfig[order.status] || statusConfig.pending;
//   const StatusIcon = currentConfig.icon;

//   // Timeline steps
//   const steps = [
//     { 
//       key: "pending", 
//       label: "Order Placed", 
//       sublabel: "We received your order",
//       icon: Package,
//     },
//     { 
//       key: "confirmed", 
//       label: "Preparing", 
//       sublabel: "Chef is cooking your meal",
//       icon: Flame,
//     },
//     { 
//       key: "completed", 
//       label: "Ready", 
//       sublabel: "Your order is ready!",
//       icon: Sparkles,
//     }
//   ];

//   const getStepStatus = (stepKey) => {
//     const stepIndex = steps.findIndex(s => s.key === stepKey);
//     const currentIndex = steps.findIndex(s => s.key === order.status);
    
//     if (order.status === 'cancelled') return 'inactive';
//     if (stepIndex < currentIndex) return 'completed';
//     if (stepIndex === currentIndex) return 'active';
//     return 'inactive';
//   };

//   return (
//     <div className="space-y-5">
//       {/* PREMIUM STATUS BANNER */}
//       <div className="relative group">
//         {/* Glow effect */}
//         <div className={`absolute -inset-1 bg-gradient-to-r ${currentConfig.bgGradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500`}></div>
        
//         <div className={`relative bg-gradient-to-br ${currentConfig.bgGradient} rounded-3xl p-6 border-2 ${currentConfig.borderColor} shadow-xl ${currentConfig.glowColor} overflow-hidden`}>
//           {/* Shimmer effect for active orders */}
//           {currentConfig.shimmer && (
//             <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
//           )}
          
//           {/* Decorative elements */}
//           <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
//           <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          
//           <div className="relative flex items-center gap-5">
//             {/* Animated Icon */}
//             <div className="relative">
//               <div className={`absolute inset-0 ${currentConfig.iconBg} rounded-3xl blur-md opacity-50`}></div>
//               <div className={`relative w-20 h-20 ${currentConfig.iconBg} rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-6`}>
//                 <StatusIcon className="w-10 h-10 text-white" strokeWidth={2.5} />
//                 {order.status === 'confirmed' && (
//                   <div className="absolute -top-1 -right-1">
//                     <div className="relative flex h-4 w-4">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Status Text */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-3xl drop-shadow-lg">{currentConfig.emoji}</span>
//                 <h3 className={`text-2xl font-black ${currentConfig.textColor} tracking-tight`}>
//                   {currentConfig.label}
//                 </h3>
//               </div>
//               <p className="text-base text-gray-700 font-medium">
//                 {order.status === "pending" && "Your order has been confirmed"}
//                 {order.status === "confirmed" && "Our chef is preparing your delicious meal"}
//                 {order.status === "completed" && "Your meal is ready to enjoy!"}
//                 {order.status === "cancelled" && "This order was cancelled"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PREMIUM TIMELINE CARD */}
//       {order.status !== 'cancelled' ? (
//         <div className="relative bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
//             <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
//                 <Clock className="w-4 h-4 text-white" />
//               </div>
//               Order Journey
//             </h4>
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full border border-green-200">
//               <span className="text-xs font-bold text-green-700">Live Tracking</span>
//             </div>
//           </div>
          
//           <div className="relative pl-2">
//             {/* Vertical Progress Line */}
//             <div className="absolute left-7 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
//               <div 
//                 className={`w-full ${currentConfig.dotColor} transition-all duration-1000 ease-in-out shadow-lg`}
//                 style={{ 
//                   height: order.status === 'pending' ? '8%' : 
//                           order.status === 'confirmed' ? '54%' : '100%' 
//                 }}
//               ></div>
//             </div>

//             {/* Steps */}
//             <div className="space-y-8">
//               {steps.map((step, index) => {
//                 const stepStatus = getStepStatus(step.key);
//                 const StepIcon = step.icon;
                
//                 return (
//                   <div key={step.key} className="relative flex items-start gap-5">
//                     {/* Step Circle with Glow */}
//                     <div className="relative z-10 flex-shrink-0">
//                       {stepStatus === 'active' && (
//                         <div className={`absolute inset-0 ${currentConfig.iconBg} rounded-full blur-md opacity-50 animate-pulse`}></div>
//                       )}
//                       <div 
//                         className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white transition-all duration-500 shadow-lg ${
//                           stepStatus === 'completed' 
//                             ? 'bg-gradient-to-br from-green-400 to-emerald-500 scale-100' :
//                           stepStatus === 'active' 
//                             ? `${currentConfig.iconBg} scale-110 shadow-2xl` :
//                           'bg-gray-200 scale-95'
//                         }`}
//                       >
//                         {stepStatus === 'completed' ? (
//                           <CheckCircle className="w-7 h-7 text-white" strokeWidth={3} />
//                         ) : stepStatus === 'active' ? (
//                           <div className="relative">
//                             <StepIcon className="w-7 h-7 text-white" strokeWidth={2.5} />
//                             <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
//                           </div>
//                         ) : (
//                           <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Step Content */}
//                     <div className={`flex-1 pt-2 pb-2 transition-all duration-300 ${
//                       stepStatus === 'inactive' ? 'opacity-40' : 'opacity-100'
//                     }`}>
//                       <div className="flex items-start justify-between gap-3 mb-2">
//                         <h5 className={`font-bold text-lg leading-tight ${
//                           stepStatus === 'active' ? currentConfig.textColor : 
//                           stepStatus === 'completed' ? 'text-green-700' : 
//                           'text-gray-400'
//                         }`}>
//                           {step.label}
//                         </h5>
//                         {stepStatus !== 'inactive' && (
//                           <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm ${
//                             stepStatus === 'active' 
//                               ? `bg-gradient-to-r ${currentConfig.bgGradient} ${currentConfig.textColor} border-2 ${currentConfig.borderColor}` 
//                               : 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
//                           }`}>
//                             {stepStatus === 'completed' ? '✓ Completed' : '⚡ Active'}
//                           </span>
//                         )}
//                       </div>
//                       <p className={`text-sm leading-relaxed ${
//                         stepStatus === 'inactive' ? 'text-gray-400' : 'text-gray-600'
//                       }`}>
//                         {step.sublabel}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* PREMIUM CANCELLED STATE */
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-red-200 to-rose-200 rounded-3xl blur-lg opacity-25"></div>
//           <div className="relative bg-gradient-to-br from-red-50 via-rose-50 to-red-50 border-2 border-red-300 rounded-3xl p-8 text-center shadow-xl">
//             <div className="relative mb-4">
//               <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-500 rounded-full blur-xl opacity-30"></div>
//               <div className="relative w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
//                 <XCircle className="w-11 h-11 text-white" strokeWidth={2.5} />
//               </div>
//             </div>
//             <h4 className="text-2xl font-black text-red-800 mb-2">
//               Order Cancelled
//             </h4>
//             <p className="text-base text-red-600 font-medium">
//               This order has been cancelled and will not be prepared
//             </p>
//           </div>
//         </div>
//       )}

//       {/* PREMIUM COMPLETION CELEBRATION */}
//       {order.status === 'completed' && (
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
          
//           <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-3xl p-8 text-center overflow-hidden shadow-2xl">
//             {/* Animated background pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-150"></div>
//             </div>
            
//             {/* Floating sparkles */}
//             <div className="absolute inset-0 overflow-hidden">
//               {[...Array(8)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute text-3xl animate-float"
//                   style={{
//                     left: `${Math.random() * 100}%`,
//                     top: `${Math.random() * 100}%`,
//                     animationDelay: `${i * 0.2}s`,
//                     animationDuration: `${2 + Math.random() * 2}s`
//                   }}
//                 >
//                   ✨
//                 </div>
//               ))}
//             </div>
            
//             <div className="relative">
//               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform">
//                 <span className="text-5xl">🎉</span>
//               </div>
//               <h4 className="text-2xl font-black text-white mb-3 drop-shadow-lg">
//                 Your Order is Ready!
//               </h4>
//               <p className="text-lg text-green-50 font-semibold mb-4">
//                 Please collect your order from the counter
//               </p>
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
//                 <Sparkles className="w-5 h-5 text-yellow-300" />
//                 <span className="text-white font-bold">Enjoy your meal!</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* PREMIUM ITEMS CARD */}
//       {order.items && order.items.length > 0 && (
//         <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
//           <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
//                 <Package className="w-4 h-4 text-white" />
//               </div>
//               <span>Your Items</span>
//             </div>
//             <span className="text-sm bg-white px-3 py-1 rounded-full border border-gray-300 font-bold text-gray-700">
//               {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
//             </span>
//           </h4>
//           <div className="space-y-3">
//             {order.items.slice(0, 3).map((item, idx) => (
//               <div key={idx} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex-shrink-0 shadow-sm"></div>
//                 <span className="text-base font-semibold text-gray-900 flex-1 truncate">
//                   {item.name}
//                 </span>
//                 <span className="text-base font-black text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
//                   ×{item.quantity}
//                 </span>
//               </div>
//             ))}
//             {order.items.length > 3 && (
//               <div className="text-center pt-2">
//                 <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-300 inline-block">
//                   +{order.items.length - 3} more {order.items.length - 3 === 1 ? 'item' : 'items'}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes shimmer {
//           100% {
//             transform: translateX(100%);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) rotate(0deg);
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100px) rotate(180deg);
//             opacity: 0;
//           }
//         }
        
//         .animate-shimmer {
//           animation: shimmer 3s infinite;
//         }
        
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }







// src/components/orders/OrderStatusCard.jsx
import { Clock, ChefHat, CheckCircle, XCircle, Sparkles, Package, Flame, Truck, User, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { CUSTOMER_STATUS_MAP } from "../../utils/constants/orderStatusMap";

export default function OrderStatusCard({ order }) {
  const status = CUSTOMER_STATUS_MAP[order.status];

  // Status configurations
  const statusConfig = {
    pending: {
      icon: Clock,
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      textColor: "text-amber-800",
      bgGradient: "from-amber-50 via-orange-50 to-amber-50",
      borderColor: "border-amber-300",
      glowColor: "shadow-amber-300/50",
      dotColor: "bg-gradient-to-b from-amber-400 to-orange-500",
      label: "Order Received",
      emoji: "📝",
      shimmer: true
    },
    confirmed: {
      icon: ChefHat,
      iconBg: "bg-gradient-to-br from-blue-400 to-cyan-500",
      textColor: "text-blue-800",
      bgGradient: "from-blue-50 via-cyan-50 to-blue-50",
      borderColor: "border-blue-300",
      glowColor: "shadow-blue-300/50",
      dotColor: "bg-gradient-to-b from-blue-400 to-cyan-500",
      label: "Being Prepared",
      emoji: "👨‍🍳",
      shimmer: true
    },
    completed: {
      icon: CheckCircle,
      iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
      textColor: "text-green-800",
      bgGradient: "from-green-50 via-emerald-50 to-green-50",
      borderColor: "border-green-300",
      glowColor: "shadow-green-300/50",
      dotColor: "bg-gradient-to-b from-green-400 to-emerald-500",
      label: "Ready to Serve",
      emoji: "✅",
      shimmer: false
    },
    cancelled: {
      icon: XCircle,
      iconBg: "bg-gradient-to-br from-red-400 to-rose-500",
      textColor: "text-red-800",
      bgGradient: "from-red-50 via-rose-50 to-red-50",
      borderColor: "border-red-300",
      glowColor: "shadow-red-300/50",
      dotColor: "bg-gradient-to-b from-red-400 to-rose-500",
      label: "Cancelled",
      emoji: "❌",
      shimmer: false
    }
  };

  // Delivery status configurations
  const deliveryStatusConfig = {
    not_assigned: {
      icon: Clock,
      iconBg: "bg-gradient-to-br from-gray-400 to-gray-500",
      textColor: "text-gray-800",
      bgGradient: "from-gray-50 via-slate-50 to-gray-50",
      borderColor: "border-gray-300",
      label: "Awaiting Assignment",
      emoji: "⏳",
      description: "Looking for a delivery partner"
    },
    assigned: {
      icon: User,
      iconBg: "bg-gradient-to-br from-purple-400 to-violet-500",
      textColor: "text-purple-800",
      bgGradient: "from-purple-50 via-violet-50 to-purple-50",
      borderColor: "border-purple-300",
      label: "Delivery Partner Assigned",
      emoji: "👤",
      description: "Preparing to pick up your order"
    },
    out_for_delivery: {
      icon: Truck,
      iconBg: "bg-gradient-to-br from-indigo-400 to-blue-500",
      textColor: "text-indigo-800",
      bgGradient: "from-indigo-50 via-blue-50 to-indigo-50",
      borderColor: "border-indigo-300",
      label: "Out for Delivery",
      emoji: "🚚",
      description: "Your order is on the way",
      shimmer: true
    },
    delivered: {
      icon: CheckCircle2,
      iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
      textColor: "text-green-800",
      bgGradient: "from-green-50 via-emerald-50 to-green-50",
      borderColor: "border-green-300",
      label: "Delivered",
      emoji: "✅",
      description: "Order delivered successfully"
    }
  };

  const currentConfig = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = currentConfig.icon;

  // Timeline steps
  const steps = [
    { 
      key: "pending", 
      label: "Order Placed", 
      sublabel: "We received your order",
      icon: Package,
    },
    { 
      key: "confirmed", 
      label: "Preparing", 
      sublabel: "Chef is cooking your meal",
      icon: Flame,
    },
    { 
      key: "completed", 
      label: "Ready", 
      sublabel: order.orderType === "ONLINE" ? "Food is ready for pickup" : "Your order is ready!",
      icon: Sparkles,
    }
  ];

  const getStepStatus = (stepKey) => {
    const stepIndex = steps.findIndex(s => s.key === stepKey);
    const currentIndex = steps.findIndex(s => s.key === order.status);
    
    if (order.status === 'cancelled') return 'inactive';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'inactive';
  };

  // Delivery timeline steps
  const deliverySteps = [
    {
      key: "not_assigned",
      label: "Finding Partner",
      sublabel: "Searching for delivery partner",
      icon: Clock
    },
    {
      key: "assigned",
      label: "Partner Assigned",
      sublabel: "Getting ready to pick up",
      icon: User
    },
    {
      key: "out_for_delivery",
      label: "On the Way",
      sublabel: "Delivering to your location",
      icon: Truck
    },
    {
      key: "delivered",
      label: "Delivered",
      sublabel: "Enjoy your meal!",
      icon: CheckCircle2
    }
  ];

  const getDeliveryStepStatus = (stepKey) => {
    if (!order.delivery) return 'inactive';
    
    const stepIndex = deliverySteps.findIndex(s => s.key === stepKey);
    const currentIndex = deliverySteps.findIndex(s => s.key === order.delivery.status);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'inactive';
  };

  const currentDeliveryConfig = order.delivery 
    ? deliveryStatusConfig[order.delivery.status] || deliveryStatusConfig.not_assigned
    : null;

  return (
    <div className="space-y-5">
      {/* PREMIUM STATUS BANNER */}
      <div className="relative group">
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${currentConfig.bgGradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500`}></div>
        
        <div className={`relative bg-gradient-to-br ${currentConfig.bgGradient} rounded-3xl p-6 border-2 ${currentConfig.borderColor} shadow-xl ${currentConfig.glowColor} overflow-hidden`}>
          {/* Shimmer effect for active orders */}
          {currentConfig.shimmer && (
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          )}
          
          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          
          <div className="relative flex items-center gap-5">
            {/* Animated Icon */}
            <div className="relative">
              <div className={`absolute inset-0 ${currentConfig.iconBg} rounded-3xl blur-md opacity-50`}></div>
              <div className={`relative w-20 h-20 ${currentConfig.iconBg} rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-6`}>
                <StatusIcon className="w-10 h-10 text-white" strokeWidth={2.5} />
                {order.status === 'confirmed' && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Status Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl drop-shadow-lg">{currentConfig.emoji}</span>
                <h3 className={`text-2xl font-black ${currentConfig.textColor} tracking-tight`}>
                  {currentConfig.label}
                </h3>
              </div>
              <p className="text-base text-gray-700 font-medium">
                {order.status === "pending" && "Your order has been confirmed"}
                {order.status === "confirmed" && "Our chef is preparing your delicious meal"}
                {order.status === "completed" && (order.orderType === "ONLINE" ? "Your meal is ready for delivery!" : "Your meal is ready to enjoy!")}
                {order.status === "cancelled" && "This order was cancelled"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM TIMELINE CARD - PREPARATION */}
      {order.status !== 'cancelled' && (
        <div className="relative bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
            <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              {order.orderType === "ONLINE" ? "Preparation Status" : "Order Journey"}
            </h4>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="text-xs font-bold text-green-700">Live Tracking</span>
            </div>
          </div>
          
          <div className="relative pl-2">
            {/* Vertical Progress Line */}
            <div className="absolute left-7 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`w-full ${currentConfig.dotColor} transition-all duration-1000 ease-in-out shadow-lg`}
                style={{ 
                  height: order.status === 'pending' ? '8%' : 
                          order.status === 'confirmed' ? '54%' : '100%' 
                }}
              ></div>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const stepStatus = getStepStatus(step.key);
                const StepIcon = step.icon;
                
                return (
                  <div key={step.key} className="relative flex items-start gap-5">
                    {/* Step Circle with Glow */}
                    <div className="relative z-10 flex-shrink-0">
                      {stepStatus === 'active' && (
                        <div className={`absolute inset-0 ${currentConfig.iconBg} rounded-full blur-md opacity-50 animate-pulse`}></div>
                      )}
                      <div 
                        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white transition-all duration-500 shadow-lg ${
                          stepStatus === 'completed' 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500 scale-100' :
                          stepStatus === 'active' 
                            ? `${currentConfig.iconBg} scale-110 shadow-2xl` :
                          'bg-gray-200 scale-95'
                        }`}
                      >
                        {stepStatus === 'completed' ? (
                          <CheckCircle className="w-7 h-7 text-white" strokeWidth={3} />
                        ) : stepStatus === 'active' ? (
                          <div className="relative">
                            <StepIcon className="w-7 h-7 text-white" strokeWidth={2.5} />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className={`flex-1 pt-2 pb-2 transition-all duration-300 ${
                      stepStatus === 'inactive' ? 'opacity-40' : 'opacity-100'
                    }`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h5 className={`font-bold text-lg leading-tight ${
                          stepStatus === 'active' ? currentConfig.textColor : 
                          stepStatus === 'completed' ? 'text-green-700' : 
                          'text-gray-400'
                        }`}>
                          {step.label}
                        </h5>
                        {stepStatus !== 'inactive' && (
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm ${
                            stepStatus === 'active' 
                              ? `bg-gradient-to-r ${currentConfig.bgGradient} ${currentConfig.textColor} border-2 ${currentConfig.borderColor}` 
                              : 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
                          }`}>
                            {stepStatus === 'completed' ? '✓ Completed' : '⚡ Active'}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        stepStatus === 'inactive' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {step.sublabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DELIVERY TRACKING SECTION - ONLINE ORDERS ONLY */}
      {order.orderType === "ONLINE" && order.status === 'completed' && order.delivery && (
        <div className="relative bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
            <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              Delivery Tracking
            </h4>
            {order.delivery.status === 'out_for_delivery' && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-3 py-1.5 rounded-full border border-indigo-200">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  Live
                </span>
              </div>
            )}
          </div>

          {/* Delivery Partner Info - Show when assigned or out for delivery */}
          {(order.delivery.status === 'assigned' || order.delivery.status === 'out_for_delivery') && 
           order.delivery.boyName && (
            <div className="mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-indigo-200">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <User className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-indigo-600 mb-1">Your Delivery Partner</p>
                      <h5 className="text-lg font-black text-indigo-900 mb-2">{order.delivery.boyName}</h5>
                      {order.delivery.boyPhone && (
                        <a 
                          href={`tel:${order.delivery.boyPhone}`}
                          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-indigo-300 hover:border-indigo-400 transition-all shadow-sm hover:shadow-md group"
                        >
                          <Phone className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-indigo-700">{order.delivery.boyPhone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Timeline */}
          <div className="relative pl-2">
            {/* Vertical Progress Line */}
            <div className="absolute left-7 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="w-full bg-gradient-to-b from-indigo-400 to-blue-500 transition-all duration-1000 ease-in-out shadow-lg"
                style={{ 
                  height: order.delivery.status === 'not_assigned' ? '8%' : 
                          order.delivery.status === 'assigned' ? '38%' : 
                          order.delivery.status === 'out_for_delivery' ? '71%' : '100%' 
                }}
              ></div>
            </div>

            {/* Delivery Steps */}
            <div className="space-y-8">
              {deliverySteps.map((step) => {
                const stepStatus = getDeliveryStepStatus(step.key);
                const StepIcon = step.icon;
                
                return (
                  <div key={step.key} className="relative flex items-start gap-5">
                    {/* Step Circle with Glow */}
                    <div className="relative z-10 flex-shrink-0">
                      {stepStatus === 'active' && currentDeliveryConfig?.shimmer && (
                        <div className={`absolute inset-0 ${currentDeliveryConfig.iconBg} rounded-full blur-md opacity-50 animate-pulse`}></div>
                      )}
                      <div 
                        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white transition-all duration-500 shadow-lg ${
                          stepStatus === 'completed' 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500 scale-100' :
                          stepStatus === 'active' 
                            ? `${currentDeliveryConfig?.iconBg || 'bg-gray-400'} scale-110 shadow-2xl` :
                          'bg-gray-200 scale-95'
                        }`}
                      >
                        {stepStatus === 'completed' ? (
                          <CheckCircle className="w-7 h-7 text-white" strokeWidth={3} />
                        ) : stepStatus === 'active' ? (
                          <div className="relative">
                            <StepIcon className="w-7 h-7 text-white" strokeWidth={2.5} />
                            {step.key === 'out_for_delivery' && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                            )}
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className={`flex-1 pt-2 pb-2 transition-all duration-300 ${
                      stepStatus === 'inactive' ? 'opacity-40' : 'opacity-100'
                    }`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h5 className={`font-bold text-lg leading-tight ${
                          stepStatus === 'active' ? currentDeliveryConfig?.textColor || 'text-gray-800' : 
                          stepStatus === 'completed' ? 'text-green-700' : 
                          'text-gray-400'
                        }`}>
                          {step.label}
                        </h5>
                        {stepStatus !== 'inactive' && (
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm ${
                            stepStatus === 'active' 
                              ? `bg-gradient-to-r ${currentDeliveryConfig?.bgGradient || 'from-gray-50 to-gray-100'} ${currentDeliveryConfig?.textColor || 'text-gray-800'} border-2 ${currentDeliveryConfig?.borderColor || 'border-gray-300'}` 
                              : 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
                          }`}>
                            {stepStatus === 'completed' ? '✓ Completed' : '⚡ Active'}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        stepStatus === 'inactive' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {step.sublabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DELIVERY SUCCESS CELEBRATION - ONLINE ORDERS ONLY */}
      {order.orderType === "ONLINE" && order.delivery?.status === 'delivered' && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-3xl p-8 text-center overflow-hidden shadow-2xl">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-150"></div>
            </div>
            
            {/* Floating sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-3xl animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform">
                <span className="text-5xl">🎉</span>
              </div>
              <h4 className="text-2xl font-black text-white mb-3 drop-shadow-lg">
                Order Delivered Successfully!
              </h4>
              <p className="text-lg text-green-50 font-semibold mb-4">
                We hope you enjoy your meal
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">Thank you for ordering!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CANCELLED STATE */}
      {order.status === 'cancelled' && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-200 to-rose-200 rounded-3xl blur-lg opacity-25"></div>
          <div className="relative bg-gradient-to-br from-red-50 via-rose-50 to-red-50 border-2 border-red-300 rounded-3xl p-8 text-center shadow-xl">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-500 rounded-full blur-xl opacity-30"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <XCircle className="w-11 h-11 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h4 className="text-2xl font-black text-red-800 mb-2">
              Order Cancelled
            </h4>
            <p className="text-base text-red-600 font-medium">
              This order has been cancelled and will not be {order.orderType === "ONLINE" ? "delivered" : "prepared"}
            </p>
          </div>
        </div>
      )}

      {/* DINE-IN COMPLETION CELEBRATION */}
      {order.orderType === "DINE_IN" && order.status === 'completed' && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-3xl p-8 text-center overflow-hidden shadow-2xl">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-150"></div>
            </div>
            
            {/* Floating sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-3xl animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform">
                <span className="text-5xl">🎉</span>
              </div>
              <h4 className="text-2xl font-black text-white mb-3 drop-shadow-lg">
                Your Order is Ready!
              </h4>
              <p className="text-lg text-green-50 font-semibold mb-4">
                Please collect your order from the counter
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/40">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">Enjoy your meal!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM ITEMS CARD */}
      {order.items && order.items.length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
          <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span>Your Items</span>
            </div>
            <span className="text-sm bg-white px-3 py-1 rounded-full border border-gray-300 font-bold text-gray-700">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </span>
          </h4>
          <div className="space-y-3">
            {order.items.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex-shrink-0 shadow-sm"></div>
                <span className="text-base font-semibold text-gray-900 flex-1 truncate">
                  {item.name}
                </span>
                <span className="text-base font-black text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                  ×{item.quantity}
                </span>
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="text-center pt-2">
                <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-300 inline-block">
                  +{order.items.length - 3} more {order.items.length - 3 === 1 ? 'item' : 'items'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}