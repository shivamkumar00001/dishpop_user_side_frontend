import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const params = useParams();

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="w-full py-3 bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-6 flex justify-between items-center">

          {/* FIXED SVG IMAGE */}
          <img
            src="/logo.svg"
            alt="DishPop Logo"
            className="w-14 sm:w-26 object-contain"
          />

          <button
            onClick={() => navigate(`/orders/${params.id}`)}
            className="bg-green-600 text-white px-3 sm:px-5 py-2 rounded-md text-xs sm:text-base
            hover:bg-green-700 transition-all duration-300 shadow-md"
          >
            My Orders
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex-grow flex items-center py-10">
        <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-6 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT TEXT */}
          <div
            className={
              "w-full lg:w-1/2 text-center lg:text-left " +
              (animate ? "u-slideUp" : "u-preAnimate")
            }
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-green-900 leading-snug sm:leading-tight break-words">
              Fresh. Flavorful.
              <br />
              Made Just for You
            </h2>

            <p className="mt-3 text-gray-600 text-xs sm:text-base max-w-xs sm:max-w-md mx-auto lg:mx-0 break-words">
              <span className="bg-green-200/60 text-green-900 font-semibold px-1 rounded-md">
                Explore dishes in AR
              </span>
              , add items to your cart, and enjoy a seamless interactive dining experience.
            </p>

            {/* BUTTONS */}
            <div
              className={
                "mt-5 flex flex-col gap-3 items-center lg:items-start " +
                (animate ? "u-fadeInDelay" : "")
              }
            >
              {/* Browse Menu */}
              <button
                onClick={() => navigate(`/menu/${params.id}`)}
                className="bg-green-600 text-white px-5 py-3 rounded-lg text-sm sm:text-lg 
                shadow-md hover:shadow-xl hover:bg-green-700 transition-all duration-300 w-full max-w-xs"
              >
                Browse Menu
              </button>

              {/* View Reviews Button */}
              <button
                onClick={() => navigate(`/reviews/${params.id}`)}
                className="bg-white text-green-700 border border-green-300 px-5 py-3 rounded-lg text-sm sm:text-lg 
                shadow-sm hover:shadow-md hover:bg-green-50 transition-all duration-300 w-full max-w-xs"
              >
                View Reviews ⭐
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className={"w-full lg:w-1/2 flex justify-center " + (animate ? "u-scaleUp" : "u-preAnimate")}>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Food"
              className="w-full max-w-[90%] sm:max-w-[350px] lg:max-w-[450px] rounded-3xl shadow-lg object-cover"
            />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-3 text-center text-gray-500 text-xs sm:text-sm px-2 break-words">
        © 2025 DishPop — Crafted with ❤️ 
      </footer>
    </div>
  );
}
