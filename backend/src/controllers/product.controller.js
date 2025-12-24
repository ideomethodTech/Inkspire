import { ProductService } from '../services/product.service.js';

export class ProductController {
  // Create product (Admin only)
  static async createProduct(req, res) {
    try {
      const productData = req.body;
      
      // Validation
      if (!productData.name || !productData.type || !productData.price) {
        return res.status(400).json({
          success: false,
          message: 'Name, type, and price are required'
        });
      }
      
      const product = await ProductService.createProduct(productData);
      
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

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
        page: parseInt(req.query.page) || 1
      };
      
      const result = await ProductService.getAllProducts(filters);
      
      return res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get single product
  static async getProduct(req, res) {
    try {
      const { id } = req.params;
      const { type } = req.query;
      
      const product = await ProductService.getProductById(id, type);
      
      return res.status(200).json({
        success: true,
        message: 'Product fetched successfully',
        data: product
      });
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update product (Admin only)
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { type } = req.query;
      const updateData = req.body;
      
      if (!type) {
        return res.status(400).json({
          success: false,
          message: 'Product type is required'
        });
      }
      
      const product = await ProductService.updateProduct(id, type, updateData);
      
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete product (Admin only)
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const { type } = req.query;
      
      if (!type) {
        return res.status(400).json({
          success: false,
          message: 'Product type is required'
        });
      }
      
      const result = await ProductService.deleteProduct(id, type);
      
      return res.status(200).json({
        success: true,
        message: result.message,
        data: { id: result.id }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Search products
  static async searchProducts(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
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
      
      const result = await ProductService.searchProducts(q, filters);
      
      return res.status(200).json({
        success: true,
        message: 'Search completed',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get homepage data
  static async getHomepageData(req, res) {
    try {
      const sections = await ProductService.getHomepageSections();
      
      return res.status(200).json({
        success: true,
        message: 'Homepage data fetched',
        data: sections
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}