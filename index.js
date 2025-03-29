const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./src/routes/authRoutes.js");
const doctorRoutes = require("./src/routes/doctorRoutes.js"); // Include Doctor Routes
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for API security

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes); // Add Doctor Routes

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
