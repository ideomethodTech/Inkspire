import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: { 
    type: String, 
    required: true, 
    unique: true   // This automatically creates the index — no need to duplicate
  },
  
  authProvider: { 
    type: String, 
    enum: ['password', 'google.com', 'phone'],
    default: 'password'
  },
  
  email: { 
    type: String, 
    required: true, 
    unique: true,     // This automatically creates the index
    lowercase: true,
    trim: true
  },
  
  displayName: String,
  photoURL: String,
  phoneNumber: String,
  
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  
  emailVerified: { 
    type: Boolean, 
    default: false 
  },
  
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLoginAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// === FIXED: Changed to async pre-save (no 'next' parameter or call) ===
userSchema.pre('save', async function() {
  this.updatedAt = new Date();
});
// ===================================================================

// Only add indexes that are NOT created by unique: true
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model('User', userSchema);
export default User;