// models/StockMovement.js
import mongoose from 'mongoose';

const stockMovementSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  type: { type: String, enum: ['in', 'out'], required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String }
}, { timestamps: true });

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

export default StockMovement;
