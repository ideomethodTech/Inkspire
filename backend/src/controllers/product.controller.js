// src/controllers/product.controller.js
// FIX THE IMPORT PATH if needed
import { ProductService } from '../services/mongo/product.service.js';

export class ProductController {
  // Get all products
  static async getAllProducts(req, res) {
    try {
      const filters = {
        type: req.query.type,
        category: req.query.category,
        featured: req.query.featured === 'true',
        trending: req.query.trending === 'true',
        bestseller: req.query.bestseller === 'true',
        limit: parseInt(req.query.limit) || 20,
        page: parseInt(req.query.page) || 1,
        showInactive: req.query.showInactive === 'true'
      };

      const result = await ProductService.getAllProducts(filters);

      return res.status(200).json(result);
    } catch (error) {
      console.error('[GET ALL PRODUCTS] Error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch products'
      });
    }
  }

  // Get single product
  static async getProduct(req, res) {
    try {
      const { id } = req.params;

      const result = await ProductService.getProductById(id);

      return res.status(200).json(result);
    } catch (error) {
      console.error('[GET PRODUCT] Error:', error);
      const status = error.message?.includes('not found') ? 404 : 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Failed to fetch product'
      });
    }
  }

  // Search products
  static async searchProducts(req, res) {
    try {
      const { q } = req.query;

      if (!q?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const filters = {
        type: req.query.type,
        category: req.query.category,
        limit: parseInt(req.query.limit) || 20
      };

      const result = await ProductService.searchProducts(q.trim(), filters);

      return res.status(200).json(result);
    } catch (error) {
      console.error('[SEARCH PRODUCTS] Error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Search failed'
      });
    }
  }

  // Get homepage data
  static async getHomepageData(req, res) {
    try {
      const result = await ProductService.getHomepageSections();

      return res.status(200).json(result);
    } catch (error) {
      console.error('[HOMEPAGE DATA] Error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to load homepage data'
      });
    }
  }

  // Create product (Admin only)
  static async createProduct(req, res) {
    try {
      console.log('[CREATE PRODUCT] Admin:', req.user.email);
      console.log('[CREATE PRODUCT] Data received:', req.body);

      const productData = {
        ...req.body,
        createdBy: req.user.userId,          // Important: track who created it
        // You can also add: createdByEmail: req.user.email
      };

      // Basic required field validation
      if (!productData.name?.trim()) {
        return res.status(400).json({ success: false, message: 'Product name is required' });
      }
      if (!productData.type) {
        return res.status(400).json({ success: false, message: 'Product type is required' });
      }
      if (!productData.price || isNaN(productData.price) || productData.price <= 0) {
        return res.status(400).json({ success: false, message: 'Valid positive price is required' });
      }

      const result = await ProductService.createProduct(productData);

      console.log('[CREATE PRODUCT] Success - ID:', result.product?._id || result._id);

      return res.status(201).json(result);
    } catch (error) {
      console.error('[CREATE PRODUCT] FAILED:', error.stack || error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to create product',
        ...(process.env.NODE_ENV !== 'production' && { error: error.stack })
      });
    }
  }

  // Update product (Admin only)
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = {
        ...req.body,
        updatedBy: req.user.userId,          // Track who updated
        updatedAt: new Date()
      };

      console.log(`[UPDATE PRODUCT] ${id} by admin:`, req.user.email);

      const result = await ProductService.updateProduct(id, updateData);

      return res.status(200).json(result);
    } catch (error) {
      console.error('[UPDATE PRODUCT] Error:', error);
      const status = error.message?.includes('not found') ? 404 : 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Failed to update product'
      });
    }
  }

  // Delete product (Admin only)
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      console.log(`[DELETE PRODUCT] ${id} by admin:`, req.user.email);

      const result = await ProductService.deleteProduct(id);

      return res.status(200).json(result);
    } catch (error) {
      console.error('[DELETE PRODUCT] Error:', error);
      const status = error.message?.includes('not found') ? 404 : 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Failed to delete product'
      });
    }
  }

  // Get all categories
  static async getCategories(req, res) {
    try {
      const result = await ProductService.getCategories();
      return res.status(200).json(result);
    } catch (error) {
      console.error('[GET CATEGORIES] Error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to get categories'
      });
    }
  }

  // Get available filter options
  static async getAvailableFilters(req, res) {
    try {
      const result = await ProductService.getAvailableFilters();
      return res.status(200).json(result);
    } catch (error) {
      console.error('[GET FILTERS] Error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to get available filters'
      });
    }
  }
}