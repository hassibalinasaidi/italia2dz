import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 200, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {/* Flag strip: green | white | red */}
      <div style={{ height: 4, display: 'flex' }}>
        <div style={{ flex: 1, background: '#009246' }} />
        <div style={{ flex: 1, background: '#ffffff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }} />
        <div style={{ flex: 1, background: '#CE2B37' }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', width: 38, height: 38, borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <div style={{ flex: 1, background: '#009246' }} />
            <div style={{ flex: 1, background: '#fff' }} />
            <div style={{ flex: 1, background: '#CE2B37' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.25rem', color: '#1a1a1a', lineHeight: 1 }}>
              italia<span style={{ color: '#CE2B37' }}>2</span><span style={{ color: '#009246' }}>dz</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 2 }}>
              Importé d'Italie
            </div>
          </div>
        </Link>

        {/* Cart */}
        <Link to="/cart"
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#009246', color: '#fff', padding: '9px 20px', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.3px', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#007a3a'}
          onMouseLeave={e => e.currentTarget.style.background = '#009246'}
        >
          <span>🛒</span>
          <span>Panier</span>
          {cart.item_count > 0 && (
            <span style={{ background: '#CE2B37', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>
              {cart.item_count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
