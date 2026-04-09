import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://dummyjson.com/products?limit=100', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const formatted = data.products.map(item => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price),
          category: item.category,
          image: item.thumbnail,
          rating: item.rating,
          stock: item.stock,
        }));
        setProducts(formatted);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError('Failed to load products');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
