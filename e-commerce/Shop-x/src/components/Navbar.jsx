import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-red-400 text-xl font-bold tracking-widest">
          SHOPX
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Mobile: Cart icon + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link to="/cart" className="relative">
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none text-2xl"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 border-t border-gray-700 pt-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-red-400 transition py-1"
          >
            Shop
          </Link>
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-red-400 transition py-1"
          >
            Admin
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-red-400 transition py-1"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
