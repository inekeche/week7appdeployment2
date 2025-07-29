import SalesOrder from '../models/salesOrder.js';
import Item from '../models/item.js';
import StockMovement from '../models/StockMovement.js';
import PurchaseOrder from '../models/PurchaseOrder.js';

// ✅ Create Sales Order
export const createSalesOrder = async (req, res) => {
  try {
    const order = await SalesOrder.create(req.body);

    // Validate and update stock
    await Promise.all(order.items.map(async (entry) => {
      const item = await Item.findById(entry.item);
      if (!item || item.quantity < entry.quantity) {
        throw new Error(`Insufficient stock for item: ${entry.item}`);
      }

      item.quantity -= entry.quantity;
      await item.save();

      await StockMovement.create({
        itemId: entry.item,
        type: 'out',
        quantity: entry.quantity,
        notes: `Sales Order: ${order._id}`,
        date: new Date()
      });
    }));

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get All Sales Orders
export const getAllSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().populate('items.item');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Sales Order By ID
export const getSalesOrderById = async (req, res) => {
  try {
    const order = await SalesOrder.findById(req.params.id).populate('items.item');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Sales Order (handle status change)
export const updateSalesOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await SalesOrder.findById(id).populate('items.item');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const originalStatus = order.status;
    order.status = status;
    await order.save();

    // Only deduct stock if status changed to completed
    if (status === 'completed' && originalStatus !== 'completed') {
      for (const orderItem of order.items) {
        const item = await Item.findById(orderItem.item._id);
        if (item.quantity < orderItem.quantity)
          return res.status(400).json({ message: `Insufficient stock for ${item.name}` });

        item.quantity -= orderItem.quantity;
        await item.save();

        await StockMovement.create({
          itemId: item._id,
          type: 'out',
          quantity: orderItem.quantity,
          date: new Date(),
          notes: `Stock sold via Sales Order ${order._id}`
        });
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Sales Order
export const deleteSalesOrder = async (req, res) => {
  try {
    await SalesOrder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sales order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ (Optional) Complete Purchase Order - Stock In
export const completePurchaseOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await PurchaseOrder.findById(orderId).populate('items.item');

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status === 'completed') return res.status(400).json({ message: 'Already completed' });

    order.status = 'completed';
    await order.save();

    const movements = order.items.map(entry => ({
      itemId: entry.item._id,
      type: 'in',
      quantity: entry.quantity,
      date: new Date(),
      notes: `Auto update from PurchaseOrder ${order._id}`
    }));

    // Apply stock-in movements
    await Promise.all(order.items.map(async (entry) => {
      const item = await Item.findById(entry.item._id);
      item.quantity += entry.quantity;
      await item.save();
    }));

    await StockMovement.insertMany(movements);

    res.json({ message: 'Purchase Order marked as complete and stock updated' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
