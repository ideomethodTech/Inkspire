import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

// All admin product routes require authentication + admin role
router.use(authenticate);
router.use(adminOnly);

// Admin-only product routes
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

// Admin view of products (can see inactive)
router.get('/products', ProductController.getAllProducts);

export default router;