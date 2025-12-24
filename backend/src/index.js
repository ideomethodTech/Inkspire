import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import adminProductRoutes from './routes/admin.product.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { db } from './config/firebase.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminProductRoutes);
app.use('/protected', protectedRoutes);
app.use('/admin', adminRoutes);

// Health Check
app.get('/health', async (req, res) => {
  try {
    await db.collection('health').doc('check').set({
      status: 'ok',
      time: new Date(),
    });

    res.json({ 
      success: true,
      message: 'Backend is running ✅',
      timestamp: new Date().toISOString(),
      services: {
        firebase: 'connected',
        auth: 'ready',
        products: 'ready'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      error: 'Firebase connection failed ❌' 
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/health`);
  console.log(`🛍️  Products API: http://localhost:${PORT}/api/products`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/auth`);
});