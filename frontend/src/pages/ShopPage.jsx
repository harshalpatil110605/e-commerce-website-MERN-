import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Shop Page
 * Product listing page with filters and search
 */
const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [searchQuery, setSearchQuery] = useState('');

    // Get unique categories from products
    const categories = ['All', ...new Set(products.map(p => p.category))];

    // Fetch all products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/products`);

                if (response.data.success) {
                    setProducts(response.data.data);
                    setFilteredProducts(response.data.data);
                }
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Apply filters whenever filter states change
    useEffect(() => {
        let result = [...products];

        // Category filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Price range filter
        if (priceRange.min) {
            result = result.filter(p => p.price >= Number(priceRange.min));
        }
        if (priceRange.max) {
            result = result.filter(p => p.price <= Number(priceRange.max));
        }

        // Search filter
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [selectedCategory, priceRange, searchQuery, products]);

    const handleClearFilters = () => {
        setSelectedCategory('All');
        setPriceRange({ min: '', max: '' });
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Shop Our Collection
                    </h1>
                    <p className="text-xl text-gray-600">
                        Discover {products.length} premium home decor items
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price Range
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    className="input-field w-1/2"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className="input-field w-1/2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleClearFilters}
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
                        <span className="font-semibold">{products.length}</span> products
                    </p>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                        <button
                            onClick={handleClearFilters}
                            className="mt-4 btn-outline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
