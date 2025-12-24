import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/homepage', ProductController.getHomepageData);
router.get('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProduct);

// Admin routes (protected)
router.post('/', authenticate, adminOnly, ProductController.createProduct);
router.put('/:id', authenticate, adminOnly, ProductController.updateProduct);
router.delete('/:id', authenticate, adminOnly, ProductController.deleteProduct);

export default router;