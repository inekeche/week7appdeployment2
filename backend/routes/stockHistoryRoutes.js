// routes/stockHistoryRoutes.js
const express = require('express');
const router = express.Router();
const StockHistory = require('../models/StockHistory');

router.get('/', async (req, res) => {
  const { startDate, endDate, item, type } = req.query;
  const filter = {};

  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (item) filter.item = item;
  if (type) filter.type = type;

  const history = await StockHistory.find(filter).populate('item', 'name');
  res.json(history);
});

module.exports = router;
