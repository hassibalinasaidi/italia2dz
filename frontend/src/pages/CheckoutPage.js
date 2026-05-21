import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../api';
import { useCart } from '../context/CartContext';

const WILAYAS = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira',
  'Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda',
  'Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem',"M'Sila",'Mascara',
  'Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf',
  'Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma',
  'Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal',
  'Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet',"El M'Ghair",'El Meniaa',
];

const inp = { padding: '11px 14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, color: '#1a1a1a', fontSize: '0.9rem', outline: 'none', width: '100%', transition: 'border-color 0.2s' };
const lbl = { fontSize: '0.72rem', color: '#6b7280', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, display: 'block' };
const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 24, marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };

const INITIAL = { full_name: '', email: '', phone: '', phone2: '', payment_method: 'delivery', address: '', wilaya: '', commune: '' };

export default function CheckoutPage() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onFocus = e => e.target.style.borderColor = '#009246';
  const onBlur  = e => e.target.style.borderColor = '#e5e7eb';

  const submit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await createOrder(form);
      await fetchCart();
      navigate(`/orders/${data.id}/confirmation`);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.items.length) return <p>Panier vide. <Link to="/" style={{ color: '#009246' }}>Retour</Link></p>;

  return (
    <div>
      <p style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6 }}>Finaliser</p>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, marginBottom: 32, color: '#1a1a1a' }}>Votre commande</h1>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <form style={{ flex: 1, minWidth: 300 }} onSubmit={submit}>

          {/* Contact */}
          <div style={card}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 20, fontSize: '1.05rem', color: '#1a1a1a' }}>Informations personnelles</p>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Nom complet *</label>
              <input style={inp} name="full_name" placeholder="Mohamed Benali" value={form.full_name} onChange={handle} onFocus={onFocus} onBlur={onBlur} required />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Email *</label>
              <input style={inp} type="email" name="email" placeholder="email@exemple.com" value={form.email} onChange={handle} onFocus={onFocus} onBlur={onBlur} required />
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={lbl}>Téléphone principal *</label>
                <input style={inp} name="phone" placeholder="06XX XX XX XX" value={form.phone} onChange={handle} onFocus={onFocus} onBlur={onBlur} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>2ème téléphone</label>
                <input style={inp} name="phone2" placeholder="Optionnel" value={form.phone2} onChange={handle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>
          </div>

          {/* Address */}
          <div style={card}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 20, fontSize: '1.05rem', color: '#1a1a1a' }}>Adresse de livraison</p>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Wilaya *</label>
              <select style={{ ...inp, cursor: 'pointer' }} name="wilaya" value={form.wilaya} onChange={handle} onFocus={onFocus} onBlur={onBlur} required>
                <option value="">Sélectionnez votre wilaya</option>
                {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Commune</label>
              <input style={inp} name="commune" placeholder="Ex: Bab El Oued" value={form.commune} onChange={handle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={lbl}>Adresse complète *</label>
              <input style={inp} name="address" placeholder="Numéro, rue, cité..." value={form.address} onChange={handle} onFocus={onFocus} onBlur={onBlur} required />
            </div>
          </div>

          {/* Payment */}
          <div style={card}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 20, fontSize: '1.05rem', color: '#1a1a1a' }}>Mode de paiement</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { value: 'delivery', icon: '🚚', title: 'À la livraison', desc: 'Payez en cash à la réception' },
                { value: 'ccp',      icon: '🏦', title: 'Virement CCP',  desc: 'Virement postal avant expédition' },
              ].map(opt => (
                <label key={opt.value} style={{ flex: 1, border: `2px solid ${form.payment_method === opt.value ? '#009246' : '#e5e7eb'}`, background: form.payment_method === opt.value ? '#f0faf4' : '#fff', borderRadius: 8, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="payment_method" value={opt.value} checked={form.payment_method === opt.value} onChange={handle} style={{ display: 'none' }} />
                  <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{opt.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: form.payment_method === opt.value ? '#009246' : '#1a1a1a', marginBottom: 3 }}>{opt.title}</div>
                  <div style={{ fontSize: '0.74rem', color: '#9ca3af' }}>{opt.desc}</div>
                </label>
              ))}
            </div>
          </div>

          {error && <p style={{ color: '#CE2B37', marginBottom: 16, fontSize: '0.88rem', background: '#fdf2f2', padding: '10px 14px', borderRadius: 8, border: '1px solid #fcc' }}>{error}</p>}

          <button type="submit" disabled={submitting}
            style={{ width: '100%', padding: '14px 0', background: submitting ? '#9ca3af' : '#009246', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px', transition: 'background 0.2s' }}
          >
            {submitting ? 'Traitement...' : '✅ Confirmer la commande'}
          </button>
        </form>

        {/* Sidebar */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 24, minWidth: 260, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 18, color: '#1a1a1a' }}>Votre commande</h3>
          {cart.items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9, fontSize: '0.82rem', color: '#6b7280' }}>
              <span style={{ maxWidth: 145, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name} ×{item.quantity}</span>
              <span>{parseFloat(item.subtotal).toLocaleString('fr-DZ')} DA</span>
            </div>
          ))}
          <div style={{ height: 1, background: '#e5e7eb', margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</span>
            <span style={{ color: '#CE2B37', fontWeight: 800, fontSize: '1.3rem' }}>{parseFloat(cart.total).toLocaleString('fr-DZ')} DA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
