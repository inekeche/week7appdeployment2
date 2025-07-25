import { text } from 'express';
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number,

  // Add more fields as needed
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);
export default Item;
