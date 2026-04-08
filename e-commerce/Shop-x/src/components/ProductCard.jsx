import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="h-40 flex items-center justify-center bg-gray-50 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs font-medium text-gray-800 mb-1 line-clamp-2 hover:text-red-500 transition leading-relaxed">
            {product.name}
          </h3>
        </Link>
        <p className="text-red-500 font-semibold text-sm mt-1">${product.price}</p>
        <p className="text-xs text-gray-400 mt-1">
          {'★'.repeat(Math.floor(product.rating))} {product.rating}
        </p>
        <button
          onClick={() => dispatch({ type: 'ADD', product })}
          className="mt-3 w-full bg-gray-900 hover:bg-red-500 text-white text-xs py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}