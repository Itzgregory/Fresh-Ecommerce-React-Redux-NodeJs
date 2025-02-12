const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHead = req.headers.authorization;
   
    if (!authHead?.startsWith('Bearer ')) {
        return res.status(400).json({
            success: false,
            message: 'Token not attached to the header',
            data: null,
        });
    }

    const token = authHead.split(' ')[1];  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized: Token is expired. Please login again',
                data: null,
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                data: null,
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null,
        });
    }
});

module.exports = { authMiddleware };
