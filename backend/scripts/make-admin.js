import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { db } from '../src/config/firebase.js';

async function makeAdmin() {
  try {
    const userId = 'ma4eQsJRH6OEnr5GkSwxBU8HU7X2'; // Your user ID
    
    console.log('👑 Making user admin...');
    console.log('User ID:', userId);
    
    // Update user role to admin
    await db.collection('users').doc(userId).set({
      uid: userId,
      email: 'testuser1@gmail.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, { merge: true });
    
    console.log('✅ User updated to admin role');
    
    // Verify
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    console.log('\n📋 User details:');
    console.log('Email:', userData.email);
    console.log('Role:', userData.role);
    console.log('Created:', userData.createdAt);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();
