import mongoose from 'mongoose';

/**
 * Product Schema
 * Defines the structure of product documents in MongoDB
 */
const productSchema = new mongoose.Schema({
    // Product name (e.g., "Luxury Velvet Sofa")
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },

    // Detailed description of the product
    description: {
        type: String,
        required: [true, 'Product description is required']
    },

    // Price in dollars
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },

    // Category (e.g., "Furniture", "Lighting", "Decor")
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },

    // Array of image URLs
    images: {
        type: [String],
        default: []
    },

    // Available stock quantity
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0
    },

    // Product rating (1-5 stars)
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
        default: 4.5
    },

    // Tags for filtering/searching (e.g., ["modern", "luxury", "bestseller"])
    tags: {
        type: [String],
        default: []
    },

    // Timestamp when product was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
