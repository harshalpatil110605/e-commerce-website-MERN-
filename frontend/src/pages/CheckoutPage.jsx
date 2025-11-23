import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

/**
 * Checkout Page
 * Mock checkout form with order summary
 */
const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    const total = getCartTotal();
    const tax = total * 0.1;
    const grandTotal = total + tax;

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'pincode'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');

        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Prepare order data
            const orderData = {
                customerInfo: {
                    name: formData.name,
                    email: formData.email.toLowerCase(),
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    pincode: formData.pincode
                },
                items: cartItems.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.images[0]
                })),
                subtotal: total,
                tax: tax,
                total: grandTotal
            };

            // Save order to database
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                // Clear cart and navigate to success page
                clearCart();
                navigate('/order-success');
            } else {
                alert('Failed to place order: ' + result.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-12">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                Shipping Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Enter your address"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Surat"
                                    />
                                </div>

                                {/* Pincode */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pincode / ZIP *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="395010"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full mt-8">
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex gap-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-gray-900 text-sm">
                                                {item.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                Qty: {item.quantity} × {formatPrice(item.price)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (10%)</span>
                                    <span className="font-semibold">{formatPrice(tax)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>{formatPrice(grandTotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
