import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Data ko apne format mein convert karo
        const formatted = data.map(item => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price),
          category: item.category,
          image: item.image,      // emoji ki jagah real image aayegi
          rating: item.rating.rate,
          stock: Math.floor(Math.random() * 50) + 10,
        }));
        setProducts(formatted);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}