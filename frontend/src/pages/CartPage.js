import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, update, remove } = useCart();

  if (!cart.items.length) return (
    <div style={{ textAlign: 'center', padding: '100px 16px' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🛒</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 8, color: '#1a1a1a' }}>Votre panier est vide</h2>
      <p style={{ color: '#9ca3af', marginBottom: 28 }}>Vous n'avez pas encore ajouté de produits.</p>
      <Link to="/" style={{ padding: '12px 28px', background: '#009246', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem' }}>
        Découvrir nos produits
      </Link>
    </div>
  );

  return (
    <div>
      <p style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6 }}>Récapitulatif</p>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, marginBottom: 32, color: '#1a1a1a' }}>Votre Panier</h1>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Items */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {cart.items.map(item => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, marginBottom: 12, display: 'flex', gap: 14, alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 78, height: 78, borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                {item.product.image_url
                  ? <img src={item.product.image_url} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', background: '#f0faf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🇮🇹</div>
                }
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#1a1a1a', marginBottom: 3 }}>{item.product.name}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: 10 }}>{parseFloat(item.product.price).toLocaleString('fr-DZ')} DA / unité</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => update(item.id, item.quantity - 1)} style={{ width: 28, height: 28, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, color: '#1a1a1a', fontWeight: 700 }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 22, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => update(item.id, item.quantity + 1)} style={{ width: 28, height: 28, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, color: '#1a1a1a', fontWeight: 700 }}>+</button>
                  <button onClick={() => remove(item.id)} style={{ background: 'none', color: '#d1d5db', fontSize: '0.78rem', marginLeft: 6, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#CE2B37'}
                    onMouseLeave={e => e.currentTarget.style.color = '#d1d5db'}
                  >Retirer</button>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: '#CE2B37', fontSize: '1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                {parseFloat(item.subtotal).toLocaleString('fr-DZ')}<br />
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400 }}>DA</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 24, minWidth: 270, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 18, fontSize: '1.1rem', color: '#1a1a1a' }}>Récapitulatif</h3>
          {cart.items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9, fontSize: '0.82rem', color: '#6b7280' }}>
              <span style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name} ×{item.quantity}</span>
              <span>{parseFloat(item.subtotal).toLocaleString('fr-DZ')} DA</span>
            </div>
          ))}
          <div style={{ height: 1, background: '#e5e7eb', margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <span style={{ fontWeight: 600, color: '#6b7280', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</span>
            <span style={{ fontWeight: 800, color: '#CE2B37', fontSize: '1.4rem' }}>{parseFloat(cart.total).toLocaleString('fr-DZ')} <span style={{ fontSize: '0.85rem' }}>DA</span></span>
          </div>
          <div style={{ background: '#f0faf4', border: '1px solid #c6e6d4', borderRadius: 8, padding: '10px 14px', fontSize: '0.78rem', color: '#009246', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>🚚</span><span>Paiement à la livraison ou par CCP</span>
          </div>
          <Link to="/checkout" style={{ display: 'block', textAlign: 'center', padding: '13px 0', background: '#009246', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.5px' }}>
            Commander →
          </Link>
        </div>
      </div>
    </div>
  );
}
