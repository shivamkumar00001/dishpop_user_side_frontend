export const addToSessionCart = (item) => {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const index = cart.findIndex((c) => c.id === item.id);

  if (index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
};

export const getSessionCart = () => {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
};
