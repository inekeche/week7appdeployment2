import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/', createSupplier);
router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);       // ✅ FIXED
router.put('/:id', updateSupplier);        // ✅ FIXED
router.delete('/:id', deleteSupplier);     // ✅ FIXED

export default router;
