// ✅ backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import serveStatic from 'serve-static';

// 🔗 Route imports
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import purchaseOrderRoutes from './routes/purchaseOrderRoutes.js';
import salesOrderRoutes from './routes/salesOrderRoutes.js';
import stockMovementRoutes from './routes/stockMovementRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

// 🌍 Init env and app
dotenv.config();
const app = express();

// 🧠 Utilities for __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🧪 Test Route
app.get('/api', (req, res) => {
  res.send('✅ API is running...');
});

// 📦 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/sales-orders', salesOrderRoutes);
app.use('/api/stock-movements', stockMovementRoutes);
app.use('/api/reports', reportRoutes);

// 🌐 Serve frontend (for production)
app.use(serveStatic(path.join(__dirname, '../frontend/dist')));

// 🧭 Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// 🚀 Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
