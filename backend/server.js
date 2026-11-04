
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be configured before starting the server");
}

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Career Readiness Assessment API is running"
    });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/uploads", uploadRoutes);

// Handle upload and other server errors
app.use((error, req, res, next) => {
    console.error("Server error:", error.message);

    if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            message: "File size must not exceed 5 MB."
        });
    }

    if (error.statusCode) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    return res.status(500).json({
        message: "Something went wrong on the server."
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
