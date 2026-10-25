import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  // Reuse the existing connection
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    throw error; // let the caller handle it, don't exit the process
  }
};

export default connectDB;