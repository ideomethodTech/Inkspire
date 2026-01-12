import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Admin dashboard
router.get("/dashboard", authenticate, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin 👑",
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

export default router;