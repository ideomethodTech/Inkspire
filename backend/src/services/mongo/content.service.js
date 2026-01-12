import HeroContent from '../../models/mongo/heroContent.model.js';
import Product from '../../models/mongo/product.model.js';

export class ContentService {
    // Get active hero banners
    static async getActiveHeroBanners() {
        try {
            const now = new Date();

            const banners = await HeroContent.find({
                active: true,
                $or: [
                    { startDate: { $exists: false } },
                    { startDate: { $lte: now } }
                ],
                $or: [
                    { endDate: { $exists: false } },
                    { endDate: { $gte: now } }
                ]
            })
                .sort({ priority: -1, createdAt: -1 })
                .limit(5)
                .lean();

            return {
                success: true,
                data: {
                    banners: banners.map(b => ({
                        id: b._id,
                        title: b.title,
                        subtitle: b.subtitle,
                        description: b.description,
                        image: b.image,
                        mobileImage: b.mobileImage || b.image,
                        link: b.link,
                        linkText: b.linkText,
                        type: b.type,
                        category: b.category
                    }))
                }
            };
        } catch (error) {
            throw new Error(`Failed to get hero banners: ${error.message}`);
        }
    }

    // Get trending products
    static async getTrendingProducts(limit = 10) {
        try {
            const products = await Product.find({
                trending: true,
                active: true
            })
                .sort({ createdAt: -1 })
                .limit(limit)
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
                bestseller: product.bestseller
            }));

            return {
                success: true,
                data: {
                    products: formattedProducts,
                    total: products.length
                }
            };
        } catch (error) {
            throw new Error(`Failed to get trending products: ${error.message}`);
        }
    }

    // Create hero banner (Admin)
    static async createHeroBanner(bannerData) {
        try {
            const banner = await HeroContent.create(bannerData);

            return {
                success: true,
                message: 'Hero banner created successfully',
                data: {
                    id: banner._id,
                    title: banner.title,
                    type: banner.type,
                    active: banner.active
                }
            };
        } catch (error) {
            throw new Error(`Failed to create hero banner: ${error.message}`);
        }
    }

    // Update hero banner (Admin)
    static async updateHeroBanner(bannerId, updateData) {
        try {
            const banner = await HeroContent.findByIdAndUpdate(
                bannerId,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            );

            if (!banner) {
                throw new Error('Banner not found');
            }

            return {
                success: true,
                message: 'Hero banner updated successfully',
                data: {
                    id: banner._id,
                    title: banner.title,
                    active: banner.active
                }
            };
        } catch (error) {
            throw new Error(`Failed to update hero banner: ${error.message}`);
        }
    }

    // Delete hero banner (Admin)
    static async deleteHeroBanner(bannerId) {
        try {
            const banner = await HeroContent.findByIdAndDelete(bannerId);

            if (!banner) {
                throw new Error('Banner not found');
            }

            return {
                success: true,
                message: 'Hero banner deleted successfully',
                data: { id: bannerId }
            };
        } catch (error) {
            throw new Error(`Failed to delete hero banner: ${error.message}`);
        }
    }

    // Get all banners (Admin)
    static async getAllBanners(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;

            const [banners, total] = await Promise.all([
                HeroContent.find()
                    .sort({ priority: -1, createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                HeroContent.countDocuments()
            ]);

            return {
                success: true,
                data: {
                    banners,
                    total,
                    page,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Failed to get all banners: ${error.message}`);
        }
    }
}
