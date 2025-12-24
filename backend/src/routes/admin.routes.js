import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", authenticate, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin 👑",
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Admin stats (placeholder)
router.get("/stats", authenticate, adminOnly, async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Admin statistics",
      data: {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        revenue: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;