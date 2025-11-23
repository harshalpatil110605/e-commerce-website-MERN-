import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

/**
 * Cart Page
 * Shows all items in cart with quantity controls
 */
const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

    const total = getCartTotal();
    const itemCount = getCartCount();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-12">
                {/* Page Header */}
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                    Shopping Cart
                </h1>
                <p className="text-gray-600 mb-8">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item._id} className="bg-white rounded-2xl shadow-soft p-6">
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <Link to={`/product/${item._id}`} className="flex-shrink-0">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-grow">
                                            <Link to={`/product/${item._id}`}>
                                                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 hover:text-accent-gold transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-600 text-sm mb-4">{item.category}</p>

                                            <div className="flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-lg font-semibold w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatPrice(item.price)} each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span className="font-semibold">{formatPrice(total * 0.1)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>{formatPrice(total * 1.1)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout" className="btn-primary w-full text-center block mb-4">
                                Proceed to Checkout
                            </Link>

                            <Link to="/shop" className="btn-outline w-full text-center block">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
