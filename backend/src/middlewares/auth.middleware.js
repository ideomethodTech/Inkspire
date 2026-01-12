import { verifyToken } from "../utils/jwt.js";
import User from "../models/mongo/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized: No token provided" 
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Verify user still exists in MongoDB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Store user info in request
    req.user = {
      userId: user._id,
      firebaseUid: user.firebaseUid,
      role: user.role,
      email: user.email
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token expired, please login again" 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: "Authentication failed" 
    });
  }
};

/**
 * Admin-only middleware
 */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only ❌"
    });
  }
  next();
};