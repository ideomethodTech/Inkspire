import { db } from '../src/config/firebase.js';

const sampleProducts = [
  {
    type: 'poster',
    name: 'Minimalist Mountain Poster',
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
    trending: true
  },
  {
    type: 'kit',
    name: 'Beginner Watercolor Kit',
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
    bestseller: true
  },
  {
    type: 'sticker',
    name: 'Cute Animal Sticker Pack',
    category: 'Stationery',
    description: 'Pack of 12 cute animal stickers',
    price: 99,
    variants: [
      { size: 'Pack of 12', price: 99, stock: 200 },
      { size: 'Pack of 24', price: 179, stock: 100 }
    ],
    images: ['https://picsum.photos/400/600?random=3'],
    tags: ['cute', 'animals', 'stickers'],
    trending: true
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Seeding products...');
    
    for (const product of sampleProducts) {
      const collection = product.type === 'poster' ? 'posters' : 
                       product.type === 'kit' ? 'kits' : 'stickers';
      
      const docRef = db.collection(collection).doc();
      await docRef.set({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true
      });
      
      console.log(`✅ Added ${product.name} to ${collection}`);
    }
    
    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedProducts();