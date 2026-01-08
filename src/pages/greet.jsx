// // src/pages/Greet.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// export default function Greet() {
//   const navigate = useNavigate();
//   const params = useParams();

//   useEffect(() => {
//     localStorage.removeItem("cart");
//   }, []);

//   // review states
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [review, setReview] = useState("");
//   const [userName, setUserName] = useState(""); 
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const submitReview = async () => {
//     if (!rating) return alert("Please select a rating (1-5)");

//     setLoading(true);

//     try {
//       await api.post(`/api/review/${params.id}`, {
//         rating,
//         review,
//         userName, // ⭐ SEND USERNAME TO BACKEND
//       });

//       setSubmitted(true);
//     } catch (err) {
//       console.error("Error submitting review:", err);
//       alert("Failed to submit review. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-slate-50 via-white to-amber-50">

//       {/* SUCCESS ICON */}
//       <div className="relative mb-4 mt-4 flex justify-center">
//         <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full 
//                       flex items-center justify-center shadow-xl animate-bounce-slow overflow-hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-scaleTick"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="3"
//           >
//             <path d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//       </div>

//       {/* TEXT */}
//       <h1 className="text-3xl font-bold text-slate-800 text-center animate-fadeIn">
//         Thank You! 🎉
//       </h1>

//       <p className="text-lg text-slate-600 max-w-md text-center mt-3 animate-fadeIn delay-200">
//         Your order has been successfully placed.  
//         Our team is preparing your delicious food 🍽️  
//         We'll serve it shortly!
//       </p>

//       {/* Order more */}
//       <button
//         onClick={() => navigate(`/${params.id}`)}
//         className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-3 rounded-full 
//                  text-lg font-bold shadow-lg hover:from-slate-700 hover:to-slate-600
//                  hover:shadow-xl active:scale-95 transition-all animate-fadeIn delay-400"
//       >
//         Order More
//       </button>

//       {/* REVIEW SECTION */}
//       <div className="mt-10 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-slate-200 animate-fadeIn delay-400">

//         {!submitted ? (
//           <>
//             <h2 className="text-xl font-bold text-slate-800 text-center mb-2">Rate Your Experience</h2>

//             {/* USERNAME FIELD */}
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Your Name (optional)"
//               className="mt-3 w-full p-3 border-2 border-slate-200 rounded-lg 
//                        focus:ring-2 focus:ring-amber-400 focus:border-amber-400
//                        transition-all duration-200"
//             />

//             {/* Stars */}
//             <div className="flex justify-center mt-4">
//               {[1, 2, 3, 4, 5].map((s) => (
//                 <button
//                   key={s}
//                   type="button"
//                   onClick={() => setRating(s)}
//                   onMouseEnter={() => setHover(s)}
//                   onMouseLeave={() => setHover(0)}
//                   className="text-3xl px-1 focus:outline-none transform transition-transform hover:scale-110"
//                 >
//                   <span className={(s <= (hover || rating)) ? "text-amber-500 drop-shadow" : "text-slate-300"}>
//                     ★
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* Review Textarea */}
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               className="mt-4 w-full p-3 border-2 border-slate-200 rounded-lg 
//                        focus:ring-2 focus:ring-amber-400 focus:border-amber-400
//                        transition-all duration-200"
//               rows="3"
//               placeholder="Write your review (optional)"
//             />

//             {/* Buttons */}
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={submitReview}
//                 disabled={loading}
//                 className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
//                   loading
//                     ? "bg-slate-300 text-slate-500 cursor-not-allowed"
//                     : "bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600 shadow-md hover:shadow-lg"
//                 }`}
//               >
//                 {loading ? "Submitting..." : "Submit Review"}
//               </button>

//               <button
//                 onClick={() => {
//                   setRating(0);
//                   setReview("");
//                   setUserName("");
//                 }}
//                 className="px-4 py-2.5 rounded-lg border-2 border-slate-200 text-slate-700 
//                          hover:bg-slate-50 transition-all duration-200 font-semibold"
//               >
//                 Clear
//               </button>
//             </div>
//           </>
//         ) : (
//           // AFTER SUBMISSION UI
//           <div className="flex flex-col items-center animate-fadeIn">
//             <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-10 h-10"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M5 13l4 4L19 7" />
//               </svg>
//             </div>

//             <h3 className="text-lg font-bold text-slate-800">Thanks for your review!</h3>
//             <p className="text-slate-600 text-center mt-1">
//               Your feedback helps this restaurant improve 🍽️💚
//             </p>
//           </div>
//         )}
//       </div>

//       {/* View All Reviews Link */}
//       <button
//         onClick={() => navigate(`/reviews/${params.id}`)}
//         className="mt-3 text-amber-600 font-semibold underline hover:text-amber-700 transition-colors"
//       >
//         View All Reviews
//       </button>

//       {/* FOOTER */}
//       <p className="text-slate-500 text-sm mt-6 animate-fadeIn delay-600">
//         © 2025 DishPop — Serving Happiness 💚
//       </p>

//       {/* Animations */}
//       <style>{`
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
//         .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-400 { animation-delay: 0.4s; }
//         .delay-600 { animation-delay: 0.6s; }

//         @keyframes scaleTick { 0% { transform: scale(0.8); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
//         .animate-scaleTick { animation: scaleTick 0.6s ease-out forwards; }

//         @keyframes bounceSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
//         .animate-bounce-slow { animation: bounceSlow 1.8s ease-in-out infinite; }
//       `}</style>

//     </div>
//   );
// }
// src/pages/Greet.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../lib/api";

// export default function Greet() {
//   const navigate = useNavigate();
//   const params = useParams();

//   useEffect(() => {
//     localStorage.removeItem("cart");
//   }, []);

//   /* ---------------- REVIEW STATES ---------------- */
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [review, setReview] = useState("");
//   const [userName, setUserName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const submitReview = async () => {
//     if (!rating) return alert("Please select a rating (1-5)");

//     setLoading(true);
//     try {
//       await api.post(`/api/review/${params.id}`, {
//         rating,
//         review,
//         userName,
//       });
//       setSubmitted(true);
//     } catch (err) {
//       alert("Failed to submit review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center px-6 py-10
//                     bg-gradient-to-br from-emerald-50 via-white to-emerald-100">

//       {/* SUCCESS ICON */}
//       <div className="relative mb-4 flex justify-center">
//         <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 
//                         rounded-full flex items-center justify-center 
//                         shadow-xl animate-bounce-slow">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-12 h-12 text-white animate-scaleTick"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="3"
//           >
//             <path d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//       </div>

//       {/* TEXT */}
//       <h1 className="text-3xl font-bold text-emerald-900 text-center animate-fadeIn">
//         Order Placed Successfully 🎉
//       </h1>

//       <p className="text-base text-emerald-700 max-w-md text-center mt-3 animate-fadeIn delay-200">
//         Thank you for ordering with us.  
//         Your food is being freshly prepared 🍽️  
//         We’ll serve it at your table shortly.
//       </p>

//       {/* ORDER MORE */}
//       <button
//         onClick={() => navigate(`/${params.id}`)}
//         className="mt-8 bg-emerald-600 hover:bg-emerald-700 
//                    text-white px-8 py-3 rounded-full 
//                    text-lg font-semibold shadow-lg
//                    active:scale-95 transition-all animate-fadeIn delay-400"
//       >
//         Order More
//       </button>

//       {/* REVIEW CARD */}
//       <div className="mt-10 w-full max-w-md bg-white p-6 rounded-3xl 
//                       shadow-lg border border-emerald-200 animate-fadeIn delay-400">

//         {!submitted ? (
//           <>
//             <h2 className="text-xl font-semibold text-emerald-900 text-center mb-3">
//               Rate Your Experience
//             </h2>

//             {/* NAME */}
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Your Name (optional)"
//               className="w-full p-3 border border-emerald-300 rounded-xl 
//                          focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
//                          transition"
//             />

//             {/* STARS */}
//             <div className="flex justify-center mt-4">
//               {[1, 2, 3, 4, 5].map((s) => (
//                 <button
//                   key={s}
//                   type="button"
//                   onClick={() => setRating(s)}
//                   onMouseEnter={() => setHover(s)}
//                   onMouseLeave={() => setHover(0)}
//                   className="text-3xl px-1 transition-transform hover:scale-110"
//                 >
//                   <span
//                     className={
//                       s <= (hover || rating)
//                         ? "text-emerald-500 drop-shadow"
//                         : "text-emerald-200"
//                     }
//                   >
//                     ★
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* REVIEW */}
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               rows="3"
//               placeholder="Write your review (optional)"
//               className="mt-4 w-full p-3 border border-emerald-300 rounded-xl 
//                          focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
//                          transition resize-none"
//             />

//             {/* BUTTONS */}
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={submitReview}
//                 disabled={loading}
//                 className={`flex-1 py-3 rounded-xl font-semibold transition ${
//                   loading
//                     ? "bg-emerald-200 text-emerald-400 cursor-not-allowed"
//                     : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
//                 }`}
//               >
//                 {loading ? "Submitting..." : "Submit Review"}
//               </button>

//               <button
//                 onClick={() => {
//                   setRating(0);
//                   setReview("");
//                   setUserName("");
//                 }}
//                 className="px-4 py-3 rounded-xl border border-emerald-300 
//                            text-emerald-700 hover:bg-emerald-50 transition font-semibold"
//               >
//                 Clear
//               </button>
//             </div>
//           </>
//         ) : (
//           /* AFTER SUBMISSION */
//           <div className="flex flex-col items-center animate-fadeIn">
//             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 
//                             rounded-full flex items-center justify-center mb-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-10 h-10"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M5 13l4 4L19 7" />
//               </svg>
//             </div>

//             <h3 className="text-lg font-semibold text-emerald-900">
//               Thanks for your review!
//             </h3>
//             <p className="text-emerald-700 text-center mt-1">
//               Your feedback helps us serve you better 💚
//             </p>
//           </div>
//         )}
//       </div>

//       {/* VIEW REVIEWS */}
//       <button
//         onClick={() => navigate(`/reviews/${params.id}`)}
//         className="mt-4 text-emerald-700 font-semibold underline hover:text-emerald-800 transition"
//       >
//         View All Reviews
//       </button>

//       {/* FOOTER */}
//       <p className="text-emerald-600 text-sm mt-8 animate-fadeIn delay-600">
//         © 2025 DishPop — Serving Happiness 💚
//       </p>

//       {/* ANIMATIONS */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-400 { animation-delay: 0.4s; }
//         .delay-600 { animation-delay: 0.6s; }

//         @keyframes scaleTick {
//           0% { transform: scale(0.8); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
//         .animate-scaleTick { animation: scaleTick 0.6s ease-out forwards; }

//         @keyframes bounceSlow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//         }
//         .animate-bounce-slow {
//           animation: bounceSlow 1.8s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

export default function Greet() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  /* ---------------- REVIEW STATES ---------------- */
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitReview = async () => {
    if (!rating) return alert("Please select a rating (1-5)");

    setLoading(true);
    try {
      await api.post(`/api/review/${params.id}`, {
        rating,
        review,
        userName,
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-6 py-12 md:py-16
                    bg-gradient-to-br from-gray-50 via-white to-green-50">

      {/* SUCCESS ICON */}
      <div className="relative mb-6 flex justify-center">
        <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-green-500 to-green-600 
                        rounded-full flex items-center justify-center 
                        shadow-2xl animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 md:w-16 md:h-16 text-white animate-scaleTick"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-60 animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-300 rounded-full opacity-60 animate-ping delay-200" />
      </div>

      {/* TEXT */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center animate-fadeIn">
        Order Placed Successfully! 🎉
      </h1>

      <p className="text-base md:text-lg text-gray-600 max-w-lg text-center mt-4 animate-fadeIn delay-200 leading-relaxed">
        Thank you for ordering with us.  
        Your food is being freshly prepared in our kitchen 🍽️  
        We'll serve it at your table shortly!
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fadeIn delay-400">
        <button
          onClick={() => navigate(`/${params.id}`)}
          className="bg-green-600 hover:bg-green-700 
                     text-white px-8 py-4 rounded-xl 
                     text-base font-bold shadow-lg hover:shadow-xl
                     active:scale-95 transition-all duration-200"
        >
          Order More Items
        </button>
        
        <button
          onClick={() => navigate(`/orders/${params.id}`)}
          className="bg-white hover:bg-gray-50 border-2 border-gray-300
                     text-gray-700 px-8 py-4 rounded-xl 
                     text-base font-bold shadow-md hover:shadow-lg
                     active:scale-95 transition-all duration-200"
        >
          View My Orders
        </button>
      </div>

      {/* REVIEW CARD */}
      <div className="mt-12 w-full max-w-xl bg-white p-6 md:p-8 rounded-2xl 
                      shadow-lg hover:shadow-xl transition-shadow border border-gray-200 animate-fadeIn delay-500">

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Rate Your Experience
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Your feedback helps us improve our service
            </p>

            {/* NAME */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name (optional)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500
                         hover:border-gray-400 transition-colors outline-none"
            />

            {/* STARS */}
            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                  className="text-4xl transition-transform hover:scale-125 active:scale-110"
                >
                  <span
                    className={
                      s <= (hover || rating)
                        ? "text-yellow-400 drop-shadow-lg"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-center text-sm font-semibold text-gray-700 mt-2">
                {rating === 5 && "Excellent! 🌟"}
                {rating === 4 && "Great! 😊"}
                {rating === 3 && "Good 👍"}
                {rating === 2 && "Okay 😐"}
                {rating === 1 && "Needs Improvement 😔"}
              </p>
            )}

            {/* REVIEW */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              placeholder="Share your experience with us (optional)"
              className="mt-5 w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500
                         hover:border-gray-400 transition-colors resize-none outline-none"
            />

            {/* BUTTONS */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={submitReview}
                disabled={loading}
                className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl active:scale-95"
                }`}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>

              <button
                onClick={() => {
                  setRating(0);
                  setReview("");
                  setUserName("");
                }}
                className="px-6 py-4 rounded-xl border-2 border-gray-300 
                           text-gray-700 hover:bg-gray-50 hover:border-gray-400 
                           transition-all font-bold active:scale-95"
              >
                Clear
              </button>
            </div>
          </>
        ) : (
          /* AFTER SUBMISSION */
          <div className="flex flex-col items-center py-4 animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 text-green-600 
                            rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You! 🙏
            </h3>
            <p className="text-gray-600 text-center max-w-sm leading-relaxed">
              Your feedback has been submitted successfully. We appreciate you taking the time to share your experience with us! 💚
            </p>
          </div>
        )}
      </div>

      {/* VIEW REVIEWS */}
      <button
        onClick={() => navigate(`/reviews/${params.id}`)}
        className="mt-6 text-green-600 font-bold text-base underline hover:text-green-700 
                   transition-colors animate-fadeIn delay-600"
      >
        View All Customer Reviews →
      </button>

      {/* FOOTER */}
      <div className="mt-12 text-center animate-fadeIn delay-700">
        <p className="text-gray-500 text-sm">
          Powered by <span className="font-bold text-gray-700">DishPop</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { 
          animation: fadeIn 0.8s ease forwards;
          opacity: 0;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }

        @keyframes scaleTick {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scaleTick { 
          animation: scaleTick 0.7s ease-out forwards;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}