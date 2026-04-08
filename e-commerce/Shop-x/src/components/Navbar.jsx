import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-red-400 text-xl font-bold tracking-widest">
        SHOPX
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm text-gray-300 hover:text-red-400 transition">
          Shop
        </Link>
        <Link to="/admin" className="text-sm text-gray-300 hover:text-red-400 transition">
          Admin
        </Link>
        <Link to="/login" className="text-sm text-gray-300 hover:text-red-400 transition">
          Login
        </Link>
        <Link
          to="/cart"
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          🛒 Cart
          <span className="bg-white text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        </Link>
      </div>
    </nav>
  );
}