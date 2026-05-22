import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';

const COLORS = [
  { bg: '#f0faf4', border: '#009246', accent: '#009246' },
  { bg: '#fff5f5', border: '#CE2B37', accent: '#CE2B37' },
  { bg: '#f5f3ff', border: '#7c3aed', accent: '#7c3aed' },
  { bg: '#fff7ed', border: '#ea580c', accent: '#ea580c' },
  { bg: '#f0f9ff', border: '#0284c7', accent: '#0284c7' },
  { bg: '#fdf4ff', border: '#a21caf', accent: '#a21caf' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.results ?? data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 48, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
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
              <a href="#categories" style={{ padding: '12px 28px', background: '#009246', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.5px', textDecoration: 'none' }}>
                Voir les catégories
              </a>
              <div style={{ padding: '12px 28px', border: '1px solid #e5e7eb', color: '#6b7280', borderRadius: 8, fontWeight: 500, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                🚚 58 wilayas
              </div>
            </div>
          </div>
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
          { icon: '🇮🇹', title: "Importé d'Italie",  desc: 'Sélectionné sur place',       color: '#009246' },
          { icon: '🚚', title: '58 Wilayas',          desc: 'Livraison partout en Algérie', color: '#009246' },
          { icon: '💳', title: 'Paiement flexible',   desc: 'À la livraison ou CCP',        color: '#CE2B37' },
          { icon: '📦', title: 'Emballage soigné',    desc: 'Protégé pour la livraison',    color: '#CE2B37' },
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

      {/* ── CATEGORIES ───────────────────────────── */}
      <div id="categories">
        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 4 }}>Catalogue</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1a1a1a' }}>Nos Catégories</h2>
        </div>

        <div style={{ height: 2, background: 'linear-gradient(to right, #009246, #ffffff, #CE2B37)', borderRadius: 2, marginBottom: 32 }} />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Chargement...</div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Aucune catégorie disponible.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {categories.map((cat, i) => {
              const c = COLORS[i % COLORS.length];
              return (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: c.bg,
                    border: `2px solid ${c.border}`,
                    borderRadius: 14,
                    padding: '36px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                  >
                    <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>🛍️</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{cat.name}</div>
                    <div style={{ fontSize: '0.78rem', color: c.accent, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Voir les produits →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
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
