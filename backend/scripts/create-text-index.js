import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../src/models/mongo/product.model.js';

dotenv.config({ path: './.env' });

async function createTextIndex() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Drop existing text index if exists
    try {
      await Product.collection.dropIndex('name_text_description_text_tags_text');
      console.log('🗑️  Dropped existing text index');
    } catch (error) {
      console.log('ℹ️  No existing text index to drop');
    }
    
    // Create text index for search
    await Product.createIndexes();
    console.log('✅ Text search index created');
    
    // Verify index
    const indexes = await Product.collection.indexes();
    console.log('\n📋 Available indexes:');
    indexes.forEach((index, i) => {
      console.log(`${i + 1}. ${JSON.stringify(index.key)}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTextIndex();