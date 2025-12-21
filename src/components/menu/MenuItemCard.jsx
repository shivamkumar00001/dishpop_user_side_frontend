import { useEffect, useState } from "react";

export default function MenuItemCard({
  item,
  cart,
  addToCart,
  openItemSheet,
  increaseQty,
  decreaseQty,
  onArView,
}) {
  const cartItem = cart.find((c) => c.id === item.id);
  const qty = cartItem?.qty || 0;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (qty > 0) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 200);
      return () => clearTimeout(t);
    }
  }, [qty]);

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden
                 hover:scale-[1.02] transition cursor-pointer"
      onClick={openItemSheet}
    >
      <img
        src={item.imageUrl || item.thumbnailUrl}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      {qty > 0 && (
        <div
          className={`absolute top-3 right-3 bg-green-600 text-white
          px-3 py-1 rounded-full font-bold shadow
          ${animate ? "scale-125" : "scale-100"} transition`}
        >
          {qty}
        </div>
      )}

      <div className="p-4">
        <h2 className="text-green-800 font-bold">{item.name}</h2>
        <p className="text-gray-600">₹ {item.startingPrice}</p>

        {qty === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg"
          >
            Add to Cart
          </button>
        ) : (
          <div
            className="mt-3 flex items-center justify-between
                       border border-green-600 rounded-lg px-3 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => decreaseQty(item.id)}>−</button>
            <span>{qty}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onArView();
          }}
          className="w-full mt-2 bg-green-100 text-green-700 py-2 rounded-lg"
        >
          AR View
        </button>
      </div>
    </div>
  );
}
