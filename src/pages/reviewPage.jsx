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
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-600">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-green-700 font-semibold hover:underline"
      >
        ← Back
      </button>

      {/* AVG RATING BOX */}
      <div className="bg-white p-6 rounded-2xl shadow-md text-center mb-8 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800">Customer Ratings</h2>

        <div className="mt-3 text-5xl font-extrabold text-yellow-500 drop-shadow">
          {stats.avgRating.toFixed(1)}
        </div>

        <div className="flex justify-center mt-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`text-2xl ${
                s <= Math.round(stats.avgRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-gray-600 mt-2">
          {stats.count} {stats.count === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* REVIEWS LIST */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Recent Reviews
      </h3>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-xl shadow animate-slideUp"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-700">
                  {r.userName || "Anonymous"}
                </span>

                <span className="text-sm text-gray-400 ml-auto">
                  {new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`text-xl ${
                      s <= r.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {r.review && (
                <p className="mt-2 text-gray-700 whitespace-pre-line">
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
