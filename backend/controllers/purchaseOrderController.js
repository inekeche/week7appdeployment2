import PurchaseOrder from '../models/PurchaseOrder.js';
import Item from '../models/Item.js';

// Create a new purchase order
export const createPurchaseOrder = async (req, res) => {
  try {
    const { supplier, items } = req.body;

    const newOrder = new PurchaseOrder({
      supplier,
      items,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create purchase order', error: error.message });
  }
};

// Get all purchase orders
export const getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate('supplier').populate('items.item');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch purchase orders', error: error.message });
  }
};

// Get purchase order by ID
export const getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id).populate('supplier').populate('items.item');

    if (!order) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch purchase order', error: error.message });
  }
};

// Update purchase order
export const updatePurchaseOrder = async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update purchase order', error: error.message });
  }
};

// Delete purchase order
export const deletePurchaseOrder = async (req, res) => {
  try {
    const deleted = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.status(200).json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete purchase order', error: error.message });
  }
};

// Mark purchase order as completed (e.g., items received)
export const completePurchaseOrder = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    if (order.status === 'received') {
      return res.status(400).json({ message: 'Purchase order already completed' });
    }

    // Update item quantities in stock
    for (const entry of order.items) {
      const item = await Item.findById(entry.item);
      if (item) {
        item.quantity += entry.quantity;
        await item.save();
      }
    }

    order.status = 'received';
    await order.save();

    res.status(200).json({ message: 'Purchase order marked as completed', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete purchase order', error: error.message });
  }
};
