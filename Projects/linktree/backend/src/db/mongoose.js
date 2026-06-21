import mongoose from "mongoose";
import configObj from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(configObj.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Error connecting MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
