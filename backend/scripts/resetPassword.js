import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

/**
 * Update user password
 */
const updatePassword = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const email = 'harshal11@gmail.com';
        const newPassword = 'harshal123';

        // Find and update user
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User with email ${email} not found`);
            console.log('\n📋 Available users:');
            const allUsers = await User.find({});
            allUsers.forEach(u => {
                console.log(`   - ${u.email} (${u.role})`);
            });
            process.exit(1);
            return;
        }

        // Update password
        user.password = newPassword;
        await user.save();

        console.log('\n✨ Password updated successfully!');
        console.log('\n📋 Login Credentials:');
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Password: ${newPassword}`);
        console.log(`👤 Role: ${user.role}`);
        console.log(`📛 Name: ${user.name}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

// Run the function
updatePassword();
