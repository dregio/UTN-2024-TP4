import mongoose from "mongoose";
import { debugging, MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    debugging && console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`, error);
    process.exit(1);
  }
}