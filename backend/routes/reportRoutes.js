import express from 'express';
import {
  getCurrentStockReport,
  getReorderListReport,
  getSalesVsPurchaseReport,
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/:current-stock', getCurrentStockReport);
router.get('/:reorder-list', getReorderListReport);
router.get('/:sales-vs-purchase', getSalesVsPurchaseReport);

export default router;
