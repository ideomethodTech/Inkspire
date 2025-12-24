import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { db } from '../src/config/firebase.js';

async function cleanupDuplicates() {
  try {
    console.log('🧹 Starting duplicate cleanup...\n');

    const collections = ['posters', 'kits', 'stickers'];

    for (const collection of collections) {
      console.log(`📦 Checking collection: ${collection}`);

      const snapshot = await db.collection(collection).get();

      if (snapshot.empty) {
        console.log('   No documents found\n');
        continue;
      }

      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`   Found ${products.length} products`);

      // Group products by name
      const grouped = {};
      for (const product of products) {
        if (!grouped[product.name]) {
          grouped[product.name] = [];
        }
        grouped[product.name].push(product);
      }

      let deletedCount = 0;

      for (const [name, items] of Object.entries(grouped)) {
        if (items.length > 1) {
          console.log(`   ⚠️  ${items.length} duplicates found for "${name}"`);

          // Sort by createdAt (oldest first)
          items.sort((a, b) => {
            const aTime = a.createdAt?._seconds || 0;
            const bTime = b.createdAt?._seconds || 0;
            return aTime - bTime;
          });

          // Keep first, delete rest
          for (let i = 1; i < items.length; i++) {
            await db.collection(collection).doc(items[i].id).delete();
            deletedCount++;
            console.log(`      🗑️ Deleted product ID: ${items[i].id}`);
          }
        }
      }

      if (deletedCount === 0) {
        console.log('   ✅ No duplicates to delete\n');
      } else {
        console.log(`   ✅ Deleted ${deletedCount} duplicate products\n`);
      }
    }

    console.log('🎉 Duplicate cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

cleanupDuplicates();
