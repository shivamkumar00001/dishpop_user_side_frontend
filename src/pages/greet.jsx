// src/pages/Greet.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

export default function Greet() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  // review states
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
        userName, // ⭐ SEND USERNAME TO BACKEND
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-b from-green-50 to-green-100">

        {/* SUCCESS ICON */}
    <div className="relative mb-4 mt-4 flex justify-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-600 rounded-full flex items-center justify-center 
          shadow-xl animate-bounce-slow overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-scaleTick"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>


      {/* TEXT */}
      <h1 className="text-3xl font-extrabold text-green-700 text-center animate-fadeIn">
        Thank You! 🎉
      </h1>

      <p className="text-lg text-gray-700 max-w-md text-center mt-3 animate-fadeIn delay-200">
        Your order has been successfully placed.  
        Our team is preparing your delicious food 🍽️  
        We’ll serve it shortly!
      </p>

      {/* Order more */}
      <button
        onClick={() => navigate(`/${params.id}`)}
        className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
        shadow-lg hover:bg-green-700 transition-all animate-fadeIn delay-400"
      >
        Order More
      </button>

      {/* REVIEW SECTION */}
      <div className="mt-10 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg animate-fadeIn delay-400">

        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-green-800 text-center mb-2">Rate Your Experience</h2>

            {/* USERNAME FIELD */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name (optional)"
              className="mt-3 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />

            {/* Stars */}
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                  className="text-3xl px-1 focus:outline-none transform transition-transform hover:scale-110"
                >
                  <span className={(s <= (hover || rating)) ? "text-yellow-500 drop-shadow" : "text-gray-300"}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            {/* Review Textarea */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-4 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              rows="3"
              placeholder="Write your review (optional)"
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={submitReview}
                disabled={loading}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  loading
                    ? "bg-gray-300 text-gray-600"
                    : "bg-green-600 text-white hover:bg-green-700"
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
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                Clear
              </button>
            </div>
          </>
        ) : (
          // AFTER SUBMISSION UI
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-green-700">Thanks for your review!</h3>
            <p className="text-gray-600 text-center mt-1">
              Your feedback helps this restaurant improve 🍽️💚
            </p>
          </div>
        )}
      </div>

      {/* View All Reviews Link */}
      <button
        onClick={() => navigate(`/reviews/${params.id}`)}
        className="mt-3 text-green-700 underline"
      >
        View All Reviews
      </button>

      {/* FOOTER */}
      <p className="text-gray-500 text-sm mt-6 animate-fadeIn delay-600">
        © 2025 DishPop — Serving Happiness 💚
      </p>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        @keyframes scaleTick { 0% { transform: scale(0.8); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .animate-scaleTick { animation: scaleTick 0.6s ease-out forwards; }

        @keyframes bounceSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounceSlow 1.8s ease-in-out infinite; }
      `}</style>

    </div>
  );
}
