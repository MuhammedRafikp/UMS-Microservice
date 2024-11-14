import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('DB connected successfully!');
  } catch (error) {
    console.error('Failed to connect DB:', error);
    process.exit(1);  // Exit process if DB connection fails
  }
};
