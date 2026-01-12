import { auth } from "../config/firebase.js";
import { generateToken } from "../utils/jwt.js";
import User from "../models/mongo/user.model.js";

/**
 * REGISTER - Creates user in Firebase + MongoDB
 */
export const register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password required" 
      });
    }

    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: displayName || email.split('@')[0],
      emailVerified: false
    });

    // 2. Create user in MongoDB
    const user = new User({
      firebaseUid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || email.split('@')[0],
      authProvider: 'password',
      role: 'user',
      emailVerified: false
    });
    
    await user.save();
    console.log(`✅ New user created in MongoDB: ${user.email}`);

    // 3. Generate JWT with MongoDB user ID
    const token = generateToken({
      userId: user._id,
      firebaseUid: user.firebaseUid,
      role: user.role,
      email: user.email
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        userId: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        emailVerified: user.emailVerified
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    
    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * LOGIN - Syncs user from Firebase to MongoDB
 */
export const login = async (req, res) => {
  try {
    // === ADDED SAFETY CHECK TO PREVENT req.body undefined crash ===
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: no body"
      });
    }

    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ 
        success: false,
        message: "idToken is required" 
      });
    }
    // ==============================================================

    // 1. Verify Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;
    const displayName = decodedToken.name || '';
    const photoURL = decodedToken.picture || '';
    const authProvider = decodedToken.firebase?.sign_in_provider || 'password';
    const emailVerified = decodedToken.email_verified || false;

    // 2. Sync user to MongoDB (create or update)
    let user = await User.findOne({ firebaseUid });
    
    if (!user) {
      // Create new user in MongoDB
      user = new User({
        firebaseUid,
        email,
        displayName,
        photoURL,
        authProvider,
        emailVerified,
        role: 'user'
      });
      await user.save();
      console.log(`✅ New user synced to MongoDB: ${email}`);
    } else {
      // Update existing user
      user.displayName = displayName || user.displayName;
      user.photoURL = photoURL || user.photoURL;
      user.authProvider = authProvider;
      user.emailVerified = emailVerified;
      user.lastLoginAt = new Date();
      await user.save();
      console.log(`✅ User updated in MongoDB: ${email}`);
    }

    // 3. Generate JWT
    const token = generateToken({
      userId: user._id,
      firebaseUid: user.firebaseUid,
      role: user.role,
      email: user.email
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        emailVerified: user.emailVerified,
        authProvider: user.authProvider
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        success: false,
        message: "Token expired, please login again" 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
};

/**
 * GET USER PROFILE - From MongoDB
 */
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = await User.findById(userId).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    return res.json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        userId: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        emailVerified: user.emailVerified,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt
      }
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};