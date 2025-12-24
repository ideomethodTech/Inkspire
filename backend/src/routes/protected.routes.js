import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user,
  });
});

export default router;
