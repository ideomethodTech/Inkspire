import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/mongo/product.model.js';

dotenv.config({ path: './.env' });

const sampleProducts = [
  {
    name: 'Minimalist Mountain Poster',
    type: 'poster',
    category: 'Nature',
    description: 'High quality A3 poster',
    price: 299,
    variants: [{ size: 'A3', price: 299, stock: 50 }, { size: 'A4', price: 199, stock: 100 }],
    images: ['https://picsum.photos/400/600'],
    tags: ['nature', 'mountain'],
    featured: true,
    active: true
  },
  {
    name: 'Watercolor Starter Kit',
    type: 'kit',
    category: 'Art',
    description: 'Everything you need to paint',
    price: 1499,
    variants: [{ size: 'Standard', price: 1499, stock: 20 }],
    images: ['https://picsum.photos/400/600'],
    tags: ['art', 'paint'],
    bestseller: true,
    active: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    await Product.insertMany(sampleProducts);
    console.log(`🌱 Seeded ${sampleProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seed();
