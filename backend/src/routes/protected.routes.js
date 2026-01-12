import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/auth.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user profile
router.get("/profile", getProfile);

// Test protected route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully ✅",
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

export default router;
