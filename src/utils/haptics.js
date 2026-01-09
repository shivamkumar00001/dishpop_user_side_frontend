export const haptic = (pattern = 15) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
