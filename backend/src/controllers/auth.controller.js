import admin from "../config/firebase.js";
import { db } from "../config/firebase.js";
import { createUserDoc } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is required" 
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password required" 
      });
    }

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save user in Firestore
    await db.collection("users").doc(userRecord.uid).set(
      createUserDoc(userRecord)
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * LOGIN
 * Frontend sends Firebase ID Token
 */
export const login = async (req, res) => {
  try {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is required" 
      });
    }

    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ 
        success: false,
        message: "idToken is required" 
      });
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Fetch user from Firestore
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    const userData = userDoc.data();

    // Generate JWT
    const token = generateToken({
      uid,
      role: userData.role,
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        uid,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
};