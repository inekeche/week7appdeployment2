import express from 'express';
import {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
  completePurchaseOrder,
} from '../controllers/purchaseOrderController.js';

const router = express.Router();

// Routes
router.route('/')
  .post(createPurchaseOrder)
  .get(getPurchaseOrders);

router.route('/:id')
  .get(getPurchaseOrderById)
  .put(updatePurchaseOrder)
  .delete(deletePurchaseOrder);

router.put('/:id/complete', completePurchaseOrder);

export default router;

