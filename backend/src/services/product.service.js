import { db } from '../config/firebase.js';
import { createProductDoc, productResponse } from '../models/product.model.js';

export class ProductService {
  // Get all collections to search
  static getCollections(type = null) {
    const allCollections = ['posters', 'kits', 'stickers'];
    if (type) {
      const typeMap = {
        poster: 'posters',
        kit: 'kits',
        sticker: 'stickers'
      };
      return [typeMap[type] || 'posters'];
    }
    return allCollections;
  }

  // Create new product
  static async createProduct(productData) {
    try {
      const collection = productData.type === 'poster' ? 'posters' : 
                        productData.type === 'kit' ? 'kits' : 'stickers';
      
      const productRef = db.collection(collection).doc();
      const product = createProductDoc(productData);
      
      await productRef.set(product);
      
      return {
        id: productRef.id,
        ...productResponse(productRef.id, product)
      };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  // Get all products with filters - FIXED VERSION
  static async getAllProducts(filters = {}) {
    try {
      const { type, category, featured, trending, bestseller, limit = 20, page = 1 } = filters;
      
      const collections = this.getCollections(type);
      let allProducts = [];
      
      for (const collection of collections) {
        let query = db.collection(collection).where('active', '==', true);
        
        // Apply filters
        if (category) query = query.where('category', '==', category);
        if (featured) query = query.where('featured', '==', true);
        if (trending) query = query.where('trending', '==', true);
        if (bestseller) query = query.where('bestseller', '==', true);
        
        const snapshot = await query.get();
        
        const products = snapshot.docs.map(doc => ({
          ...productResponse(doc.id, doc.data()),
          collection: collection // Add collection info
        }));
        
        allProducts = [...allProducts, ...products];
      }
      
      // Simple pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
      
      return {
        products: paginatedProducts,
        total: allProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(allProducts.length / limit)
      };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  // Get single product by ID - FIXED VERSION
  static async getProductById(productId, type) {
    try {
      const collections = type ? [this.getCollections(type)[0]] : this.getCollections();
      
      for (const collection of collections) {
        const productRef = db.collection(collection).doc(productId);
        const doc = await productRef.get();
        
        if (doc.exists) {
          return {
            ...productResponse(doc.id, doc.data()),
            collection: collection
          };
        }
      }
      
      throw new Error('Product not found');
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  // Search products - SIMPLE VERSION (no indexes needed)
  static async searchProducts(searchTerm, filters = {}) {
    try {
      const { type, category, limit = 20 } = filters;
      const collections = this.getCollections(type);
      let products = [];
      
      for (const collection of collections) {
        let query = db.collection(collection).where('active', '==', true);
        
        if (category) {
          query = query.where('category', '==', category);
        }
        
        const snapshot = await query.get();
        
        const filteredProducts = snapshot.docs
          .map(doc => ({
            ...productResponse(doc.id, doc.data()),
            collection: collection
          }))
          .filter(product => {
            const searchLower = searchTerm.toLowerCase();
            return (
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower) ||
              product.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
          });
        
        products = [...products, ...filteredProducts];
        
        if (products.length >= limit) {
          products = products.slice(0, limit);
          break;
        }
      }
      
      return {
        products,
        total: products.length
      };
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  // Get homepage sections - FIXED VERSION
  static async getHomepageSections() {
    try {
      const collections = this.getCollections();
      let featured = [], trending = [], bestsellers = [], newArrivals = [];
      
      for (const collection of collections) {
        // Get featured
        const featuredSnapshot = await db.collection(collection)
          .where('featured', '==', true)
          .where('active', '==', true)
          .limit(8)
          .get();
        
        featured = [...featured, ...featuredSnapshot.docs.map(doc => 
          productResponse(doc.id, doc.data())
        )];
        
        // Get trending
        const trendingSnapshot = await db.collection(collection)
          .where('trending', '==', true)
          .where('active', '==', true)
          .limit(8)
          .get();
        
        trending = [...trending, ...trendingSnapshot.docs.map(doc => 
          productResponse(doc.id, doc.data())
        )];
        
        // Get bestsellers
        const bestsellerSnapshot = await db.collection(collection)
          .where('bestseller', '==', true)
          .where('active', '==', true)
          .limit(8)
          .get();
        
        bestsellers = [...bestsellers, ...bestsellerSnapshot.docs.map(doc => 
          productResponse(doc.id, doc.data())
        )];
        
        // Get new arrivals
        const newArrivalsSnapshot = await db.collection(collection)
          .where('active', '==', true)
          .orderBy('createdAt', 'desc')
          .limit(8)
          .get();
        
        newArrivals = [...newArrivals, ...newArrivalsSnapshot.docs.map(doc => 
          productResponse(doc.id, doc.data())
        )];
      }
      
      return {
        featured: featured.slice(0, 8),
        trending: trending.slice(0, 8),
        bestsellers: bestsellers.slice(0, 8),
        newArrivals: newArrivals.slice(0, 8)
      };
    } catch (error) {
      throw new Error(`Failed to fetch homepage data: ${error.message}`);
    }
  }

  // Update product
  static async updateProduct(productId, type, updateData) {
    try {
      const collection = type === 'poster' ? 'posters' : 
                        type === 'kit' ? 'kits' : 'stickers';
      
      const productRef = db.collection(collection).doc(productId);
      
      // Check if product exists
      const doc = await productRef.get();
      if (!doc.exists) {
        throw new Error('Product not found');
      }
      
      updateData.updatedAt = new Date();
      await productRef.update(updateData);
      
      const updatedDoc = await productRef.get();
      return productResponse(productId, updatedDoc.data());
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  // Delete product (soft delete)
  static async deleteProduct(productId, type) {
    try {
      const collection = type === 'poster' ? 'posters' : 
                        type === 'kit' ? 'kits' : 'stickers';
      
      const productRef = db.collection(collection).doc(productId);
      
      await productRef.update({
        active: false,
        updatedAt: new Date()
      });
      
      return { message: 'Product deleted successfully', id: productId };
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}