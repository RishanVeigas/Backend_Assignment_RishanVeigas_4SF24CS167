const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

        // Get Token
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. No token provided"
            });
        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach User Data
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;