import MenuItemCard from "./MenuItemCard";

export default function CategorySection({
  title,
  items,
  cart,
  addToCart,
  openItemSheet,
  increaseQty,
  decreaseQty,
  onArView,
  showTitle = true, // ✅ DEFAULT: show title
}) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="mt-8">
      {/* CATEGORY TITLE (OPTIONAL) */}
      {showTitle && (
        <h2
          className="
            text-[26px]
            font-black
            italic
            uppercase
            tracking-tight
            text-slate-800
            mb-5
          "
        >
          {title}
        </h2>
      )}

      {/* ITEMS GRID */}
      <div
        className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
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
    </section>
  );
}
