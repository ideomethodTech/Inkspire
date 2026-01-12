import { ContentService } from '../services/mongo/content.service.js';

export class ContentController {
    // Get active hero banners (Public)
    static async getHeroBanners(req, res) {
        try {
            const result = await ContentService.getActiveHeroBanners();
            return res.status(200).json(result);
        } catch (error) {
            console.error('[GET HERO BANNERS] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to get hero banners'
            });
        }
    }

    // Get trending products (Public)
    static async getTrendingProducts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const result = await ContentService.getTrendingProducts(limit);
            return res.status(200).json(result);
        } catch (error) {
            console.error('[GET TRENDING] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to get trending products'
            });
        }
    }

    // Create hero banner (Admin)
    static async createHeroBanner(req, res) {
        try {
            const { title, subtitle, description, image, mobileImage, link, linkText, type, category, priority, startDate, endDate } = req.body;

            if (!title || !image) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and image are required'
                });
            }

            const result = await ContentService.createHeroBanner(req.body);
            return res.status(201).json(result);
        } catch (error) {
            console.error('[CREATE HERO BANNER] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to create hero banner'
            });
        }
    }

    // Update hero banner (Admin)
    static async updateHeroBanner(req, res) {
        try {
            const { bannerId } = req.params;
            const result = await ContentService.updateHeroBanner(bannerId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.error('[UPDATE HERO BANNER] Error:', error);
            const status = error.message?.includes('not found') ? 404 : 500;
            return res.status(status).json({
                success: false,
                message: error.message || 'Failed to update hero banner'
            });
        }
    }

    // Delete hero banner (Admin)
    static async deleteHeroBanner(req, res) {
        try {
            const { bannerId } = req.params;
            const result = await ContentService.deleteHeroBanner(bannerId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('[DELETE HERO BANNER] Error:', error);
            const status = error.message?.includes('not found') ? 404 : 500;
            return res.status(status).json({
                success: false,
                message: error.message || 'Failed to delete hero banner'
            });
        }
    }

    // Get all banners (Admin)
    static async getAllBanners(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await ContentService.getAllBanners(page, limit);
            return res.status(200).json(result);
        } catch (error) {
            console.error('[GET ALL BANNERS] Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to get banners'
            });
        }
    }
}
