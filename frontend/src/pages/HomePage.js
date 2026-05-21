import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.results ?? data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    getProducts(params)
      .then(({ data }) => setProducts(data.results ?? data))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 48, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
        {/* Top flag bar */}
        <div style={{ height: 6, display: 'flex' }}>
          <div style={{ flex: 1, background: '#009246' }} />
          <div style={{ flex: 1, background: '#fff', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }} />
          <div style={{ flex: 1, background: '#CE2B37' }} />
        </div>

        <div style={{ padding: '52px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f0faf4', border: '1px solid #c6e6d4', padding: '5px 14px', borderRadius: 4, marginBottom: 20 }}>
              <span style={{ fontSize: '0.85rem' }}>🇮🇹</span>
              <span style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Importé directement d'Italie</span>
            </div>

            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1.2, color: '#1a1a1a', marginBottom: 16 }}>
              L'Italie livrée<br />
              <span style={{ color: '#009246' }}>chez vous</span> en <span style={{ color: '#CE2B37' }}>Algérie</span>
            </h1>

            <p style={{ color: '#6b7280', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: 32 }}>
              Je sélectionne les meilleurs produits italiens et je les livre dans les <strong style={{ color: '#1a1a1a' }}>58 wilayas</strong>.
              Paiement à la livraison ou par CCP.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#products" style={{ padding: '12px 28px', background: '#009246', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.5px' }}>
                Voir les produits
              </a>
              <div style={{ padding: '12px 28px', border: '1px solid #e5e7eb', color: '#6b7280', borderRadius: 8, fontWeight: 500, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                🚚 58 wilayas
              </div>
            </div>
          </div>

          {/* Flags */}
          <div style={{ display: 'flex', gap: 16, fontSize: '5rem', opacity: 0.85 }}>
            <span>🇮🇹</span>
            <span style={{ fontSize: '2rem', alignSelf: 'center', color: '#d1d5db' }}>→</span>
            <span>🇩🇿</span>
          </div>
        </div>
      </div>

      {/* ── BADGES ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 52 }}>
        {[
          { icon: '🇮🇹', title: "Importé d'Italie",   desc: 'Sélectionné sur place',          color: '#009246' },
          { icon: '🚚', title: '58 Wilayas',           desc: 'Livraison partout en Algérie',    color: '#009246' },
          { icon: '💳', title: 'Paiement flexible',    desc: 'À la livraison ou CCP',           color: '#CE2B37' },
          { icon: '📦', title: 'Emballage soigné',     desc: 'Protégé pour la livraison',       color: '#CE2B37' },
        ].map(b => (
          <div key={b.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '18px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '1.3rem' }}>{b.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1a1a1a', marginBottom: 2 }}>{b.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{b.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── PRODUCTS ─────────────────────────────── */}
      <div id="products">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 4 }}>Catalogue</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1a1a1a' }}>Nos Produits</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, color: '#1a1a1a', fontSize: '0.88rem', minWidth: 200, outline: 'none' }}
              placeholder="🔍  Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              style={{ padding: '10px 14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, color: '#1a1a1a', fontSize: '0.88rem', cursor: 'pointer', outline: 'none' }}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Toutes catégories</option>
              {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 2, background: 'linear-gradient(to right, #009246, #ffffff, #CE2B37)', borderRadius: 2, marginBottom: 28 }} />

        {loading
          ? <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Chargement...</div>
          : products.length === 0
            ? <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Aucun produit trouvé.</div>
            : <>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: 20 }}>{products.length} article{products.length > 1 ? 's' : ''}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 22 }}>
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
        }
      </div>

      {/* ── FOOTER ───────────────────────────────── */}
      <div style={{ marginTop: 80, borderTop: '1px solid #e5e7eb', paddingTop: 32, paddingBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>
            italia<span style={{ color: '#CE2B37' }}>2</span><span style={{ color: '#009246' }}>dz</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 3 }}>Importé d'Italie · Livré en Algérie</div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#d1d5db' }}>© 2025 italia2dz. Tous droits réservés.</div>
      </div>

    </div>
  );
}
