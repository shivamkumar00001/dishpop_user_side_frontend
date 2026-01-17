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
        
        {/* <button
          onClick={() => navigate(`/orders/${params.id}`)}
          className="bg-white hover:bg-gray-50 border-2 border-gray-300
                     text-gray-700 px-8 py-4 rounded-xl 
                     text-base font-bold shadow-md hover:shadow-lg
                     active:scale-95 transition-all duration-200"
        >
          View My Orders
        </button> */}

        <button
          onClick={() => navigate(`/${params.id}/order-status`)}
          className="bg-white hover:bg-gray-50 border-2 border-green-400
                     text-green-700 px-8 py-4 rounded-xl 
                     text-base font-bold shadow-md hover:shadow-lg
                     active:scale-95 transition-all duration-200
                     flex items-center justify-center gap-2"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span>Track Live Status</span>
        </button>
      </div>

      {/* REVIEW CARD */}
      <div className="mt-12 w-full max-w-xl bg-white p-6 md:p-8 rounded-2xl 
                      shadow-lg hover:shadow-xl transition-shadow border border-gray-200 animate-fadeIn delay-600">

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
                   transition-colors animate-fadeIn delay-700"
      >
        View All Customer Reviews →
      </button>

      {/* FOOTER */}
      <div className="mt-12 text-center animate-fadeIn delay-800">
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
        .delay-800 { animation-delay: 0.8s; }

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