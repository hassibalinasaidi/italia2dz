import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(({ data }) => {
      const cats = data.results ?? data;
      const cat = cats.find(c => c.slug === slug);
      if (cat) setCategoryName(cat.name);
    });
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    const params = { category: slug };
    if (search) params.search = search;
    getProducts(params)
      .then(({ data }) => setProducts(data.results ?? data))
      .finally(() => setLoading(false));
  }, [slug, search]);

  return (
    <div>

      {/* ── BACK + TITLE ─────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <Link to="/" style={{ color: '#009246', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          ← Retour aux catégories
        </Link>
        <div style={{ height: 2, background: 'linear-gradient(to right, #009246, #ffffff, #CE2B37)', borderRadius: 2, marginBottom: 24 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: '#009246', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 4 }}>Catégorie</p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#1a1a1a' }}>{categoryName || '...'}</h1>
          </div>
          <input
            style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, color: '#1a1a1a', fontSize: '0.88rem', minWidth: 220, outline: 'none' }}
            placeholder="🔍  Rechercher dans cette catégorie..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ── PRODUCTS ─────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Chargement...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>📦</div>
          <p>Aucun produit dans cette catégorie pour l'instant.</p>
          <Link to="/" style={{ color: '#009246', fontWeight: 600 }}>Retour aux catégories</Link>
        </div>
      ) : (
        <>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: 20 }}>{products.length} article{products.length > 1 ? 's' : ''}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 22 }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}

    </div>
  );
}
