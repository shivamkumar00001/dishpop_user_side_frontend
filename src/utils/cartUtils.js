// 🔑 composite cart identity
export function createCartItemId(itemId, variantId, addons) {
  const addonKey = addons
    .map(a => `${a.id}:${a.qty}`)
    .sort()
    .join("|");

  return `${itemId}__${variantId}__${addonKey}`;
}

// 🔍 find all configurations of an item
export function findItemConfigs(cart, itemId) {
  return cart.filter(c => c.itemId === itemId);
}

// ➕ add to cart (pure)
export function addToCart(cart, item, variant, addons, qty) {
  const cartItemId = createCartItemId(
    item.id,
    variant.id,
    addons
  );

  const existing = cart.find(c => c.cartItemId === cartItemId);

  if (existing) {
    return cart.map(c =>
      c.cartItemId === cartItemId
        ? { ...c, qty: c.qty + qty }
        : c
    );
  }

  return [
    ...cart,
    {
      cartItemId,
      itemId: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      variant,
      addons,
      qty,
    },
  ];
}

// ➕ increment specific config
export function incrementConfig(cart, cartItemId) {
  return cart.map(c =>
    c.cartItemId === cartItemId
      ? { ...c, qty: c.qty + 1 }
      : c
  );
}

// ➖ decrement specific config
export function decrementConfig(cart, cartItemId) {
  return cart
    .map(c =>
      c.cartItemId === cartItemId
        ? { ...c, qty: c.qty - 1 }
        : c
    )
    .filter(c => c.qty > 0);
}

