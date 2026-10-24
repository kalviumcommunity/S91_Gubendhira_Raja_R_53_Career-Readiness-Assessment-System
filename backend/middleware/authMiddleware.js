const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const claims = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(claims.sub).select("role isActive");

        if (!user || !user.isActive) {
            return res.status(401).json({ message: "User account is unavailable" });
        }

        req.auth = { sub: user.id, role: user.role };
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.auth.role !== "admin") {
        return res.status(403).json({ message: "Administrator access required" });
    }

    return next();
};

module.exports = { authenticateToken, requireAdmin };