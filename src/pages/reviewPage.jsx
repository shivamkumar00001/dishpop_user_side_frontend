import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../lib/api";

export default function ReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ avgRating: 0, count: 0 });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/review/${id}`);
      setStats(res.data.data.stats);
      setReviews(res.data.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      alert("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-amber-500 border-t-transparent mb-4"></div>
        <p className="text-lg text-slate-600 font-medium">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4 sm:px-6 py-6 sm:py-10">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-amber-600 font-bold hover:text-amber-700 
                 flex items-center gap-2 transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* AVG RATING BOX */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 text-center mb-8 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Customer Ratings</h2>

        <div className="mt-4 text-5xl sm:text-6xl font-bold text-amber-500 drop-shadow-md">
          {stats.avgRating.toFixed(1)}
        </div>

        <div className="flex justify-center mt-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`text-2xl sm:text-3xl ${
                s <= Math.round(stats.avgRating)
                  ? "text-amber-500"
                  : "text-slate-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-slate-600 mt-3 font-medium">
          {stats.count} {stats.count === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* REVIEWS LIST */}
      <h3 className="text-xl font-bold mb-4 text-slate-800">
        Recent Reviews
      </h3>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-slate-100">
            <span className="text-3xl">💬</span>
          </div>
          <p className="text-slate-600 font-medium">No reviews yet.</p>
          <p className="text-slate-500 text-sm mt-1">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-xl shadow-md border border-slate-200 
                       hover:shadow-lg transition-shadow duration-200 animate-slideUp"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-800">
                  {r.userName || "Anonymous"}
                </span>

                <span className="text-sm text-slate-500 ml-auto">
                  {new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`text-xl ${
                      s <= r.rating ? "text-amber-500" : "text-slate-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {r.review && (
                <p className="mt-3 text-slate-700 whitespace-pre-line leading-relaxed">
                  {r.review}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp .45s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn .5s ease-out;
        }
      `}</style>
    </div>
  );
}