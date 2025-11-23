import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register a new user account
 */
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create new user (role defaults to 'user')
        const user = await User.create({
            name,
            email,
            password, // In production, hash this with bcrypt
            role: 'user'
        });

        // Return user data (excluding password)
        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating account',
            error: error.message
        });
    }
});

/**
 * POST /api/auth/login
 * Login for both users and admin
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password (in production, use bcrypt.compare)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Return user data (excluding password)
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

/**
 * POST /api/auth/admin/login
 * Admin-specific login (checks for admin role)
 */
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Return admin data
        res.json({
            success: true,
            message: 'Admin login successful',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

/**
 * GET /api/auth/verify
 * Verify if user is logged in (check localStorage token)
 */
router.get('/verify/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying user',
            error: error.message
        });
    }
});

export default router;
