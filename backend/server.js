const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be configured before starting the server");
}

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Career Readiness Assessment API is running"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});