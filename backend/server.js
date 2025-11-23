import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware
// CORS - allows frontend to make requests to backend
app.use(cors());

// Body parser - allows us to read JSON data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use('/uploads', express.static('uploads'));

// Routes
// All product-related routes will be prefixed with /api/products
app.use('/api/products', productRoutes);
// All auth-related routes will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// All order-related routes will be prefixed with /api/orders
app.use('/api/orders', orderRoutes);

// Root route - just to check if server is running
app.get('/', (req, res) => {
    res.json({
        message: '🛍️ E-commerce API is running!',
        endpoints: {
            products: '/api/products',
            productById: '/api/products/:id',
            signup: '/api/auth/signup',
            login: '/api/auth/login',
            adminLogin: '/api/auth/admin/login',
            orders: '/api/orders',
            orderById: '/api/orders/:id'
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
});
