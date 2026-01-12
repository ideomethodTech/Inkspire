import { ProductService } from './product.service.js';
import { MongoProductService } from './mongo/product.service.js';

export class ProductBridgeService {
  static useMongoDB = true; // Switch to true for MongoDB
  
  static async createProduct(productData) {
    if (this.useMongoDB) {
      return MongoProductService.createProduct(productData);
    } else {
      return ProductService.createProduct(productData);
    }
  }
  
  static async getAllProducts(filters = {}) {
    if (this.useMongoDB) {
      return MongoProductService.getAllProducts(filters);
    } else {
      return ProductService.getAllProducts(filters);
    }
  }
  
  static async getProductById(productId) {
    if (this.useMongoDB) {
      return MongoProductService.getProductById(productId);
    } else {
      // For Firebase, we need to pass type - handle gracefully
      try {
        return await ProductService.getProductById(productId);
      } catch (error) {
        // Try MongoDB as fallback
        return MongoProductService.getProductById(productId);
      }
    }
  }
  
  static async searchProducts(searchTerm, filters = {}) {
    if (this.useMongoDB) {
      return MongoProductService.searchProducts(searchTerm, filters);
    } else {
      return ProductService.searchProducts(searchTerm, filters);
    }
  }
  
  static async getHomepageSections() {
    if (this.useMongoDB) {
      return MongoProductService.getHomepageSections();
    } else {
      return ProductService.getHomepageSections();
    }
  }
  
  static async updateProduct(productId, type, updateData) {
    if (this.useMongoDB) {
      return MongoProductService.updateProduct(productId, updateData);
    } else {
      return ProductService.updateProduct(productId, type, updateData);
    }
  }
  
  static async deleteProduct(productId, type) {
    if (this.useMongoDB) {
      return MongoProductService.deleteProduct(productId);
    } else {
      return ProductService.deleteProduct(productId, type);
    }
  }
}
