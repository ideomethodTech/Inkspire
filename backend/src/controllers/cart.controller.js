// FIX THE IMPORT PATH
import { CartService } from '../services/mongo/cart.service.js';

export class CartController {
  // Get user's cart
  static async getCart(req, res) {
    try {
      const userId = req.user.userId;
      const result = await CartService.getCart(userId);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Get cart error:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Add item to cart
  static async addToCart(req, res) {
    try {
      const userId = req.user.userId;
      const { productId, variantIndex = 0, quantity = 1 } = req.body;
      
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required'
        });
      }
      
      const result = await CartService.addToCart(userId, productId, variantIndex, quantity);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Add to cart error:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update cart item
  static async updateCartItem(req, res) {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;
      const { variantIndex = 0, quantity } = req.body;
      
      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Valid quantity is required (minimum 1)'
        });
      }
      
      const result = await CartService.updateCartItem(userId, productId, variantIndex, quantity);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Update cart item error:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Remove item from cart
  static async removeCartItem(req, res) {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;
      const { variantIndex = 0 } = req.body;
      
      const result = await CartService.removeCartItem(userId, productId, variantIndex);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Remove cart item error:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Clear cart
  static async clearCart(req, res) {
    try {
      const userId = req.user.userId;
      
      const result = await CartService.clearCart(userId);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Clear cart error:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}