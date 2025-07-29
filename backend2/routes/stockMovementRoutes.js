import express from 'express';
import {
  getAllStockMovements,
  getStockMovementById,
  createStockMovement,
  deleteStockMovement,
  getStockMovementsByItem,
  getStockMovementStats
} from '../controllers/stockMovementController.js';

const router = express.Router();

// Routes
router.get('/', getAllStockMovements);                   // GET all movements
router.get('/stats', getStockMovementStats);             // GET stats
router.get('/item/:itemId', getStockMovementsByItem);    // GET by item ID
router.get('/:id', getStockMovementById);                // ✅ FIXED
router.post('/', createStockMovement);
router.delete('/:id', deleteStockMovement);              // ✅ FIXED

export default router;
