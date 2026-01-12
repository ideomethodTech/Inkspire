// MongoDB-based Product Creation Test
// This tests the fixed Mongoose save() that was hanging before

import mongoose from 'mongoose';
import Product from './src/models/mongo/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

const testProducts = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected\n');

        // Test 1: Create a single product
        console.log('━'.repeat(60));
        console.log('TEST 1: Create Single Product');
        console.log('━'.repeat(60));
        const product1 = new Product({
            name: 'MongoDB Test Poster',
            type: 'poster',
            category: 'Technology',
            price: 499,
            description: 'Testing MongoDB save after fix',
            images: ['https://picsum.photos/400/600?random=100'],
            tags: ['mongodb', 'test', 'fix'],
            featured: true,
            trending: false,
            bestseller: false
        });

        const start1 = Date.now();
        await product1.save();
        const end1 = Date.now();
        console.log(`✅ Product saved successfully in ${end1 - start1}ms`);
        console.log(`   ID: ${product1._id}`);
        console.log(`   Name: ${product1.name}`);
        console.log(`   Updated At: ${product1.updatedAt}\n`);

        // Test 2: Find the product
        console.log('━'.repeat(60));
        console.log('TEST 2: Find Product by ID');
        console.log('━'.repeat(60));
        const found = await Product.findById(product1._id);
        if (found) {
            console.log(`✅ Product found: ${found.name}`);
            console.log(`   Price: ₹${found.price}`);
            console.log(`   Featured: ${found.featured}\n`);
        } else {
            console.log('❌ Product not found\n');
        }

        // Test 3: Update the product
        console.log('━'.repeat(60));
        console.log('TEST 3: Update Product');
        console.log('━'.repeat(60));
        found.price = 599;
        found.trending = true;
        const start3 = Date.now();
        await found.save();  //  This was hanging before the fix!
        const end3 = Date.now();
        console.log(`✅ Product updated successfully in ${end3 - start3}ms`);
        console.log(`   New Price: ₹${found.price}`);
        console.log(`   Trending: ${found.trending}`);
        console.log(`   Updated At: ${found.updatedAt}\n`);

        // Test 4: Create multiple products quickly
        console.log('━'.repeat(60));
        console.log('TEST 4: Bulk Create (5 products)');
        console.log('━'.repeat(60));
        const bulkStart = Date.now();
        const promises = [];
        for (let i = 1; i <= 5; i++) {
            const p = new Product({
                name: `Bulk Test Product ${i}`,
                type: i % 3 === 0 ? 'sticker' : i % 2 === 0 ? 'kit' : 'poster',
                category: 'BulkTest',
                price: 100 * i,
                description: `Bulk test product number ${i}`,
                images: [`https://picsum.photos/400/600?random=${100 + i}`]
            });
            promises.push(p.save());
        }
        await Promise.all(promises);
        const bulkEnd = Date.now();
        console.log(`✅ ${promises.length} products created in ${bulkEnd - bulkStart}ms`);
        console.log(`   Average per product: ${((bulkEnd - bulkStart) / promises.length).toFixed(2)}ms\n`);

        // Test 5: Query with filters
        console.log('━'.repeat(60));
        console.log('TEST 5: Query Products');
        console.log('━'.repeat(60));
        const allProducts = await Product.find({ active: true });
        console.log(`✅ Total active products: ${allProducts.length}`);

        const featured = await Product.find({ featured: true });
        console.log(`   Featured products: ${featured.length}`);

        const posters = await Product.find({ type: 'poster' });
        console.log(`   Posters: ${posters.length}\n`);

        // Cleanup
        console.log('━'.repeat(60));
        console.log('CLEANUP: Deleting Test Products');
        console.log('━'.repeat(60));
        await Product.deleteMany({
            $or: [
                { name: /MongoDB Test/ },
                { name: /Bulk Test/ }
            ]
        });
        console.log('✅ Test products cleaned up\n');

        await mongoose.connection.close();
        console.log('━'.repeat(60));
        console.log('✅ ALL TESTS PASSED! Mongoose fix is working perfectly.');
        console.log('━'.repeat(60));
        process.exit(0);

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
        console.error(error.stack);
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Timeout protection
setTimeout(() => {
    console.error('\n❌ TIMEOUT: Tests took longer than 30 seconds');
    console.error('   The Mongoose hanging issue may still exist');
    process.exit(1);
}, 30000);

testProducts();
