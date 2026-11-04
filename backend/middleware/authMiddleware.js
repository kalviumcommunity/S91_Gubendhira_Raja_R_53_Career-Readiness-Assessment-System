
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Check whether the user has a valid JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access token required"
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment variables");

            return res.status(500).json({
                message: "Server authentication configuration error"
            });
        }

        const claims = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(claims.sub)
            .select("role isActive");

        if (!user || user.isActive === false) {
            return res.status(401).json({
                message: "User unavailable or inactive"
            });
        }

        // Store authenticated user information for later middleware
        req.auth = {
            sub: user.id,
            role: user.role
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        console.error("Authentication error:", error.message);

        return res.status(500).json({
            message: "Authentication failed"
        });
    }
};

// 2. Allow only administrators
const requireAdmin = (req, res, next) => {
    if (!req.auth || req.auth.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required"
        });
    }

    next();
};

// 3. Allow only the specified roles
const requireRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.auth.role)) {
            return res.status(403).json({
                message: "Access denied. You do not have permission."
            });
        }

        next();
    };
};

// 4. Export all middleware functions
module.exports = {
    authenticateToken,
    requireAdmin,
    requireRoles
};
