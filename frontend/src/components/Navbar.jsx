import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar Component
 * Premium navigation bar with cart icon, user info, and authentication
 */
const Navbar = () => {
    const { getCartCount } = useCart();
    const { user, logout, isLoggedIn, isAdmin } = useAuth();
    const cartCount = getCartCount();

    return (
        <nav className="bg-white shadow-soft sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:shadow-glow transition-all duration-300">
                            <img
                                src="/Gemini_Generated_Image_35av1635av1635av.png"
                                alt="Artisan Home Decor Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-2xl font-display font-bold text-gray-900">
                            Artisan <span className="text-accent-gold">Home Decor</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform"
                        >
                            Home
                        </Link>
                        <Link
                            to="/shop"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform"
                        >
                            Shop
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform"
                        >
                            Contact
                        </Link>

                        {/* Admin Link - Only visible to admin users */}
                        {isLoggedIn() && isAdmin() && (
                            <Link
                                to="/admin"
                                className="text-gray-700 hover:text-accent-gold font-medium transition-colors duration-200 hover:scale-105 transform flex items-center space-x-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Admin</span>
                            </Link>
                        )}
                    </div>

                    {/* Right Side: User, Cart, Auth */}
                    <div className="flex items-center space-x-4">
                        {/* User Info / Auth Buttons */}
                        {isLoggedIn() ? (
                            <div className="flex items-center space-x-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <Link to="/orders" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                        My Orders
                                    </Link>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Cart Icon */}
                        <Link
                            to="/cart"
                            className="relative group"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-all duration-300">
                                <svg
                                    className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </div>

                            {/* Cart Count Badge */}
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
