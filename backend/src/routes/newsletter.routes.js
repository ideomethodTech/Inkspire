import express from 'express';
import { NewsletterController } from '../controllers/newsletter.controller.js';

const router = express.Router();

router.post('/subscribe', NewsletterController.subscribe);

export default router;