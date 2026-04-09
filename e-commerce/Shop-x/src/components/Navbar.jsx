import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-red-400 text-xl font-bold tracking-widest">
          SHOPX
        </Link>

        {/* Desktop Links — md se bada screen pe dikhe */}
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

        {/* Mobile — Cart + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/cart"
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
          >
            🛒
            <span className="bg-white text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              // X icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 pb-3 border-t border-gray-700 pt-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-red-400 transition"
          >
            Shop
          </Link>
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-red-400 transition"
          >
            Admin
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-red-400 transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
