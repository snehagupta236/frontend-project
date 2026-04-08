import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cart, dispatch, totalPrice } = useCart();

  const handleCheckout = () => {
    dispatch({ type: 'CLEAR' });
    alert('✅ Order placed! Thank you for shopping.');
  };

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <p className="text-6xl mb-4">🛒</p>
          <p className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</p>
          <p className="text-sm mb-6">Add some products to get started</p>
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Cart Items — CartItem component use ho raha hai */}
          <div className="flex-1 flex flex-col gap-3">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-72">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Order Summary</h2>

              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free 🎉' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between font-semibold text-gray-800 mb-5">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-400 mb-4 text-center">
                  Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                </p>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-sm font-medium transition"
              >
                Proceed to Checkout →
              </button>

              <Link
                to="/"
                className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-3 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}