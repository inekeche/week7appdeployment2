
import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from '../controllers/supplierController.js';

const router = express.Router();

// Create supplier
router.post('/', createSupplier);

// Get all suppliers
router.get('/', getAllSuppliers);

// Get, update, delete by ID (✅ parameterized)
router.get('/:id', getSupplierById);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
