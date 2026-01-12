import Product from "../../models/mongo/product.model.js";

export class ProductService {
  // Create new product
  static async createProduct(productData) {
    try {
      const product = new Product({
        ...productData,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      await product.save();
      
      return {
        success: true,
        message: 'Product created successfully',
        data: {
          id: product._id,
          name: product.name,
          type: product.type,
          category: product.category,
          description: product.description,
          price: product.price,
          variants: product.variants,
          images: product.images,
          tags: product.tags,
          featured: product.featured,
          trending: product.trending,
          bestseller: product.bestseller,
          active: product.active,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        }
      };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  // Get all products with filters
  static async getAllProducts(filters = {}) {
    try {
      const { 
        type, 
        category, 
        featured, 
        trending, 
        bestseller, 
        limit = 20, 
        page = 1,
        showInactive = false  // Add this for admin
      } = filters;
      
      // If showInactive is false, only show active products
      // If showInactive is true, show all products (admin view)
      const query = showInactive ? {} : { active: true };
      
      if (type) query.type = type;
      if (category) query.category = category;
      if (featured === 'true') query.featured = true;
      if (trending === 'true') query.trending = true;
      if (bestseller === 'true') query.bestseller = true;
      
      const skip = (page - 1) * limit;
      
      const [products, total] = await Promise.all([
        Product.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),
        Product.countDocuments(query)
      ]);
      
      const formattedProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        type: product.type,
        category: product.category,
        price: product.price,
        description: product.description,
        variants: product.variants,
        images: product.images,
        tags: product.tags,
        featured: product.featured,
        trending: product.trending,
        bestseller: product.bestseller,
        active: product.active,  // Include active status for admin
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }));
      
      return {
        success: true,
        message: 'Products fetched successfully',
        data: {
          products: formattedProducts,
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
          showInactive: showInactive  // Return the flag
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  // Get single product
  static async getProductById(productId) {
    try {
      const product = await Product.findOne({ 
        _id: productId, 
        active: true 
      }).lean();
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return {
        success: true,
        message: 'Product fetched successfully',
        data: {
          id: product._id,
          name: product.name,
          type: product.type,
          category: product.category,
          price: product.price,
          description: product.description,
          variants: product.variants,
          images: product.images,
          tags: product.tags,
          featured: product.featured,
          trending: product.trending,
          bestseller: product.bestseller,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  // Search products
  static async searchProducts(searchTerm, filters = {}) {
    try {
      const { type, category, limit = 20 } = filters;
      
      const query = { 
        active: true,
        $text: { $search: searchTerm }
      };
      
      if (type) query.type = type;
      if (category) query.category = category;
      
      const products = await Product.find(query)
        .limit(parseInt(limit))
        .lean();
      
      const formattedProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        type: product.type,
        category: product.category,
        price: product.price,
        description: product.description,
        variants: product.variants,
        images: product.images,
        tags: product.tags,
        featured: product.featured,
        trending: product.trending,
        bestseller: product.bestseller,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }));
      
      return {
        success: true,
        message: 'Search completed',
        data: {
          products: formattedProducts,
          total: products.length
        }
      };
    } catch (error) {
      // If text index not available, fall back to regex search
      if (error.message.includes('text index')) {
        return this.fallbackSearch(searchTerm, filters);
      }
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  // Fallback search without text index
  static async fallbackSearch(searchTerm, filters = {}) {
    try {
      const { type, category, limit = 20 } = filters;
      
      const query = { active: true };
      
      if (type) query.type = type;
      if (category) query.category = category;
      
      const regex = new RegExp(searchTerm, 'i');
      query.$or = [
        { name: regex },
        { description: regex },
        { tags: regex }
      ];
      
      const products = await Product.find(query)
        .limit(parseInt(limit))
        .lean();
      
      const formattedProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        type: product.type,
        category: product.category,
        price: product.price,
        description: product.description,
        variants: product.variants,
        images: product.images,
        tags: product.tags,
        featured: product.featured,
        trending: product.trending,
        bestseller: product.bestseller,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }));
      
      return {
        success: true,
        message: 'Search completed',
        data: {
          products: formattedProducts,
          total: products.length
        }
      };
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  // Get homepage sections
  static async getHomepageSections() {
    try {
      const [featured, trending, bestsellers, newArrivals] = await Promise.all([
        Product.find({ featured: true, active: true }).limit(8).lean(),
        Product.find({ trending: true, active: true }).limit(8).lean(),
        Product.find({ bestseller: true, active: true }).limit(8).lean(),
        Product.find({ active: true })
          .sort({ createdAt: -1 })
          .limit(8)
          .lean()
      ]);
      
      const formatProducts = (products) => 
        products.map(product => ({
          id: product._id,
          name: product.name,
          type: product.type,
          category: product.category,
          price: product.price,
          description: product.description,
          variants: product.variants,
          images: product.images,
          tags: product.tags,
          featured: product.featured,
          trending: product.trending,
          bestseller: product.bestseller,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        }));
      
      return {
        success: true,
        message: 'Homepage data fetched',
        data: {
          featured: formatProducts(featured),
          trending: formatProducts(trending),
          bestsellers: formatProducts(bestsellers),
          newArrivals: formatProducts(newArrivals)
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch homepage data: ${error.message}`);
    }
  }

  // Update product
  static async updateProduct(productId, updateData) {
    try {
      updateData.updatedAt = new Date();
      
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        updateData,
        { new: true, runValidators: true }
      ).lean();
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return {
        success: true,
        message: 'Product updated successfully',
        data: {
          id: product._id,
          name: product.name,
          type: product.type,
          category: product.category,
          price: product.price,
          description: product.description,
          variants: product.variants,
          images: product.images,
          tags: product.tags,
          featured: product.featured,
          trending: product.trending,
          bestseller: product.bestseller,
          active: product.active,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        }
      };
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  // Delete product (soft delete)
  static async deleteProduct(productId) {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { active: false, updatedAt: new Date() },
        { new: true }
      ).lean();
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return {
        success: true,
        message: 'Product deleted successfully',
        data: { id: productId }
      };
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  // Get product by ID for admin (can see inactive)
  static async getProductByIdForAdmin(productId) {
    try {
      const product = await Product.findById(productId).lean();
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return {
        success: true,
        message: 'Product fetched successfully',
        data: {
          id: product._id,
          name: product.name,
          type: product.type,
          category: product.category,
          price: product.price,
          description: product.description,
          variants: product.variants,
          images: product.images,
          tags: product.tags,
          featured: product.featured,
          trending: product.trending,
          bestseller: product.bestseller,
          active: product.active,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }
}