import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { triggerHaptic } from "./utils/haptic";

// 🔹 Global mobile haptic feedback
document.addEventListener("click", (e) => {
  const target = e.target.closest(
    "button, a, [role='button']"
  );

  if (!target) return;

  // Optional opt-out
  if (target.dataset.noHaptic) return;

  triggerHaptic(10); // subtle mobile tap
});

createRoot(document.getElementById("root")).render(
  <App />
);
