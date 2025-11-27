const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err; // ensures Vercel returns 500 correctly
  }
}

module.exports = connectDB;
