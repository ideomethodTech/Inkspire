// Test script to verify the Mongoose fix
import mongoose from 'mongoose';
import Product from './src/models/mongo/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

const testMongooseFix = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected\n');

        console.log('🧪 Testing product.save() - This should complete within 2 seconds...');
        const testProduct = new Product({
            name: 'Test Product - Mongoose Fix Verification',
            type: 'poster',
            category: 'test',
            price: 99,
            description: 'This is a test product to verify the pre-save hook fix',
            images: ['https://example.com/test.jpg']
        });

        const startTime = Date.now();
        await testProduct.save();
        const endTime = Date.now();

        console.log(`✅ SUCCESS! Product saved in ${endTime - startTime}ms`);
        console.log(`   Product ID: ${testProduct._id}`);
        console.log(`   Product Name: ${testProduct.name}\n`);

        // Clean up - delete the test product
        await Product.findByIdAndDelete(testProduct._id);
        console.log('🧹 Test product cleaned up');

        await mongoose.connection.close();
        console.log('\n✅ Test completed successfully! The Mongoose hanging issue is FIXED.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test FAILED:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Set a timeout to catch hanging operations
setTimeout(() => {
    console.error('\n❌ TIMEOUT: Operation took longer than 10 seconds');
    console.error('   This means the bug is NOT fixed yet.');
    process.exit(1);
}, 10000);

testMongooseFix();
