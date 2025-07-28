import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/', createSupplier);           // Create new supplier
router.get('/', getAllSuppliers);           // Get all suppliers
router.get('/:id', getSupplierById);        // ✅ Get specific supplier by ID
router.put('/:id', updateSupplier);         // ✅ Update supplier by ID
router.delete('/:id', deleteSupplier);      // ✅ Delete supplier by ID

export default router;
