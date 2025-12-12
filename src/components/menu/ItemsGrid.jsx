import MenuItemCard from "./MenuItemCard";

export default function ItemsGrid({
  items,
  addToCart,
  handleArView,
  openItemSheet,
  params
}) {
  return (
    <div
      className="max-w-screen-xl mx-auto px-4 mt-6 grid 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {items.map((item) => (
        <MenuItemCard
          key={item._id || item.id}
          item={item}
          addToCart={addToCart}

          // pass proper click handlers
          handleArView={() => handleArView(item)}
          openItemSheet={() => openItemSheet(item)}

          params={params}
        />
      ))}
    </div>
  );
}
