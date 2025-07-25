// backend/routes/stockMovementRoutes.js
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
router.get('/', getAllStockMovements);                // GET all movements (optionally with filters)
router.get('/stats', getStockMovementStats);          // GET aggregate stats
router.get('/item/:itemId', getStockMovementsByItem); // GET by item ID
router.get('/:id', getStockMovementById);             // GET by movement ID
router.post('/', createStockMovement);                // POST new movement
router.delete('/:id', deleteStockMovement);           // DELETE movement

export default router;
