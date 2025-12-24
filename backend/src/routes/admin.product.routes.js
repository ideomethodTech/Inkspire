import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

// All admin product routes
router.use(authenticate);
router.use(adminOnly);

// Create product
router.post('/products', ProductController.createProduct);

// Update product
router.put('/products/:id', ProductController.updateProduct);

// Delete product
router.delete('/products/:id', ProductController.deleteProduct);

// Get all products (admin view - with inactive)
router.get('/products', async (req, res) => {
  try {
    // You can add admin-specific logic here
    return res.status(200).json({
      success: true,
      message: 'Admin products route - to be implemented'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;