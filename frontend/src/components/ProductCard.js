import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { add, loading } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    await add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          border: `1px solid ${hovered ? '#009246' : '#e5e7eb'}`,
          boxShadow: hovered ? '0 8px 32px rgba(0,146,70,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.25s',
          transform: hovered ? 'translateY(-4px)' : 'none',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
          {product.image_url
            ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
            : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f0faf4, #fdf0f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>🇮🇹</div>
          }
          {/* Badge */}
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#009246', color: '#fff', fontSize: '0.62rem', fontWeight: 700, padding: '4px 10px', borderRadius: 4, letterSpacing: '1px', textTransform: 'uppercase' }}>
            🇮🇹 Importé d'Italie
          </div>
          {!product.in_stock && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#CE2B37', fontWeight: 700, fontSize: '0.85rem', border: '1px solid #CE2B37', padding: '6px 16px', borderRadius: 4, background: '#fff', letterSpacing: '1px' }}>ÉPUISÉ</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {product.category && (
            <span style={{ fontSize: '0.68rem', color: '#009246', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {product.category.name}
            </span>
          )}
          <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.35 }}>
            {product.name}
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#CE2B37', marginTop: 4 }}>
            {parseFloat(product.price).toLocaleString('fr-DZ')} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6b7280' }}>DA</span>
          </span>

          {product.in_stock
            ? <button onClick={handleAdd} disabled={loading}
                style={{ marginTop: 10, padding: '10px 0', background: added ? '#009246' : '#1a1a1a', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.5px', transition: 'background 0.2s' }}
              >
                {added ? '✓ Ajouté au panier' : '+ Ajouter au panier'}
              </button>
            : <button disabled style={{ marginTop: 10, padding: '10px 0', background: '#f3f4f6', color: '#9ca3af', borderRadius: 8, fontWeight: 600, fontSize: '0.82rem', cursor: 'not-allowed' }}>
                Épuisé
              </button>
          }
        </div>
      </div>
    </Link>
  );
}
