 
import { useEffect } from "react";

export default function ARViewer({ item, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const glbUrl = item.arModel?.glb || "";
  const usdzUrl = item.arModel?.usdz || "";
  const hasAR = Boolean(glbUrl || usdzUrl);

  const openAR = () => {
    const arViewer = document.getElementById("ar-model");
    if (!arViewer) return;

    try {
      arViewer.activateAR();
    } catch {
      alert("AR not supported on this device");
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70 backdrop-blur-md
        flex items-center justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-md mx-auto
          p-6 sm:p-7
          rounded-3xl
          bg-gradient-to-br from-white via-slate-50 to-white
          border border-slate-200
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]
          animate-scale-in
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            p-2 rounded-full
            bg-white/90 backdrop-blur
            border border-slate-200
            shadow-sm
            hover:bg-slate-50
            active:scale-95
            transition
            text-slate-700
          "
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-slate-900 mb-0.5">
          View in AR
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          {item.name}
        </p>

        {hasAR ? (
          <>
            {/* 3D VIEWER */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <model-viewer
                id="preview-model"
                src={glbUrl}
                alt={`3D model of ${item.name}`}
                camera-controls
                touch-action="pan-y"
                disable-tap
                interpolation-decay="200"
                auto-rotate
                auto-rotate-delay="1200"
                rotation-per-second="26deg"
                camera-orbit="45deg 75deg 105%"
                field-of-view="30deg"
                min-camera-orbit="auto auto 50%"
                max-camera-orbit="auto auto 200%"
                environment-image="neutral"
                exposure="1"
                shadow-intensity="1"
                shadow-softness="0.8"
                style={{
                  width: "100%",
                  height: "320px",
                  background: "linear-gradient(180deg,#f8fafc,#ffffff)",
                }}
              />
            </div>

            {/* HINT */}
            <p className="mt-3 text-xs text-slate-400 text-center">
              Drag to rotate • Pinch to zoom • Two fingers to move
            </p>

            {/* CTA */}
            <div className="mt-6 flex justify-center">
              {/* <button
                onClick={openAR}
                className="
                  group flex items-center gap-3
                  px-6 py-3.5 rounded-2xl
                  bg-slate-900
                  text-white font-semibold text-sm
                  shadow-lg
                  transition-all duration-300
                  hover:bg-slate-800
                  hover:scale-[1.04]
                  active:scale-95
                "
              >
                <span className="text-lg transition group-hover:scale-110">📱</span>
                <span>Place dish on your table</span>
              </button> */}
              <button
  onClick={openAR}
  className="
    group flex items-center gap-3
    px-6 py-3.5 rounded-2xl
    bg-green-600
    text-white font-semibold text-sm
    shadow-lg
    transition-all duration-300
    hover:bg-green-500
    hover:scale-[1.04]
    active:scale-95
  "
>
  <span className="text-lg transition group-hover:scale-110">📱</span>
  <span>Place dish on your table</span>
</button>

            </div>

            <p className="mt-2 text-xs text-slate-400 text-center">
              Best on a flat surface like a table
            </p>

            {/* AR MODEL */}
            <model-viewer
              id="ar-model"
              src={glbUrl}
              ios-src={usdzUrl}
              alt={`AR model of ${item.name}`}
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-placement="floor"
              scale="0.4 0.4 0.4"
              camera-orbit="0deg 75deg 1m"
              environment-image="neutral"
              exposure="1"
              shadow-intensity="0.5"
              interaction-prompt="none"
              interaction-policy="always-allow"
              loading="eager"
              reveal="auto"
              disable-zoom
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
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-slate-900 font-semibold text-lg">
              AR not available
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Contact restaurant for details
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}


