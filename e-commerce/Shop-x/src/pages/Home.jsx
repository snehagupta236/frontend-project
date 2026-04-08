import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../data/UseProducts';

const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

export default function Home() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');

  let filtered = products.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 min-h-screen bg-white border-r border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </p>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 capitalize transition
                ${category === cat
                  ? 'bg-gray-900 text-red-400 font-medium'
                  : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">

          {/* Search + Sort */}
          <div className="flex gap-3 mb-5">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-3">
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20 text-red-400">
              <p className="text-4xl mb-3">⚠️</p>
              <p>{error}</p>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Showing <span className="font-medium text-gray-800">{filtered.length}</span> products
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-4xl mb-3">🔍</p>
                  <p>No products found</p>
                </div>
              )}
            </>
          )}

        </main>
      </div>
    </div>
  );
}