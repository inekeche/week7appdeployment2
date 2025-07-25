import Item from '../models/Item.js';
import PurchaseOrder from '../models/PurchaseOrder.js';
import SalesOrder from '../models/SalesOrder.js';

// Current Stock Report
export const getCurrentStockReport = async (req, res) => {
  try {
    const items = await Item.find({}, 'name SKU quantity unitPrice category');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get current stock', error: err });
  }
};

// Reorder List Report
export const getReorderListReport = async (req, res) => {
  try {
    const items = await Item.find({ $expr: { $lte: ['$quantity', '$reorderLevel'] } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reorder list', error: err });
  }
};

// Sales vs Purchase Report (Aggregated by Day or Month)
export const getSalesVsPurchaseReport = async (req, res) => {
  try {
    const { range = 'month' } = req.query;

    const groupFormat = range === 'day'
      ? { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
      : { $dateToString: { format: '%Y-%m', date: '$date' } };

    const purchases = await PurchaseOrder.aggregate([
      { $unwind: '$items' },
      { $group: {
        _id: groupFormat,
        totalPurchased: { $sum: '$items.quantity' }
      }}
    ]);

    const sales = await SalesOrder.aggregate([
      { $unwind: '$items' },
      { $group: {
        _id: groupFormat,
        totalSold: { $sum: '$items.quantity' }
      }}
    ]);

    // Merge results
    const merged = {};

    purchases.forEach(p => {
      merged[p._id] = { date: p._id, purchased: p.totalPurchased, sold: 0 };
    });

    sales.forEach(s => {
      if (merged[s._id]) {
        merged[s._id].sold = s.totalSold;
      } else {
        merged[s._id] = { date: s._id, purchased: 0, sold: s.totalSold };
      }
    });

    res.json(Object.values(merged));
  } catch (err) {
    res.status(500).json({ message: 'Failed to get report', error: err });
  }
};
