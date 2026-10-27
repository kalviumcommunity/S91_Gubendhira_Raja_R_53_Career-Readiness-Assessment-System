
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Step 1: Verify the JWT and check that the user is active
const authenticateToken = async (req, res, next) => {
    const authorization = req.headers.authorization;

    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required. Please log in."
        });
    }

    try {
        const claims = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(claims.sub)
            .select("role isActive");

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User account is unavailable"
            });
        }

        // Store verified user information on the request
        req.auth = {
            sub: user.id,
            role: user.role
        };

        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

// Step 2: Allow only specified roles
const requireRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.auth) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.auth.role)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        return next();
    };
};

// Step 3: Admin-only permission
const requireAdmin = requireRoles("admin");

module.exports = {
    authenticateToken,
    requireRoles,
    requireAdmin
};
