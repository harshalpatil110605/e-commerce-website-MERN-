import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * This function establishes connection to MongoDB using the URI from .env file
 * Works with both local MongoDB and MongoDB Atlas
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    // Log success message with host information
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    // If connection fails, log error and exit the process
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;
