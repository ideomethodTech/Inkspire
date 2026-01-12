import dotenv from 'dotenv';
import mongoose from 'mongoose';
import admin from '../src/config/firebase.js';
import User from '../src/models/mongo/user.model.js';
import Product from '../src/models/mongo/product.model.js'; // Correct path now

dotenv.config({ path: './.env' });

async function migrateData() {
  console.log('🚀 Starting migration from Firebase to MongoDB...\n');
  
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // ========== CHECK EXISTING DATA ==========
    const existingUsers = await User.countDocuments();
    const existingProducts = await Product.countDocuments();
    
    console.log(`\n📊 Existing data in MongoDB:`);
    console.log(`   Users: ${existingUsers}`);
    console.log(`   Products: ${existingProducts}`);
    
    if (existingUsers > 0 || existingProducts > 0) {
      console.log('\n⚠️  MongoDB already has data.');
      console.log('💡 If you want fresh migration, delete collections first with:');
      console.log('   await User.deleteMany({});');
      console.log('   await Product.deleteMany({});');
    }
    
    // ========== MIGRATE USERS FROM FIREBASE AUTH ==========
    console.log('\n👤 Syncing users from Firebase Auth...');
    
    try {
      const listUsersResult = await admin.auth().listUsers();
      const firebaseUsers = listUsersResult.users;
      console.log(`   Found ${firebaseUsers.length} users in Firebase Auth`);
      
      let syncedUsers = 0;
      for (const firebaseUser of firebaseUsers) {
        try {
          const existingUser = await User.findOne({ firebaseUid: firebaseUser.uid });
          
          if (!existingUser) {
            const user = new User({
              firebaseUid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              phoneNumber: firebaseUser.phoneNumber || '',
              authProvider: firebaseUser.providerData[0]?.providerId || 'password',
              role: firebaseUser.email === 'testuser1@gmail.com' ? 'admin' : 'user',
              emailVerified: firebaseUser.emailVerified || false,
              createdAt: new Date(firebaseUser.metadata.creationTime),
              lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || firebaseUser.metadata.creationTime),
              updatedAt: new Date()
            });
            
            await user.save();
            syncedUsers++;
            console.log(`   ✅ Synced: ${user.email} (${user.role})`);
          }
        } catch (error) {
          console.log(`   ⚠️  Could not sync user ${firebaseUser.uid}: ${error.message}`);
        }
      }
      
      if (syncedUsers > 0) {
        console.log(`   ✅ Synced ${syncedUsers} users to MongoDB`);
      } else {
        console.log(`   ⏭️  All users already synced`);
      }
    } catch (error) {
      console.log(`   ⚠️  Could not fetch Firebase users: ${error.message}`);
    }
    
    // ========== CREATE SAMPLE PRODUCTS IF NONE EXIST ==========
    console.log('\n📦 Checking products...');
    
    if (existingProducts === 0) {
      console.log('   Creating sample products...');
      
      const sampleProducts = [
        {
          name: 'Minimalist Mountain Poster',
          type: 'poster',
          category: 'Nature',
          description: 'Beautiful minimalist mountain landscape',
          price: 299,
          variants: [
            { size: 'A3', price: 299, stock: 50 },
            { size: 'A4', price: 199, stock: 100 }
          ],
          images: ['https://picsum.photos/400/600?random=1'],
          tags: ['nature', 'minimalist', 'mountain'],
          featured: true,
          trending: true,
          active: true
        },
        {
          name: 'Beginner Watercolor Kit',
          type: 'kit',
          category: 'Art Supplies',
          description: 'Complete watercolor painting kit for beginners',
          price: 1499,
          variants: [
            { size: 'Small', price: 999, stock: 30 },
            { size: 'Medium', price: 1499, stock: 50 },
            { size: 'Large', price: 1999, stock: 20 }
          ],
          images: ['https://picsum.photos/400/600?random=2'],
          tags: ['watercolor', 'beginner', 'kit'],
          bestseller: true,
          active: true
        },
        {
          name: 'Cute Animal Sticker Pack',
          type: 'sticker',
          category: 'Stationery',
          description: 'Pack of 12 cute animal stickers',
          price: 99,
          variants: [
            { size: 'Pack of 12', price: 99, stock: 200 },
            { size: 'Pack of 24', price: 179, stock: 100 }
          ],
          images: ['https://picsum.photos/400/600?random=3'],
          tags: ['cute', 'animals', 'stickers'],
          trending: true,
          active: true
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log(`   ✅ Created ${sampleProducts.length} sample products`);
    } else {
      console.log(`   ⏭️  Already have ${existingProducts} products`);
    }
    
    // ========== FINAL SUMMARY ==========
    const finalUserCount = await User.countDocuments();
    const finalProductCount = await Product.countDocuments();
    
    console.log(`\n🎉 Migration completed!`);
    console.log(`📊 Final Summary:`);
    console.log(`   Users in MongoDB: ${finalUserCount}`);
    console.log(`   Products in MongoDB: ${finalProductCount}`);
    console.log(`\n✨ Hybrid setup ready: Firebase Auth + MongoDB Data`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrateData();
