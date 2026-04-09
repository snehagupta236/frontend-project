import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Window resize sunna
  useState(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={{ background: '#111827', color: 'white' }}>
      {/* Main Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ color: '#f87171', fontSize: '18px', fontWeight: '700', letterSpacing: '4px', textDecoration: 'none' }}>
          SHOPX
        </Link>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Shop</Link>
            <Link to="/admin" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Admin</Link>
            <Link to="/login" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Login</Link>
            <Link to="/cart" style={{ background: '#ef4444', color: 'white', fontSize: '14px', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              🛒 Cart
              <span style={{ background: 'white', color: '#ef4444', fontSize: '11px', fontWeight: '700', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalItems}
              </span>
            </Link>
          </div>
        )}

        {/* Mobile: Cart + Hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/cart" style={{ background: '#ef4444', color: 'white', fontSize: '13px', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              🛒
              <span style={{ background: 'white', color: '#ef4444', fontSize: '10px', fontWeight: '700', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalItems}
              </span>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'block', width: '22px', height: '2px', background: menuOpen ? '#f87171' : '#d1d5db', borderRadius: '2px', transition: 'all 0.2s' }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: menuOpen ? '#f87171' : '#d1d5db', borderRadius: '2px', transition: 'all 0.2s' }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: menuOpen ? '#f87171' : '#d1d5db', borderRadius: '2px', transition: 'all 0.2s' }}></span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <div style={{ borderTop: '1px solid #374151', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: '#d1d5db', fontSize: '15px', textDecoration: 'none' }}>Shop</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ color: '#d1d5db', fontSize: '15px', textDecoration: 'none' }}>Admin</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: '#d1d5db', fontSize: '15px', textDecoration: 'none' }}>Login</Link>
        </div>
      )}
    </nav>
  );
}
