import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';

const router = express.Router();

// RESTful Item Routes
router.get('/', getAllItems);           // GET all items
router.get('/:id', getItemById);        // GET item by ID
router.post('/', createItem);           // POST new item
router.put('/:id', updateItem);         // PUT update item by ID
router.delete('/:id', deleteItem);      // DELETE item by ID

export default router;

