import { useNavigate, useParams } from "react-router-dom";

export default function CartBar({ cart }) {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!cart.length) return null;

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const totalPrice = cart.reduce(
  (sum, item) =>
    sum +
    (item.totalPrice ??
      Number(item.unitPrice || 0) * Number(item.qty || 0)),
  0
);


  return (
    <div
      onClick={() => navigate(`/cart/${id}`)}
      className="fixed bottom-4 left-1/2 -translate-x-1/2
                 bg-green-600 text-white px-6 py-4 rounded-2xl
                 shadow-xl flex gap-4 cursor-pointer"
    >
      🛒 {totalItems} items · ₹{totalPrice} →
    </div>
  );
}
