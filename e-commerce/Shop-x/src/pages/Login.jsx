import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setError('');

    // Basic validation
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!isLogin && !form.name) {
      setError('Please enter your name');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate login
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('user', JSON.stringify({ name: form.name || 'User', email: form.email }));
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-red-500 tracking-widest">
            SHOPX
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">

          {/* Toggle Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition
                ${isLogin ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition
                ${!isLogin ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-lg mb-4">
              ⚠️ {error}
            </div>
          )}

          {/* Name Field — only signup mein */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="demo@shopx.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-3 rounded-xl text-sm font-medium transition"
          >
            {loading
              ? '⏳ Please wait...'
              : isLogin ? 'Sign In →' : 'Create Account →'}
          </button>

          {/* Demo hint */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Demo mode — any email & password works
          </p>

        </div>

        {/* Back to shop */}
        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/" className="hover:text-red-400 transition">
            ← Back to Shop
          </Link>
        </p>

      </div>
    </div>
  );
}