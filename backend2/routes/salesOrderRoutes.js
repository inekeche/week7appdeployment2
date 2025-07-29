// salesOrderRoutes.js
import express from 'express';
import {
  createSalesOrder,
  getAllSalesOrders,
  getSalesOrderById,
  updateSalesOrder,
  deleteSalesOrder
} from '../controllers/salesOrderController.js';

const router = express.Router();

// Define routes
router.post('/', createSalesOrder);
router.get('/', getAllSalesOrders);
router.get('/:id', getSalesOrderById);
router.put('/:id', updateSalesOrder);
router.delete('/:id', deleteSalesOrder);

// Export the router
export default router;
