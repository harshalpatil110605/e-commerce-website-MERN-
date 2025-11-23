import express from 'express';
import Product from '../models/Product.js';
import { upload } from '../config/uploadMiddleware.js';

const router = express.Router();

/**
 * POST /api/products/upload
 * Upload product images
 */
router.post('/upload', upload.array('images', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

        res.json({
            success: true,
            data: imagePaths
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading images',
            error: error.message
        });
    }
});

/**
 * GET /api/products
 * Get all products with optional filtering
 * Query params:
 *   - category: filter by category
 *   - minPrice: minimum price filter
 *   - maxPrice: maximum price filter
 *   - search: search by product name (case-insensitive)
 */
router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const { category, minPrice, maxPrice, search } = req.query;

        // Build filter object dynamically
        let filter = {};

        // Add category filter if provided
        if (category) {
            filter.category = category;
        }

        // Add price range filter if provided
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Add search filter if provided (searches in product name)
        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
        }

        // Fetch products from database with filters applied
        const products = await Product.find(filter).sort({ createdAt: -1 });

        // Return success response
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        // Return error response
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Return success response
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        // Return error response
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

/**
 * POST /api/products
 * Create a new product (for admin)
 */
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});

/**
 * PUT /api/products/:id
 * Update a product by ID (for admin)
 */
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
});

/**
 * DELETE /api/products/:id
 * Delete a product by ID (for admin)
 */
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
});

export default router;
