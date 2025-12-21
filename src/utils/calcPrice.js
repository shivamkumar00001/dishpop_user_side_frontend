// utils/calcPrice.js

export function calculateItemPrice(variant, addons = [], qty = 1) {
  const variantPrice = Number(variant?.price ?? 0);

  const addonsTotal = addons.reduce((sum, addon) => {
    return sum + Number(addon?.price ?? 0);
  }, 0);

  const unitPrice = variantPrice + addonsTotal;

  if (Number.isNaN(unitPrice)) {
    console.error("❌ Invalid price detected", {
      variant,
      addons,
      qty,
      variantPrice,
      addonsTotal,
    });
    return 0;
  }

  return unitPrice * qty;
}
