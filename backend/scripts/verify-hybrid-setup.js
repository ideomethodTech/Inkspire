import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/mongo/user.model.js';
import Product from '../src/models/mongo/product.model.js';

dotenv.config({ path: './.env' });

async function verifySetup() {
  console.log('🔍 Verifying Hybrid Setup (Firebase + MongoDB)...\n');
  
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    
    // 2. Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 MongoDB Collections:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // 3. Count documents
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    
    console.log('\n📊 Document Counts:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Products: ${productCount}`);
    
    // 4. Show sample data
    console.log('\n👤 Sample Users:');
    const sampleUsers = await User.find().limit(2).lean();
    sampleUsers.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.role}) - FirebaseUID: ${user.firebaseUid}`);
    });
    
    console.log('\n📦 Sample Products:');
    const sampleProducts = await Product.find().limit(2).lean();
    sampleProducts.forEach((product, i) => {
      console.log(`   ${i+1}. ${product.name} (${product.type}) - ₹${product.price}`);
    });
    
    // 5. Check indexes
    console.log('\n🔍 Index Information:');
    
    const userIndexes = await User.collection.indexes();
    console.log(`   User collection has ${userIndexes.length} indexes`);
    
    const productIndexes = await Product.collection.indexes();
    console.log(`   Product collection has ${productIndexes.length} indexes`);
    
    // 6. Verify text search index
    const textIndex = productIndexes.find(index => index.textIndexVersion);
    if (textIndex) {
      console.log('   ✅ Text search index is ready');
    } else {
      console.log('   ⚠️  Text search index not found (run create-text-index.js)');
    }
    
    console.log('\n🎉 Hybrid setup verification complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Test login with existing user');
    console.log('   2. Test product APIs');
    console.log('   3. Run: node scripts/create-text-index.js (if needed)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verifySetup();