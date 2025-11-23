import mongoose from 'mongoose';

/**
 * User Schema
 * For customer accounts and admin accounts
 */
const userSchema = new mongoose.Schema({
    // User's full name
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    // Email (unique identifier)
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },

    // Password (will be stored as plain text for simplicity - in production use bcrypt)
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },

    // User role: 'user' or 'admin'
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    // Account creation date
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
