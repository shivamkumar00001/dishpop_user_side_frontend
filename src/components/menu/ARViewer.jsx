export default function ARViewer({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  const hasAR =
    (item.arModelUrl && item.arModelUrl.trim() !== "") ||
    (item.iosModelUrl && item.iosModelUrl.trim() !== "");

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 p-6 rounded-2xl bg-white shadow-xl border border-green-100 animate-popUp"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-full transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-green-700 mb-1">View in AR</h2>
        <p className="text-gray-600 text-sm mb-4">{item.name}</p>

        {/* ⭐ IF AR MODEL EXISTS */}
        {hasAR ? (
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
           <model-viewer
              src={item.arModelUrl}
              ios-src={item.iosModelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate={false}
              autoplay
              environment-image="neutral"

              /* 🚨 HARD SIZE FIX */
              disable-zoom
              interaction-prompt="none"
              bounds="legacy"
              camera-orbit="0deg 85deg 4.5m"
              min-camera-orbit="auto auto 4.5m"
              max-camera-orbit="auto auto 4.5m"
              field-of-view="20deg"
              scale="0.45 0.45 0.45"

              /* 🌟 LIGHTING */
              shadow-intensity="0.8"
              shadow-softness="0.7"
              exposure="1.05"

              style={{
                width: "100%",
                height: "260px",
                background: "#f9fafb",
                borderRadius: "12px",
                position: "relative",
              }}
            >
              {/* 🚀 HIGH-CONVERSION AR BUTTON */}
              <button
                slot="ar-button"
                className="absolute bottom-4 left-1/2 -translate-x-1/2
                          flex items-center gap-2
                          px-6 py-3
                          rounded-full
                          bg-gradient-to-r from-green-600 to-emerald-500
                          text-white font-semibold text-sm
                          shadow-lg shadow-green-500/30
                          active:scale-95
                          transition-transform"
              >
                📱 View Dish in Your Space
              </button>
</model-viewer>


          </div>
        ) : (
          /* ⭐ FALLBACK FOR NO AR AVAILABLE */
          <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center">
            <p className="text-red-700 font-semibold text-lg">
              No AR model available
            </p>
            <p className="text-red-500 text-sm mt-1">
              This item does not have an AR experience yet.
            </p>
          </div>
        )}

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-4">
          {hasAR
            ? "Tip: Use your phone to place this dish in your real space."
            : "AR view will be added soon for this item."}
        </p>
      </div>
    </div>
  );
}
