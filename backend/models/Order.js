import mongoose from 'mongoose';

/**
 * Order Schema
 * Stores customer orders with items, shipping info, and status
 */
const orderSchema = new mongoose.Schema({
    // Customer Information
    customerInfo: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            required: true,
            trim: true
        }
    },

    // Order Items
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        image: {
            type: String,
            required: true
        }
    }],

    // Order Totals
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    tax: {
        type: Number,
        required: true,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },

    // Order Status
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    // Order Notes (optional)
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Create indexes for faster queries
orderSchema.index({ 'customerInfo.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
