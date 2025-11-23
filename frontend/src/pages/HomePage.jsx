import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Home Page
 * Landing page with hero section and featured products
 */
const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch featured products on component mount
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/products`);

                if (response.data.success) {
                    // Get first 6 products as featured
                    setFeaturedProducts(response.data.data.slice(0, 6));
                }
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600')] bg-cover bg-center opacity-20"></div>

                <div className="relative container-custom section-padding">
                    <div className="max-w-3xl animate-slide-up">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Transform Your Space with
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-500">
                                Luxury & Elegance
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                            Discover our curated collection of premium home decor and furniture.
                            Each piece is handpicked to bring sophistication and style to your living space.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/shop" className="btn-primary text-center">
                                Shop Collection
                            </Link>
                            <Link to="/about" className="btn-secondary text-center">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </section>

            {/* Featured Products Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                            Featured Collection
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Handpicked pieces that define luxury and comfort
                        </p>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 text-lg">{error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/shop" className="btn-outline">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Brand Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                                Crafting Beautiful Spaces Since 2020
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                At LuxeHome, we believe your home should be a reflection of your personality and style.
                                Our carefully curated collection brings together the finest pieces from around the world,
                                ensuring quality, elegance, and timeless design.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                From luxurious velvet sofas to handcrafted ceramic vases, every item in our collection
                                is selected with care and attention to detail. We're committed to helping you create
                                a space that's uniquely yours.
                            </p>
                            <Link to="/about" className="btn-primary">
                                Our Story
                            </Link>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600"
                                    alt="Interior design"
                                    className="rounded-2xl shadow-soft hover:shadow-xl transition-shadow duration-300"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600"
                                    alt="Home decor"
                                    className="rounded-2xl shadow-soft hover:shadow-xl transition-shadow duration-300 mt-8"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-gray-900 text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-400">Handpicked items crafted with the finest materials</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">Secure Payment</h3>
                            <p className="text-gray-400">Safe and secure checkout process</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-400">Quick and reliable shipping to your doorstep</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
