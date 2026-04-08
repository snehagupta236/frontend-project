import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Single product fetch
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        const formatted = {
          id: data.id,
          name: data.title,
          price: Math.round(data.price),
          category: data.category,
          image: data.image,
          rating: data.rating.rate,
          stock: Math.floor(Math.random() * 50) + 10,
          description: data.description,
        };
        setProduct(formatted);

        // Related products fetch
        fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(data.category)}`)
          .then(r => r.json())
          .then(rel => {
            const relFormatted = rel
              .filter(r => r.id !== data.id)
              .slice(0, 4)
              .map(r => ({
                id: r.id,
                name: r.title,
                price: Math.round(r.price),
                image: r.image,
              }));
            setRelated(relFormatted);
          });

        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD', product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto p-6 animate-pulse">
          <div className="bg-white rounded-2xl p-6 flex gap-8">
            <div className="w-72 h-64 bg-gray-200 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 rounded mb-3 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <p className="text-6xl mb-4">😕</p>
          <p className="text-lg font-medium text-gray-600 mb-2">Product not found</p>
          <Link to="/" className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm mt-4">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = cart.find(i => i.id === product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-red-400 transition">Home</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{product.name}</span>
        </div>

        {/* Main Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-8 mb-8">

          {/* Image */}
          <div className="w-full md:w-72 h-64 bg-gray-50 rounded-xl flex items-center justify-center p-6 flex-shrink-0">
            <img src={product.image} alt={product.name} className="h-full object-contain" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full capitalize mb-3">
              {product.category}
            </span>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-sm">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="text-sm text-gray-400">{product.rating} out of 5</span>
            </div>
            <p className="text-3xl font-bold text-red-500 mb-1">${product.price}</p>
            <p className="text-xs text-gray-400 mb-4">Inclusive of all taxes</p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-gray-800 text-lg">−</button>
                <span className="text-sm font-semibold w-5 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="text-gray-500 hover:text-gray-800 text-lg">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition
                  ${added ? 'bg-green-500 text-white' : 'bg-gray-900 hover:bg-red-500 text-white'}`}
              >
                {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
              </button>
            </div>

            {cartItem && (
              <p className="text-xs text-gray-400 mt-3">
                Already {cartItem.qty} in your cart.{' '}
                <Link to="/cart" className="text-red-400 hover:underline">View Cart →</Link>
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-800 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center"
                >
                  <img src={p.image} alt={p.name} className="h-20 object-contain mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700 line-clamp-2">{p.name}</p>
                  <p className="text-red-500 font-semibold text-sm mt-1">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}