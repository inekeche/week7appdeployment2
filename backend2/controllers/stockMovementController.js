// Import models
import StockMovement from '../models/StockMovement.js';
import Item from '../models/item.js';

// Create Stock Movement and adjust item quantity
export const createStockMovement = async (req, res) => {
  try {
    const { itemId, type, quantity, notes } = req.body;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (type === 'in') {
      item.quantity += quantity;
    } else if (type === 'out') {
      if (item.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      item.quantity -= quantity;
    } else {
      return res.status(400).json({ message: 'Invalid movement type' });
    }

    await item.save();

    const movement = await StockMovement.create({
      itemId,
      type,
      quantity,
      notes,
      date: new Date(),
    });

    res.status(201).json(movement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all stock movements (optionally filtered)
export const getAllStockMovements = async (req, res) => {
  try {
    const { type, itemId, startDate, endDate, keyword } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (itemId) filter.itemId = itemId;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (keyword) {
      filter.notes = { $regex: keyword, $options: 'i' };
    }

    const movements = await StockMovement.find(filter).populate('itemId');
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get movement by ID
export const getStockMovementById = async (req, res) => {
  try {
    const movement = await StockMovement.findById(req.params.id).populate('itemId');
    if (!movement) return res.status(404).json({ message: 'Not found' });
    res.json(movement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get movements for a specific item
export const getStockMovementsByItem = async (req, res) => {
  try {
    const movements = await StockMovement.find({ itemId: req.params.itemId }).populate('itemId');
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a stock movement (if needed)
export const deleteStockMovement = async (req, res) => {
  try {
    const result = await StockMovement.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get stock movement stats (monthly summary)
export const getStockMovementStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const stats = await StockMovement.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: '$type',
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ]);

    let inQty = 0;
    let outQty = 0;
    stats.forEach(stat => {
      if (stat._id === 'in') inQty = stat.totalQuantity;
      else if (stat._id === 'out') outQty = stat.totalQuantity;
    });

    res.json({
      in: inQty,
      out: outQty,
      net: inQty - outQty
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
