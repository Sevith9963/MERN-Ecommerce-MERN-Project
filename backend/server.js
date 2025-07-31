import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';

// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Connect to MongoDB
connectMongoDatabase();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Razorpay instance export
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.error(`Error: ${err.message}`);
  console.error('Server is shutting down due to uncaught exception');
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.error(`Error: ${err.message}`);
  console.error('Server is shutting down due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
