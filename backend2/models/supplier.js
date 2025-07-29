// Supplier.js (ES module version)
import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactPerson: String,
  email: String,
  phone: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
