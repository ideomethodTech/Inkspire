import Product from "../../models/mongo/product.model.js";

export class ProductService {
  // Create new product
  static async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();

      return {
        success: true,
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
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  // Get all products with enhanced filters
  static async getAllProducts(filters = {}) {
    try {
      const {
        type,
        category,
        featured,
        trending,
        bestseller,
        minPrice,
        maxPrice,
        tags,
        sort = 'newest',
        limit = 20,
        page = 1
      } = filters;

      const query = { active: true };

      // Basic filters
      if (type) query.type = type;
      if (category) query.category = category;
      if (featured === 'true' || featured === true) query.featured = true;
      if (trending === 'true' || trending === true) query.trending = true;
      if (bestseller === 'true' || bestseller === true) query.bestseller = true;

      // Price range filter
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      // Tags filter (match any of the provided tags)
      if (tags) {
        const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim().toLowerCase()) : tags;
        query.tags = { $in: tagArray };
      }

      // Sorting options
      let sortOption = {};
      switch (sort) {
        case 'price_asc':
          sortOption = { price: 1 };
          break;
        case 'price_desc':
          sortOption = { price: -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        case 'popular':
          // Sort by multiple factors: trending > bestseller > featured > newest
          sortOption = { trending: -1, bestseller: -1, featured: -1, createdAt: -1 };
          break;
        case 'name_asc':
          sortOption = { name: 1 };
          break;
        case 'name_desc':
          sortOption = { name: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }

      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        Product.find(query)
          .sort(sortOption)
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
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }));

      return {
        success: true,
        data: {
          products: formattedProducts,
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
          appliedFilters: {
            type,
            category,
            priceRange: minPrice || maxPrice ? { min: minPrice, max: maxPrice } : null,
            tags: tags || null,
            sort
          }
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

  // Get all unique categories
  static async getCategories() {
    try {
      const categories = await Product.distinct('category', { active: true });

      return {
        success: true,
        data: {
          categories: categories.sort()
        }
      };
    } catch (error) {
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  }

  // Get available filter options
  static async getAvailableFilters() {
    try {
      const [categories, types, tags, priceRange] = await Promise.all([
        Product.distinct('category', { active: true }),
        Product.distinct('type', { active: true }),
        Product.distinct('tags', { active: true }),
        Product.aggregate([
          { $match: { active: true } },
          {
            $group: {
              _id: null,
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' }
            }
          }
        ])
      ]);

      return {
        success: true,
        data: {
          categories: categories.sort(),
          types: types.sort(),
          tags: tags.sort(),
          priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 },
          sortOptions: [
            { value: 'newest', label: 'Newest First' },
            { value: 'price_asc', label: 'Price: Low to High' },
            { value: 'price_desc', label: 'Price: High to Low' },
            { value: 'popular', label: 'Most Popular' },
            { value: 'name_asc', label: 'Name: A to Z' },
            { value: 'name_desc', label: 'Name: Z to A' }
          ]
        }
      };
    } catch (error) {
      throw new Error(`Failed to get available filters: ${error.message}`);
    }
  }
}