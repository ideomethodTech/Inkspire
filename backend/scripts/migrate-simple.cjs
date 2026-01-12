const mongoose = require('mongoose');
require('dotenv').config();

async function migrateSimple() {
  try {
    console.log('🚀 Starting simple MongoDB setup...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Create User model
    const User = mongoose.model('User', new mongoose.Schema({
      firebaseUid: { type: String, unique: true },
      email: { type: String, unique: true },
      role: { type: String, default: 'user' },
      createdAt: { type: Date, default: Date.now }
    }));
    
    // Create Product model
    const Product = mongoose.model('Product', new mongoose.Schema({
      name: String,
      type: String,
      price: Number,
      category: String,
      description: String,
      featured: Boolean,
      trending: Boolean,
      bestseller: Boolean,
      active: { type: Boolean, default: true },
      createdAt: { type: Date, default: Date.now }
    }));
    
    // Check existing data
    const existingUsers = await User.countDocuments();
    const existingProducts = await Product.countDocuments();
    
    console.log('📊 Current data:');
    console.log(`   Users: ${existingUsers}`);
    console.log(`   Products: ${existingProducts}`);
    
    // If no data, create sample data
    if (existingUsers === 0) {
      await User.create({
        firebaseUid: 'ma4eQsJRH6OEnr5GkSwxBU8HU7X2',
        email: 'testuser1@gmail.com',
        role: 'admin'
      });
      console.log('✅ Created admin user (testuser1@gmail.com)');
    }
    
    if (existingProducts === 0) {
      await Product.create([
        {
          name: 'Minimalist Mountain Poster',
          type: 'poster',
          price: 299,
          category: 'Nature',
          description: 'Beautiful minimalist mountain landscape',
          featured: true,
          trending: true,
          active: true
        },
        {
          name: 'Beginner Watercolor Kit',
          type: 'kit',
          price: 1499,
          category: 'Art Supplies',
          description: 'Complete watercolor painting kit for beginners',
          bestseller: true,
          active: true
        }
      ]);
      console.log('✅ Created 2 sample products');
    }
    
    // Final counts
    const finalUsers = await User.countDocuments();
    const finalProducts = await Product.countDocuments();
    
    console.log('\n🎉 MongoDB setup complete!');
    console.log(`📊 Final counts:`);
    console.log(`   Users: ${finalUsers}`);
    console.log(`   Products: ${finalProducts}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

migrateSimple();
