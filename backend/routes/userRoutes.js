const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST - Create a new user
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
});

// GET - Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

module.exports = router;