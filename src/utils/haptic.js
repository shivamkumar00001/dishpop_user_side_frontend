export function triggerHaptic(duration = 10) {
  // Mobile devices only
  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile) return;

  // Vibration API (safe check)
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}
