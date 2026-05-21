import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../api';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => { getOrder(id).then(({ data }) => setOrder(data)); }, [id]);

  if (!order) return <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Chargement...</div>;

  const isCCP = order.payment_method === 'ccp';

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 16px' }}>

      {/* Success header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#f0faf4', border: '2px solid #009246', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: '1.8rem', color: '#009246' }}>
          ✓
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>Commande confirmée !</h1>
        <div style={{ height: 3, width: 44, background: 'linear-gradient(to right, #009246, #CE2B37)', borderRadius: 2, margin: '0 auto 14px' }} />
        <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.92rem' }}>
          Merci <span style={{ color: '#1a1a1a', fontWeight: 700 }}>{order.full_name}</span> !
          Commande <span style={{ color: '#009246', fontWeight: 700 }}>#{order.id}</span> enregistrée.<br />
          Confirmation envoyée à <span style={{ color: '#1a1a1a' }}>{order.email}</span>.
        </p>
      </div>

      {/* Payment notice */}
      <div style={{ background: isCCP ? '#fffbeb' : '#f0faf4', border: `1px solid ${isCCP ? '#fde68a' : '#c6e6d4'}`, borderRadius: 10, padding: '16px 20px', marginBottom: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.5rem' }}>{isCCP ? '🏦' : '🚚'}</span>
        <div>
          <p style={{ fontWeight: 700, color: isCCP ? '#92400e' : '#009246', marginBottom: 4, fontSize: '0.9rem' }}>
            {isCCP ? 'Virement CCP requis' : 'Paiement à la livraison'}
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
            {isCCP
              ? "Effectuez le virement CCP et envoyez-nous la preuve de paiement pour confirmer l'expédition."
              : 'Vous payerez en espèces à la réception du colis. Aucune action requise.'}
          </p>
        </div>
      </div>

      {/* Items */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 22, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 14, color: '#1a1a1a' }}>Articles commandés</p>
        {order.items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9, fontSize: '0.85rem', color: '#6b7280' }}>
            <span>{item.product_name} ×{item.quantity}</span>
            <span>{parseFloat(item.subtotal).toLocaleString('fr-DZ')} DA</span>
          </div>
        ))}
        <div style={{ height: 1, background: '#e5e7eb', margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</span>
          <span style={{ color: '#CE2B37', fontWeight: 800, fontSize: '1.3rem' }}>{parseFloat(order.total_price).toLocaleString('fr-DZ')} DA</span>
        </div>
      </div>

      {/* Address */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 22, marginBottom: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 10, color: '#1a1a1a' }}>📍 Livraison à</p>
        <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.8 }}>
          {order.address}{order.commune ? `, ${order.commune}` : ''}<br />
          Wilaya de <strong style={{ color: '#1a1a1a' }}>{order.wilaya}</strong>
        </p>
      </div>

      <Link to="/" style={{ display: 'block', textAlign: 'center', padding: '14px 0', background: '#009246', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem' }}>
        Continuer les achats
      </Link>
    </div>
  );
}
