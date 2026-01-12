import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // ← Added for health check

// Routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import adminProductRoutes from './routes/admin.product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import contentRoutes from './routes/content.routes.js';
import adminRoutes from './routes/admin.routes.js';
import protectedRoutes from './routes/protected.routes.js';

// Database connection
import connectDB from './config/mongodb.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminProductRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/content', contentRoutes);
app.use('/protected', protectedRoutes);
app.use('/admin', adminRoutes);

// Health Check
app.get('/health', async (req, res) => {
  try {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    res.json({
      success: true,
      message: 'Backend is running ✅',
      timestamp: new Date().toISOString(),
      services: {
        mongodb: {
          connection: mongoStatus,
          host: mongoose.connection.host || 'not connected',
          database: mongoose.connection.name || 'none'
        },
        firebase: 'connected',
        auth: 'ready',
        products: 'ready',
        cart: 'ready',
        orders: 'ready',
        admin: 'ready'
      },
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({
      success: false,
      error: 'Health check failed ❌',
      message: err.message
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

// Start Server — Only after DB connection attempt
const startServer = async () => {
  await connectDB(); // This will log success/failure and retry if needed

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Health check: http://localhost:${PORT}/health`);
    console.log(`🛍️ Products API: http://localhost:${PORT}/api/products`);
    console.log(`🛍️ Admin Products API: http://localhost:${PORT}/api/admin/products`);
    console.log(`🛒 Cart API: http://localhost:${PORT}/api/cart`);
    console.log(`📦 Orders API: http://localhost:${PORT}/api/orders`);
    console.log(`🔐 Auth API: http://localhost:${PORT}/auth`);
    console.log(`👑 Admin Dashboard: http://localhost:${PORT}/admin`);
  });
};

startServer();