import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';

/**
 * Product Detail Page
 * Shows detailed information about a single product
 */
const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart, isInCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/products/${id}`);

                if (response.data.success) {
                    setProduct(response.data.data);

                    // Fetch related products from same category
                    const relatedResponse = await axios.get(
                        `${API_BASE_URL}/products?category=${response.data.data.category}`
                    );

                    if (relatedResponse.data.success) {
                        // Filter out current product and limit to 4 items
                        const related = relatedResponse.data.data
                            .filter(p => p._id !== id)
                            .slice(0, 4);
                        setRelatedProducts(related);
                    }
                }
            } catch (err) {
                setError('Failed to load product details.');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0); // Scroll to top when product changes
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product, quantity);
            // Navigate to cart would go here
            window.location.href = '/cart';
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">{error || 'Product not found'}</p>
                    <Link to="/shop" className="btn-primary">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-12">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center text-sm text-gray-600">
                    <Link to="/" className="hover:text-gray-900">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/shop" className="hover:text-gray-900">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{product.name}</span>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Product Images */}
                        <div>
                            {/* Main Image */}
                            <div className="mb-4 rounded-xl overflow-hidden">
                                <img
                                    src={product.images[selectedImage] || product.images[0]}
                                    alt={product.name}
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                                                ? 'border-gray-900 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-24 object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            {/* Category */}
                            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                                {product.category}
                            </p>

                            {/* Product Name */}
                            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">({product.rating} stars)</span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stock > 0 ? (
                                    <p className="text-green-600 font-medium">
                                        ✓ In Stock ({product.stock} available)
                                    </p>
                                ) : (
                                    <p className="text-red-600 font-medium">✗ Out of Stock</p>
                                )}
                            </div>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity
                                </label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        disabled={quantity >= product.stock}
                                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(relatedProduct => (
                                <ProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
