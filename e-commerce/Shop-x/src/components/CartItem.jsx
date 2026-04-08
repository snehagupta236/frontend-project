import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const handleQty = (qty) => {
    if (qty <= 0) {
      dispatch({ type: 'REMOVE', id: item.id });
    } else {
      dispatch({ type: 'UPDATE_QTY', id: item.id, qty });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
      
      {/* ✅ Image FIXED */}
      <img
        src={item.image}
        alt={item.title}
        className="w-14 h-14 object-contain"
      />

      {/* ✅ Info FIXED */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{item.title}</p>
        <p className="text-xs text-gray-400 mt-1">${item.price} each</p>
      </div>

      {/* Qty Controls */}
      <div className="flex items-center gap-2">
        <button onClick={() => handleQty(item.qty - 1)}>−</button>
        <span>{item.qty}</span>
        <button onClick={() => handleQty(item.qty + 1)}>+</button>
      </div>

      {/* Total */}
      <p className="text-sm font-semibold text-gray-800 w-16 text-right">
        ${(item.price * item.qty).toFixed(2)}
      </p>

      {/* Remove */}
      <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>
        ✕
      </button>

    </div>
  );
}