import express from 'express';
import { ProductController } from '../controllers/product.controller.js';

const router = express.Router();


// PUBLIC routes only (no auth required)
router.get('/', ProductController.getAllProducts);
router.get('/homepage', ProductController.getHomepageData);
router.get('/search', ProductController.searchProducts);
router.get('/categories', ProductController.getCategories);
router.get('/filters', ProductController.getAvailableFilters);
router.get('/:id', ProductController.getProduct);

// NO admin routes here - they're in admin.product.routes.js

export default router;