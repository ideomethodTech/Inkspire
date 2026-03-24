import Newsletter from '../models/mongo/newsletter.model.js';

export class NewsletterController {
  static async subscribe(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }

      // Check if already subscribed
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        if (!existing.isActive) {
          existing.isActive = true;
          existing.subscribedAt = new Date();
          await existing.save();
          return res.status(200).json({ success: true, message: 'Welcome back! Subscribed successfully.' });
        }
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      }

      const subscription = new Newsletter({ email });
      await subscription.save();

      return res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
      console.error('Newsletter Error:', error);
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      }
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
