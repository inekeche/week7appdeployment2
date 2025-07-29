// models/StockHistory.js
const mongoose = require('mongoose');

const stockHistorySchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  type: { type: String, enum: ['add', 'remove'], required: true },
  quantity: Number,
  note: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockHistory', stockHistorySchema);
