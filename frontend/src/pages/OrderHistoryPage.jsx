import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

/**
 * Order History Page
 * Displays a list of orders placed by the logged-in user
 */
const OrderHistoryPage = () => {
    const { user, isLoggedIn } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        if (isLoggedIn() && user) {
            fetchOrders();
        }
    }, [user, isLoggedIn]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            console.log('Fetching orders for email:', user.email);
            const response = await axios.get(`${API_BASE_URL}/orders/user/${user.email}`);
            console.log('Orders response:', response.data);
            if (response.data.success) {
                setOrders(response.data.data);
                console.log('Orders found:', response.data.data.length);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn()) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to view your order history.</p>
                    <Link to="/login" className="btn-primary">
                        Log In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-12">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                    My Orders
                </h1>
                <p className="text-gray-600 mb-8">Track and manage your past orders</p>

                {loading ? (
                    <LoadingSpinner />
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                        <div className="text-6xl mb-4">🛍️</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-2">No orders found for <strong>{user.email}</strong></p>
                        <p className="text-sm text-gray-500 mb-6">
                            Make sure you're logged in with the same email you used during checkout.
                        </p>
                        <Link to="/shop" className="btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                                {/* Order Header */}
                                <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order Placed</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total</p>
                                            <p className="text-sm font-medium text-gray-900">{formatPrice(order.total)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order #</p>
                                            <p className="text-sm font-mono text-gray-600">{order._id.slice(-8)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <button
                                            onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                        >
                                            {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>
                                </div>

                                {/* Order Items (Always visible preview) */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {formatPrice(item.price)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedOrder === order._id && (
                                    <div className="px-6 pb-6 pt-0 border-t border-gray-100 mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                                                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                                                    <p className="font-medium text-gray-900 mb-1">{order.customerInfo.name}</p>
                                                    <p>{order.customerInfo.address}</p>
                                                    <p>{order.customerInfo.city}, {order.customerInfo.pincode}</p>
                                                    <p className="mt-2">{order.customerInfo.phone}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                                                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Subtotal</span>
                                                        <span>{formatPrice(order.subtotal)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Tax</span>
                                                        <span>{formatPrice(order.tax)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Shipping</span>
                                                        <span className="text-green-600">Free</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900">
                                                        <span>Total</span>
                                                        <span>{formatPrice(order.total)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
