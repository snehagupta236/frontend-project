import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  // ✅ Fetch Products from Fake API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          category: item.category,
          stock: Math.floor(Math.random() * 50) + 1,
          image: "📦",
          rating: item.rating?.rate || 4
        }));
        setProducts(formatted);
      });

    // Dummy orders
    setOrders([
      { id: 1, customer: "Sneha", total: 120, status: "pending", date: "2026-04-08" },
      { id: 2, customer: "Rahul", total: 80, status: "processing", date: "2026-04-07" }
    ]);
  }, []);

  // Metrics
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // Form
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
    setForm(product);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.category || form.stock === '') {
      alert('Fill all fields');
      return;
    }

    if (editProduct) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editProduct.id
            ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: 4
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setShowForm(false);
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, status } : o)
    );
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      delivered: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${styles[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button onClick={() => setActiveTab('products')}>Products</button>
          <button onClick={() => setActiveTab('orders')}>Orders</button>
        </div>

        {/* Products */}
        {activeTab === 'products' && (
          <>
            <button onClick={openAddForm} className="mb-4 bg-red-500 text-white px-4 py-2">
              Add Product
            </button>

            {showForm && (
              <div className="mb-4">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
                <button onClick={handleSave}>Save</button>
              </div>
            )}

            {products.map(p => (
              <div key={p.id} className="border p-2 mb-2">
                {p.name} - ${p.price}
                <button onClick={() => openEditForm(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <>
            {orders.map(o => (
              <div key={o.id} className="border p-2 mb-2">
                {o.customer} - ${o.total}
                <StatusBadge status={o.status} />
                <select value={o.status} onChange={e => handleOrderStatus(o.id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}
