
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

const allowedRoles = [
    "student",
    "faculty",
    "placement_officer",
    "admin"
];

// Remove password before sending a user in an API response
const safeUser = (user) => {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

// POST - Create a new user
router.post("/", async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        name = name.trim();
        email = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters"
            });
        }

        if (role !== undefined && !allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Invalid user role"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "User created successfully",
            user: safeUser(user)
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid user data",
                error: error.message
            });
        }

        return res.status(500).json({
            message: "Failed to create user"
        });
    }
});

// GET - Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch users"
        });
    }
});

// GET - Get one user by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch user"
        });
    }
});

// PUT - Update a user
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, isActive } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    message: "Name cannot be empty"
                });
            }

            user.name = name.trim();
        }

        if (email !== undefined) {
            if (
                typeof email !== "string" ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
            ) {
                return res.status(400).json({
                    message: "Please provide a valid email address"
                });
            }

            user.email = email.trim().toLowerCase();
        }

        if (password !== undefined) {
            if (
                typeof password !== "string" ||
                password.length < 8
            ) {
                return res.status(400).json({
                    message: "Password must contain at least 8 characters"
                });
            }

            user.password = await bcrypt.hash(password, 12);
        }

        if (role !== undefined) {
            if (!allowedRoles.includes(role)) {
                return res.status(400).json({
                    message: "Invalid user role"
                });
            }

            user.role = role;
        }

        if (isActive !== undefined) {
            if (typeof isActive !== "boolean") {
                return res.status(400).json({
                    message: "isActive must be true or false"
                });
            }

            user.isActive = isActive;
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            message: "User updated successfully",
            user: safeUser(updatedUser)
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid user data",
                error: error.message
            });
        }

        return res.status(500).json({
            message: "Failed to update user"
        });
    }
});

// DELETE - Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete user"
        });
    }
});

module.exports = router;
