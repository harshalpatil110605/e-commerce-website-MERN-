import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

/**
 * Seed Admin User
 * Creates a default admin account for testing
 */
const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@luxehome.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin account already exists');
            console.log('📧 Email: admin@luxehome.com');
            console.log('🔑 Password: admin123');
            process.exit(0);
            return;
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@luxehome.com',
            password: 'admin123', // In production, this should be hashed
            role: 'admin'
        });

        console.log('✨ Admin account created successfully!');
        console.log('\n📋 Admin Credentials:');
        console.log('📧 Email: admin@luxehome.com');
        console.log('🔑 Password: admin123');
        console.log('\n⚠️  Please change the password after first login!\n');

        // Exit process
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

// Run the seed function
seedAdmin();
