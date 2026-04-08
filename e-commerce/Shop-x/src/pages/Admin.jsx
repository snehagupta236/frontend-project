import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Admin() {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: '', stock: '', image: '' });

  // ─── Metrics ───────────────────────────────────────────
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // ─── Form Handlers ──────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditProduct(null);
    setForm({ name: '', price: '', category: '', stock: '', image: '📦' });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.category || !form.stock) {
      alert('Please fill all fields');
      return;
    }

    if (editProduct) {
      // Update existing
      setProducts(prev =>
        prev.map(p =>
          p.id === editProduct.id
            ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      // Add new
      const newProduct = {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        image: form.image || '📦',
        rating: 4.0,
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, status } : o)
    );
  };

  // ─── Status Badge ───────────────────────────────────────
  const StatusBadge = ({ status }) => {
    const styles = {
      delivered: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Manage your store</p>
          </div>
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-red-400 transition"
          >
            ← View Store
          </Link>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '↑ 12.4%', up: true },
            { label: 'Total Orders', value: totalOrders, change: '↑ 8.2%', up: true },
            { label: 'Products', value: totalProducts, change: 'in catalog', up: null },
            { label: 'Pending Orders', value: pendingOrders, change: 'need action', up: null },
          ].map(m => (
            <div key={m.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{m.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{m.value}</p>
              <p className={`text-xs mt-1 ${m.up === true ? 'text-green-500' : m.up === false ? 'text-red-400' : 'text-gray-400'}`}>
                {m.change}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {['products', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium capitalize border-b-2 transition -mb-px
                ${activeTab === tab
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Products Tab ── */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {products.length} products total
              </p>
              <button
                onClick={openAddForm}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                + Add Product
              </button>
            </div>

            {/* Add / Edit Form */}
            {showForm && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Product Name', name: 'name', type: 'text', placeholder: 'e.g. Wireless Earbuds' },
                    { label: 'Price ($)', name: 'price', type: 'number', placeholder: 'e.g. 79' },
                    { label: 'Stock', name: 'stock', type: 'number', placeholder: 'e.g. 50' },
                    { label: 'Image Emoji', name: 'image', type: 'text', placeholder: 'e.g. 🎧' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-xs text-gray-400 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
                    >
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="sports">Sports</option>
                      <option value="home">Home</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-gray-900 hover:bg-red-500 text-white text-sm px-5 py-2 rounded-lg transition"
                  >
                    {editProduct ? 'Update Product' : 'Save Product'}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="border border-gray-200 text-gray-500 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Product</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Category</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Price</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Stock</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Rating</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.image}</span>
                          <span className="font-medium text-gray-700">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-400">{p.category}</td>
                      <td className="px-4 py-3 text-red-500 font-medium">${p.price}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${p.stock <= 15 ? 'text-yellow-500' : 'text-gray-700'}`}>
                          {p.stock}
                          {p.stock <= 15 && <span className="text-xs ml-1 text-yellow-400">low</span>}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.rating} ★</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditForm(p)}
                            className="text-xs border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-100 transition text-gray-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-xs border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Orders Tab ── */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Order ID</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Total</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-700">{o.id}</td>
                    <td className="px-4 py-3 text-gray-600">{o.customer}</td>
                    <td className="px-4 py-3 text-red-500 font-medium">${o.total}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 text-gray-400">{o.date}</td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={e => handleOrderStatus(o.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-red-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}