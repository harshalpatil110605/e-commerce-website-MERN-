import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * Order Routes
 * Handles order creation, retrieval, and status updates
 */

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { customerInfo, items, subtotal, tax, total, notes } = req.body;

        // Validate required fields
        if (!customerInfo || !items || !items.length || !subtotal || !tax || !total) {
            return res.status(400).json({
                success: false,
                message: 'Missing required order information'
            });
        }

        // Create new order
        const order = new Order({
            customerInfo,
            items,
            subtotal,
            tax,
            total,
            notes: notes || ''
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        });
    }
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 }) // Most recent first
            .populate('items.productId', 'name category'); // Populate product details

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        });
    }
});

// Get orders by user email
router.get('/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // Ensure email is lowercase for matching
        const normalizedEmail = email.toLowerCase();

        const orders = await Order.find({ 'customerInfo.email': normalizedEmail })
            .sort({ createdAt: -1 })
            .populate('items.productId', 'name category');

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user orders',
            error: error.message
        });
    }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.productId', 'name category');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order',
            error: error.message
        });
    }
});

// Update order status (Admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update order status',
            error: error.message
        });
    }
});

// Delete order (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete order',
            error: error.message
        });
    }
});

export default router;
