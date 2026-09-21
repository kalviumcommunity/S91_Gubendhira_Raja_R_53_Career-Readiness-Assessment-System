const express = require("express");
const User = require("../models/User");

const router = express.Router();

// WRITE - Create a new user
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

// READ - Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get users",
            error: error.message
        });
    }
});

module.exports = router;