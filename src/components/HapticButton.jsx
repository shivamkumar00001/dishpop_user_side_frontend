import { haptic } from "../utils/haptics";

export default function HapticButton({ onClick, children, ...props }) {
  const handleClick = (e) => {
    haptic(15); // light haptic
    onClick?.(e);
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
