export default function ARViewer({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  const glbUrl = item.arModel?.glb || "";
  const usdzUrl = item.arModel?.usdz || "";
  const hasAR = Boolean(glbUrl || usdzUrl);

  const openAR = () => {
    const arViewer = document.getElementById("ar-model");
    if (!arViewer) return;

    // ✅ Keep mobile gesture context intact
    requestAnimationFrame(() => {
      arViewer.activateAR();
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/60 backdrop-blur-md
        flex items-center justify-center
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-md mx-4 p-6
          rounded-3xl
          bg-gradient-to-br from-white via-green-50 to-white
          border border-green-200/60
          shadow-[0_20px_50px_rgba(0,0,0,0.25)]
        "
      >
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2 rounded-full
            bg-white shadow
            hover:bg-green-100 hover:text-green-700
          "
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-extrabold text-green-700 mb-1">
          View in AR
        </h2>
        <p className="text-gray-600 text-sm mb-4">{item.name}</p>

        {hasAR ? (
          <>
            {/* =============================== */}
            {/* 👀 3D VIEWER — BIG & DETAILED */}
            {/* =============================== */}
            <div className="rounded-2xl overflow-hidden border border-green-200 bg-white shadow-md">
              <model-viewer
                src={glbUrl}
                environment-image="neutral"
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="20deg"

                camera-controls={false}
                disable-zoom
                interaction-prompt="none"

                /* 🔥 BIG PREVIEW SIZE */
                scale="1.5 1.5 1.5"
                camera-orbit="45deg 65deg 6.5m"
                field-of-view="14deg"
                ar-scale="movable"

                style={{
                  width: "100%",
                  height: "260px",
                  background:
                    "linear-gradient(180deg,#f8fafc,#ffffff)",
                }}
              />
            </div>

            {/* =============================== */}
            {/* 📱 AR CTA BUTTON */}
            {/* =============================== */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={openAR}
                className="
                  group flex items-center gap-3
                  px-6 py-3 rounded-2xl
                  bg-gradient-to-r from-green-600 to-emerald-500
                  text-white font-semibold text-sm
                  shadow-lg shadow-green-500/30
                  transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  active:scale-95
                "
              >
                <span className="text-lg transition group-hover:scale-110">
                  📱
                </span>
                <span>Place dish on your table</span>
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500 text-center">
              Works best on a flat surface like a table
            </p>

            {/* =============================== */}
            {/* 🌍 AR MODEL — SMALL & REALISTIC */}
            {/* =============================== */}
            <model-viewer
              id="ar-model"
              src={glbUrl}
              ios-src={usdzUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"

              /* ✅ SMALL REAL-WORLD SIZE */
              scale="0.39 0.39 0.39"
              ar-placement="floor"
              interaction-prompt="none"
              environment-image="neutral"

              /* 🚨 MUST NOT be display:none */
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
          </>
        ) : (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-center">
            <p className="text-red-700 font-bold text-lg">
              No AR model available
            </p>
            <p className="text-red-500 text-sm mt-1">
              AR experience will be added soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



// export default function ARViewer({ item, isOpen, onClose }) {
//   if (!isOpen || !item) return null;

//   const glbUrl = item.arModel?.glb || "";
//   const usdzUrl = item.arModel?.usdz || "";

//   const hasAR = Boolean(glbUrl || usdzUrl);

//   return (
//     <div
//       className="
//         fixed inset-0 z-50
//         bg-gradient-to-br from-black/50 via-black/40 to-black/60
//         backdrop-blur-md
//         flex items-center justify-center
//         animate-fadeIn
//         cursor-zoom-out
//       "
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="
//           relative w-full max-w-md mx-4 p-6
//           rounded-3xl
//           bg-gradient-to-br from-white via-green-50 to-white
//           border border-green-200/60

//           shadow-[0_20px_50px_rgba(0,0,0,0.25)]
//           animate-popUp

//           transition-all duration-300 ease-out
//           hover:shadow-[0_25px_70px_rgba(16,185,129,0.35)]
//           active:scale-[0.98]
//         "
//       >
//         {/* ✨ CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="
//             absolute top-4 right-4
//             p-2 rounded-full
//             bg-white/80 backdrop-blur
//             text-gray-600

//             transition-all duration-300
//             hover:bg-green-100 hover:text-green-700 hover:rotate-90
//             active:scale-90
//             shadow
//           "
//         >
//           ✕
//         </button>

//         {/* ✨ TITLE */}
//         <h2 className="text-2xl font-extrabold text-green-700 mb-1">
//           View in AR
//         </h2>
//         <p className="text-gray-600 text-sm mb-4">
//           {item.name}
//         </p>

//         {hasAR ? (
//           <div
//             className="
//               relative rounded-2xl overflow-hidden
//               border border-green-200
//               bg-white

//               shadow-md
//               transition-all duration-300
//               hover:shadow-xl hover:shadow-green-500/30
//             "
//           >
//             {/* ✨ SOFT GLOW */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-green-200/20 to-transparent pointer-events-none" />

// <model-viewer
//   src={glbUrl}
//   ios-src={usdzUrl}
//   ar
//   ar-modes="webxr scene-viewer quick-look"

//   /* ✅ CAMERA & ROTATION FIX */
//   auto-rotate
//   auto-rotate-delay="0"
//   rotation-per-second="20deg"

//   camera-controls={false}
//   environment-image="neutral"

//   bounds="legacy"
//   interaction-prompt="none"
//   disable-zoom

//   /* 🍽️ TOP-DOWN FOOD VIEW */
//   camera-orbit="45deg 65deg 6.5m"
//   min-camera-orbit="45deg 65deg 6.5m"
//   max-camera-orbit="45deg 65deg 6.5m"

//   field-of-view="14deg"
//   scale="0.35 0.35 0.35"

//   shadow-intensity="0.75"
//   shadow-softness="0.75"
//   exposure="1.05"

//   style={{
//     width: "100%",
//     height: "260px",
//     background: "linear-gradient(180deg,#f8fafc,#ffffff)",
//     borderRadius: "16px",
//   }}
// >
//             </model-viewer>
//             <div className="mt-5 flex justify-center">
//   <button
//     onClick={() => {
//       const viewer = document.querySelector("model-viewer");
//       viewer?.activateAR();
//     }}
//     className="
//       group flex items-center gap-3
//       px-6 py-3 rounded-2xl

//       bg-gradient-to-r from-green-600 to-emerald-500
//       text-white font-semibold text-sm

//       shadow-lg shadow-green-500/30
//       transition-all duration-300

//       hover:scale-105 hover:shadow-xl hover:shadow-green-500/50
//       active:scale-95
//     "
//   >
//     <span className="text-lg group-hover:scale-110 transition">
//       📱
//     </span>
//     <span>Place dish on your table</span>
//   </button>
// </div>

//           </div>
//         ) : (
//           <div
//             className="
//               rounded-2xl border border-red-300
//               bg-gradient-to-br from-red-50 to-white
//               p-6 text-center

//               transition-all duration-300
//               hover:shadow-lg hover:bg-red-100
//             "
//           >
//             <p className="text-red-700 font-bold text-lg">
//               No AR model available
//             </p>
//             <p className="text-red-500 text-sm mt-1">
//               This item does not have an AR experience yet.
//             </p>
//           </div>
//         )}

//         {/* ✨ FOOTER TIP */}
//         <p className="text-xs text-gray-500 text-center mt-5">
//           {hasAR
//             ? "Tip: Use your phone camera to see the dish in your real space."
//             : "AR experience will be added soon."}
//         </p>
//       </div>
//     </div>
//   );
// }
