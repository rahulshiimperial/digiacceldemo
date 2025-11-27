const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../utils/db");
const taskRoutes = require("../routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// connect DB BEFORE routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});

// routes
app.get("/", (req, res) => res.send("To-Do List API is running"));
app.get("/test", (req, res) => res.send("Working!"));
app.use("/api/tasks", taskRoutes);

module.exports = serverless(app);
