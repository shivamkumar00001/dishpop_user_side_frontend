import MenuItemCard from "./MenuItemCard";

export default function ItemsGrid({
  items,
  cart,
  addToCart,
  openItemSheet,
  increaseQty,
  decreaseQty,
  onArView,
}) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-6 grid
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          cart={cart}
          addToCart={() => addToCart(item)}
          openItemSheet={() => openItemSheet(item)}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          onArView={() => onArView(item)}
        />
      ))}
    </div>
  );
}
