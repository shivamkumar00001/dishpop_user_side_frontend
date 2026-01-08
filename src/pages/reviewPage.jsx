// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import api from "../lib/api";

// export default function ReviewsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({ avgRating: 0, count: 0 });
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchReviews = async () => {
//     try {
//       const res = await api.get(`/api/review/${id}`);
//       setStats(res.data.data.stats);
//       setReviews(res.data.data.reviews);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//       alert("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="animate-spin h-12 w-12 rounded-full border-4 border-amber-500 border-t-transparent mb-4"></div>
//         <p className="text-lg text-slate-600 font-medium">Loading reviews...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4 sm:px-6 py-6 sm:py-10">

//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 text-amber-600 font-bold hover:text-amber-700 
//                  flex items-center gap-2 transition-colors duration-200"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         Back
//       </button>

//       {/* AVG RATING BOX */}
//       <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 text-center mb-8 animate-fadeIn">
//         <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Customer Ratings</h2>

//         <div className="mt-4 text-5xl sm:text-6xl font-bold text-amber-500 drop-shadow-md">
//           {stats.avgRating.toFixed(1)}
//         </div>

//         <div className="flex justify-center mt-3">
//           {[1, 2, 3, 4, 5].map((s) => (
//             <span
//               key={s}
//               className={`text-2xl sm:text-3xl ${
//                 s <= Math.round(stats.avgRating)
//                   ? "text-amber-500"
//                   : "text-slate-300"
//               }`}
//             >
//               ★
//             </span>
//           ))}
//         </div>

//         <p className="text-slate-600 mt-3 font-medium">
//           {stats.count} {stats.count === 1 ? "review" : "reviews"}
//         </p>
//       </div>

//       {/* REVIEWS LIST */}
//       <h3 className="text-xl font-bold mb-4 text-slate-800">
//         Recent Reviews
//       </h3>

//       {reviews.length === 0 ? (
//         <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
//           <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-slate-100">
//             <span className="text-3xl">💬</span>
//           </div>
//           <p className="text-slate-600 font-medium">No reviews yet.</p>
//           <p className="text-slate-500 text-sm mt-1">Be the first to share your experience!</p>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {reviews.map((r) => (
//             <div
//               key={r._id}
//               className="bg-white p-5 rounded-xl shadow-md border border-slate-200 
//                        hover:shadow-lg transition-shadow duration-200 animate-slideUp"
//             >
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className="font-bold text-slate-800">
//                   {r.userName || "Anonymous"}
//                 </span>

//                 <span className="text-sm text-slate-500 ml-auto">
//                   {new Date(r.createdAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>

//               {/* Star Rating */}
//               <div className="flex mt-2">
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <span
//                     key={s}
//                     className={`text-xl ${
//                       s <= r.rating ? "text-amber-500" : "text-slate-300"
//                     }`}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>

//               {r.review && (
//                 <p className="mt-3 text-slate-700 whitespace-pre-line leading-relaxed">
//                   {r.review}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Animations */}
//       <style>{`
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideUp {
//           animation: slideUp .45s ease-out;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn .5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="animate-spin h-14 w-14 rounded-full border-4 border-green-600 border-t-transparent mb-4"></div>
        <p className="text-lg text-gray-600 font-semibold">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white shadow-md mb-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl 
                       bg-gray-100 text-gray-700 
                       hover:bg-gray-200 transition-all active:scale-95"
          >
            ←
          </button>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              Customer Reviews
            </h1>
            <p className="text-sm text-gray-600">
              See what others are saying
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
        {/* AVG RATING BOX */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-xl 
                        transition-shadow border border-gray-200 text-center mb-10 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
            Overall Rating
          </h2>

          <div className="flex flex-col items-center">
            <div className="text-6xl sm:text-7xl font-extrabold text-green-600 drop-shadow-md mb-4">
              {stats.avgRating.toFixed(1)}
            </div>

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`text-3xl sm:text-4xl ${
                    s <= Math.round(stats.avgRating)
                      ? "text-yellow-400 drop-shadow"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-600 font-semibold text-lg">
              Based on {stats.count} {stats.count === 1 ? "review" : "reviews"}
            </p>

            {stats.avgRating >= 4.5 && (
              <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                ⭐ Excellent Rating!
              </div>
            )}
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Recent Reviews
          </h3>
          <p className="text-gray-600 text-sm">
            Authentic feedback from our valued customers
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-12 sm:p-16 text-center animate-fadeIn">
            <div className="mx-auto mb-5 h-20 w-20 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-4xl">💬</span>
            </div>
            <p className="text-gray-700 font-bold text-lg mb-2">No reviews yet</p>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Be the first to share your experience and help others make informed decisions!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {reviews.map((r, index) => (
              <div
                key={r._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                         hover:shadow-lg transition-all duration-200 animate-slideUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 
                                    flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {(r.userName || "A")[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-base block">
                        {r.userName || "Anonymous User"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(r.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* STAR RATING */}
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`text-2xl ${
                        s <= r.rating ? "text-yellow-400 drop-shadow" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700 self-center">
                    {r.rating}.0
                  </span>
                </div>

                {/* REVIEW TEXT */}
                {r.review && (
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                    {r.review}
                  </p>
                )}

                {!r.review && (
                  <p className="text-gray-400 italic text-sm">
                    No written feedback provided
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CALL TO ACTION */}
        {reviews.length > 0 && (
          <div className="mt-10 text-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <button
              onClick={() => navigate(`/${id}`)}
              className="bg-green-600 hover:bg-green-700 
                         text-white px-8 py-4 rounded-xl 
                         text-base font-bold shadow-lg hover:shadow-xl
                         active:scale-95 transition-all duration-200"
            >
              Order Now
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}