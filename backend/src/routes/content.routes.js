import express from 'express';
import { ContentController } from '../controllers/content.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

// Public routes
router.get('/hero', ContentController.getHeroBanners);
router.get('/trending', ContentController.getTrendingProducts);

// Admin routes
router.post('/admin/hero', authenticate, adminOnly, ContentController.createHeroBanner);
router.put('/admin/hero/:bannerId', authenticate, adminOnly, ContentController.updateHeroBanner);
router.delete('/admin/hero/:bannerId', authenticate, adminOnly, ContentController.deleteHeroBanner);
router.get('/admin/hero', authenticate, adminOnly, ContentController.getAllBanners);

export default router;
