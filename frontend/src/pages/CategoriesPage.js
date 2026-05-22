import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';

const IMAGE_MAP = [
  {
    keywords: ['sac', 'bag', 'maroquin', 'pochette', 'valise'],
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #c9a96e 0%, #8b6914 100%)',
  },
  {
    keywords: ['parfum', 'perfum', 'fragrance', 'cologne', 'eau de'],
    url: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #e8c9f0 0%, #9b59b6 100%)',
  },
  {
    keywords: ['skin', 'soin', 'crème', 'creme', 'beauté', 'beaute', 'cosmétique', 'cosmetique', 'sérum', 'serum'],
    url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #fce4ec 0%, #e91e63 100%)',
  },
  {
    keywords: ['chaussure', 'shoe', 'basket', 'talon', 'botte', 'sandal'],
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #ffccbc 0%, #e64a19 100%)',
  },
  {
    keywords: ['bijou', 'bijoux', 'montre', 'bracelet', 'collier', 'bague', 'jewelry', 'watch'],
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #fff9c4 0%, #f9a825 100%)',
  },
  {
    keywords: ['aliment', 'food', 'pasta', 'huile', 'olive', 'sauce', 'épice', 'epice', 'café', 'cafe'],
    url: 'https://images.unsplash.com/photo-1551183053-bf91798d773e?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #dcedc8 0%, #558b2f 100%)',
  },
  {
    keywords: ['vêtement', 'vetement', 'mode', 'habit', 'robe', 'fashion', 'manteau'],
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'linear-gradient(135deg, #b3e5fc 0%, #0277bd 100%)',
  },
];

const FALLBACKS = [
  { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80', fallbackGradient: 'linear-gradient(135deg, #009246 0%, #CE2B37 100%)' },
  { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', fallbackGradient: 'linear-gradient(135deg, #CE2B37 0%, #009246 100%)' },
  { url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80', fallbackGradient: 'linear-gradient(135deg, #1a1a1a 0%, #009246 100%)' },
  { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', fallbackGradient: 'linear-gradient(135deg, #009246 0%, #1a1a1a 100%)' },
];

function getCategoryEntry(name, index) {
  const lower = name.toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keywords.some(k => lower.includes(k))) return entry;
  }
  return FALLBACKS[index % FALLBACKS.length];
}

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {categories.map((cat, i) => {
              const entry = getCategoryEntry(cat.name, i);
              return (
              <Link key={cat.id} to={`/categories/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    position: 'relative',
                    height: 320,
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    background: entry.fallbackGradient,
                  }}
                  onMouseEnter={e => {
                    const img = e.currentTarget.querySelector('.cat-img');
                    if (img) img.style.transform = 'scale(1.08)';
                    e.currentTarget.querySelector('.cat-btn').style.background = '#CE2B37';
                  }}
                  onMouseLeave={e => {
                    const img = e.currentTarget.querySelector('.cat-img');
                    if (img) img.style.transform = 'scale(1)';
                    e.currentTarget.querySelector('.cat-btn').style.background = '#009246';
                  }}
                >
                  {/* Photo */}
                  <img
                    className="cat-img"
                    src={entry.url}
                    alt={cat.name}
                    onError={e => { e.target.style.display = 'none'; }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />

                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
                  }} />

                  {/* Italian flag accent top-left */}
                  <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 3 }}>
                    <div style={{ width: 5, height: 22, background: '#009246', borderRadius: 3 }} />
                    <div style={{ width: 5, height: 22, background: '#fff', borderRadius: 3 }} />
                    <div style={{ width: 5, height: 22, background: '#CE2B37', borderRadius: 3 }} />
                  </div>

                  {/* Text at bottom */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: 12, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                      {cat.name}
                    </div>
                    <div
                      className="cat-btn"
                      style={{
                        display: 'inline-block',
                        background: '#009246',
                        color: '#fff',
                        padding: '7px 18px',
                        borderRadius: 6,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        transition: 'background 0.2s',
                      }}
                    >
                      Découvrir →
                    </div>
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
