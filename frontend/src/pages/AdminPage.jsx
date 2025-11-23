import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { formatPrice } from '../utils/formatPrice';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Admin Page
 * Simple CRUD interface for managing products
 */
const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState('products');
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        images: '',
        stock: '',
        rating: '4.5',
        tags: ''
    });

    // Fetch all products
    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/products`);
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            setOrdersLoading(true);
            const response = await axios.get(`${API_BASE_URL}/orders`);
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to load orders');
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, {
                status: newStatus
            });

            if (response.data.success) {
                alert('Order status updated successfully!');
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingProduct) {
            await handleUpdate();
        } else {
            await handleAdd();
        }
    };

    const handleAdd = async () => {
        try {
            // Convert comma-separated strings to arrays
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                rating: Number(formData.rating),
                images: formData.images.split(',').map(img => img.trim()),
                tags: formData.tags.split(',').map(tag => tag.trim())
            };

            const response = await axios.post(`${API_BASE_URL}/products`, productData);

            if (response.data.success) {
                alert('Product added successfully!');
                resetForm();
                fetchProducts();
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdate = async () => {
        try {
            // Convert comma-separated strings to arrays
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                rating: Number(formData.rating),
                images: formData.images.split(',').map(img => img.trim()),
                tags: formData.tags.split(',').map(tag => tag.trim())
            };

            const response = await axios.put(`${API_BASE_URL}/products/${editingProduct._id}`, productData);

            if (response.data.success) {
                alert('Product updated successfully!');
                resetForm();
                fetchProducts();
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            images: product.images.join(', '),
            stock: product.stock.toString(),
            rating: product.rating.toString(),
            tags: product.tags.join(', ')
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        setSelectedFiles([]);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            images: '',
            stock: '',
            rating: '4.5',
            tags: ''
        });
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        if (files.length > 0) {
            setUploading(true);
            try {
                const formDataToUpload = new FormData();
                files.forEach(file => formDataToUpload.append('images', file));

                const response = await axios.post(`${API_BASE_URL}/products/upload`, formDataToUpload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    const uploadedPaths = response.data.data;
                    // Prepend with API base URL for full path
                    const fullPaths = uploadedPaths.map(path => `http://localhost:5000${path}`);

                    // Merge with existing images
                    const existingImages = formData.images ? formData.images.split(',').map(img => img.trim()).filter(Boolean) : [];
                    const allImages = [...fullPaths, ...existingImages];

                    setFormData(prev => ({
                        ...prev,
                        images: allImages.join(', ')
                    }));

                    alert('Images uploaded successfully!');
                }
            } catch (error) {
                console.error('Error uploading images:', error);
                alert('Failed to upload images: ' + (error.response?.data?.message || error.message));
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        try {
            const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

            if (response.data.success) {
                alert('Product deleted successfully!');
                fetchProducts(); // Refresh product list
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-12">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600">Manage your products and orders</p>
                    </div>

                    {activeTab === 'products' && (
                        <button
                            onClick={() => {
                                if (showForm) {
                                    resetForm();
                                } else {
                                    setShowForm(true);
                                }
                            }}
                            className="btn-primary"
                        >
                            {showForm ? 'Cancel' : '+ Add New Product'}
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => {
                            setActiveTab('products');
                            resetForm();
                        }}
                        className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'products'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Products ({products.length})
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('orders');
                            resetForm();
                        }}
                        className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'orders'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Orders ({orders.length})
                    </button>
                </div>

                {/* Add Product Form */}
                {showForm && activeTab === 'products' && (
                    <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="Luxury Velvet Sofa"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="Furniture"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="input-field resize-none"
                                    placeholder="Detailed product description..."
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="24899"
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="10"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating (1-5) *
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="4.5"
                                />
                            </div>

                            {/* Images */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Images (or use URLs below)
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="input-field"
                                    disabled={uploading}
                                />
                                {uploading && (
                                    <p className="text-sm text-blue-600 mt-2">Uploading images...</p>
                                )}
                                {selectedFiles.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        {selectedFiles.length} file(s) selected
                                    </p>
                                )}
                            </div>

                            {/* Image URLs (optional) */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URLs (comma-separated, optional)
                                </label>
                                <input
                                    type="text"
                                    name="images"
                                    value={formData.images}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                />
                            </div>

                            {/* Tags */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="luxury, modern, bestseller"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button type="submit" className="btn-primary w-full">
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Orders Section */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-display font-bold text-gray-900">
                                All Orders ({orders.length})
                            </h2>
                        </div>

                        {ordersLoading ? (
                            <LoadingSpinner />
                        ) : orders.length === 0 ? (
                            <div className="p-12 text-center text-gray-600">
                                No orders yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map(order => (
                                            <>
                                                <tr key={order._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="font-mono text-sm text-gray-600">
                                                            {order._id.slice(-8)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-900">{order.customerInfo.name}</div>
                                                        <div className="text-sm text-gray-500">{order.customerInfo.email}</div>
                                                        <div className="text-sm text-gray-500">{order.customerInfo.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {order.items.length} item(s)
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                                        {formatPrice(order.total)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                            className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                            'bg-red-100 text-red-800'
                                                                }`}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Processing">Processing</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                        >
                                                            {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                                                        </button>
                                                    </td>
                                                </tr>
                                                {expandedOrder === order._id && (
                                                    <tr>
                                                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                                                                    <p className="text-gray-600">
                                                                        {order.customerInfo.address}<br />
                                                                        {order.customerInfo.city}, {order.customerInfo.pincode}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
                                                                    <div className="space-y-2">
                                                                        {order.items.map((item, idx) => (
                                                                            <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-lg">
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.name}
                                                                                    className="w-16 h-16 object-cover rounded-lg"
                                                                                />
                                                                                <div className="flex-grow">
                                                                                    <div className="font-semibold text-gray-900">{item.name}</div>
                                                                                    <div className="text-sm text-gray-600">
                                                                                        Qty: {item.quantity} × {formatPrice(item.price)}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="font-semibold text-gray-900">
                                                                                    {formatPrice(item.price * item.quantity)}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="border-t border-gray-200 pt-3">
                                                                    <div className="flex justify-between text-gray-600 mb-1">
                                                                        <span>Subtotal:</span>
                                                                        <span>{formatPrice(order.subtotal)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-gray-600 mb-1">
                                                                        <span>Tax:</span>
                                                                        <span>{formatPrice(order.tax)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                                                        <span>Total:</span>
                                                                        <span>{formatPrice(order.total)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Products List */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-display font-bold text-gray-900">
                                All Products ({products.length})
                            </h2>
                        </div>

                        {loading ? (
                            <LoadingSpinner />
                        ) : products.length === 0 ? (
                            <div className="p-12 text-center text-gray-600">
                                No products found. Add your first product!
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {products.map(product => (
                                            <tr key={product._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">{product.name}</div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                                        {product.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">
                                                    {formatPrice(product.price)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 10
                                                        ? 'bg-green-100 text-green-800'
                                                        : product.stock > 0
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">⭐ {product.rating}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product._id, product.name)}
                                                            className="text-red-600 hover:text-red-800 font-medium transition-colors"
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
