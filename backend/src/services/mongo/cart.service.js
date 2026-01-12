// FIX THE IMPORT PATH
import Cart from "../../models/mongo/cart.model.js";
import Product from "../../models/mongo/product.model.js";

export class CartService {
  // Get user's cart
  static async getCart(userId) {
    try {
      let cart = await Cart.findOne({ userId })
        .populate('items.productId', 'name price images variants')
        .lean();
      
      if (!cart) {
        // Create empty cart if doesn't exist
        cart = await Cart.create({
          userId,
          items: [],
          total: 0,
          itemCount: 0
        });
        return this.formatCartResponse(cart);
      }
      
      // Calculate total with current prices
      let total = 0;
      const formattedItems = cart.items.map(item => {
        const product = item.productId;
        const variant = product.variants?.[item.variantIndex] || {};
        const price = variant.price || product.price || 0;
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        return {
          productId: product._id,
          productName: product.name,
          productImage: product.images?.[0] || '',
          variant: variant.size || 'Standard',
          variantPrice: price,
          quantity: item.quantity,
          itemTotal: itemTotal,
          addedAt: item.addedAt
        };
      });
      
      // Update cart total
      await Cart.updateOne(
        { userId },
        { total, itemCount: formattedItems.reduce((sum, item) => sum + item.quantity, 0) }
      );
      
      return {
        success: true,
        data: {
          items: formattedItems,
          total,
          itemCount: formattedItems.reduce((sum, item) => sum + item.quantity, 0),
          userId,
          updatedAt: cart.updatedAt
        }
      };
    } catch (error) {
      console.error('Get cart service error:', error);
      throw new Error(`Failed to get cart: ${error.message}`);
    }
  }

  // Add item to cart
  static async addToCart(userId, productId, variantIndex = 0, quantity = 1) {
    try {
      // Validate product exists
      const product = await Product.findOne({ _id: productId, active: true });
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Validate variant index
      if (variantIndex < 0 || variantIndex >= (product.variants?.length || 1)) {
        throw new Error('Invalid variant');
      }
      
      // Validate stock
      const variant = product.variants?.[variantIndex];
      if (variant && variant.stock < quantity) {
        throw new Error('Insufficient stock');
      }
      
      let cart = await Cart.findOne({ userId });
      
      if (!cart) {
        // Create new cart
        cart = new Cart({
          userId,
          items: []
        });
      }
      
      // Check if item already exists
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId && item.variantIndex === variantIndex
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].updatedAt = new Date();
      } else {
        // Add new item
        cart.items.push({
          productId,
          variantIndex,
          quantity
        });
      }
      
      await cart.save();
      
      // Return updated cart
      return this.getCart(userId);
    } catch (error) {
      console.error('Add to cart service error:', error);
      throw new Error(`Failed to add to cart: ${error.message}`);
    }
  }

  // Update cart item quantity
  static async updateCartItem(userId, productId, variantIndex, quantity) {
    try {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      
      // Find the item
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId && item.variantIndex === variantIndex
      );
      
      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }
      
      // Check stock if quantity is increased
      if (quantity > cart.items[itemIndex].quantity) {
        const product = await Product.findById(productId);
        const variant = product.variants?.[variantIndex];
        const increasedBy = quantity - cart.items[itemIndex].quantity;
        
        if (variant && variant.stock < increasedBy) {
          throw new Error('Insufficient stock');
        }
      }
      
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].updatedAt = new Date();
      
      await cart.save();
      
      return this.getCart(userId);
    } catch (error) {
      console.error('Update cart item service error:', error);
      throw new Error(`Failed to update cart item: ${error.message}`);
    }
  }

  // Remove item from cart
  static async removeCartItem(userId, productId, variantIndex) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      
      const initialLength = cart.items.length;
      cart.items = cart.items.filter(
        item => !(item.productId.toString() === productId && item.variantIndex === variantIndex)
      );
      
      if (cart.items.length === initialLength) {
        throw new Error('Item not found in cart');
      }
      
      await cart.save();
      
      return this.getCart(userId);
    } catch (error) {
      console.error('Remove cart item service error:', error);
      throw new Error(`Failed to remove cart item: ${error.message}`);
    }
  }

  // Clear cart
  static async clearCart(userId) {
    try {
      await Cart.findOneAndUpdate(
        { userId },
        { items: [], total: 0, itemCount: 0 }
      );
      
      return {
        success: true,
        message: 'Cart cleared successfully',
        data: { userId }
      };
    } catch (error) {
      console.error('Clear cart service error:', error);
      throw new Error(`Failed to clear cart: ${error.message}`);
    }
  }

  // Helper to format cart response
  static formatCartResponse(cart) {
    return {
      success: true,
      data: {
        items: cart.items || [],
        total: cart.total || 0,
        itemCount: cart.itemCount || 0,
        userId: cart.userId,
        updatedAt: cart.updatedAt
      }
    };
  }
}
