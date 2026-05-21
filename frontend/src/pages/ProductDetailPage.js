import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add, loading } = useCart();

  useEffect(() => { getProduct(slug).then(({ data }) => setProduct(data)); }, [slug]);

  const handleAdd = async () => {
    await add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (!product) return <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Chargement...</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Link to="/" style={{ color: '#009246', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
        ← Retour aux produits
      </Link>

      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Image */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <div style={{ width: 460, maxWidth: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {product.image_url
              ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }} />
              : <div style={{ width: '100%', height: 460, background: 'linear-gradient(135deg, #f0faf4, #fdf0f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>🇮🇹</div>
            }
          </div>
          <div style={{ position: 'absolute', top: 14, left: 14, background: '#009246', color: '#fff', fontSize: '0.62rem', fontWeight: 700, padding: '5px 12px', borderRadius: 4, letterSpacing: '1px' }}>
            🇮🇹 IMPORTÉ D'ITALIE
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 280 }}>
          {product.category && <p style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>{product.category.name}</p>}
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.1rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: 10 }}>{product.name}</h1>
          <div style={{ height: 3, width: 44, background: 'linear-gradient(to right, #009246, #CE2B37)', borderRadius: 2, marginBottom: 18 }} />
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#CE2B37', marginBottom: 16 }}>
            {parseFloat(product.price).toLocaleString('fr-DZ')} <span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 400 }}>DA</span>
          </div>
          {product.description && <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>{product.description}</p>}

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: product.in_stock ? '#f0faf4' : '#fdf2f2', border: `1px solid ${product.in_stock ? '#c6e6d4' : '#fcc'}`, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: product.in_stock ? '#009246' : '#CE2B37' }} />
            <span style={{ fontSize: '0.78rem', color: product.in_stock ? '#009246' : '#CE2B37', fontWeight: 700 }}>
              {product.in_stock ? `En stock — ${product.stock} disponibles` : 'Épuisé'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28 }}>
            {[['🚚', 'Livraison dans les 58 wilayas'], ['💳', 'Paiement à la livraison ou CCP'], ['📦', 'Emballage soigné et sécurisé']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: '#6b7280' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>

          {product.in_stock && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: '0.8rem', color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase' }}>Qté :</span>
                <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 38, height: 38, background: '#f9fafb', color: '#1a1a1a', fontSize: '1.1rem', fontWeight: 700 }}>−</button>
                  <span style={{ width: 44, textAlign: 'center', fontWeight: 700, lineHeight: '38px', background: '#fff', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }}>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: 38, height: 38, background: '#f9fafb', color: '#1a1a1a', fontSize: '1.1rem', fontWeight: 700 }}>+</button>
                </div>
              </div>
              <button onClick={handleAdd} disabled={loading}
                style={{ padding: '13px 36px', background: added ? '#009246' : '#1a1a1a', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px', transition: 'background 0.2s' }}
              >
                {added ? '✓ Ajouté au panier !' : '🛒 Ajouter au panier'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
