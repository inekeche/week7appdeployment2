import { useState, useEffect } from 'react';
import axios from 'axios';

const PurchaseOrderForm = ({ onOrderCreated }) => {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    supplier: '',
    items: [{ item: '', quantity: 1 }]
  });

  useEffect(() => {
    axios.get('/api/items').then(res => setItems(res.data));
    axios.get('/api/suppliers').then(res => setSuppliers(res.data));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItemRow = () => {
    setFormData({ ...formData, items: [...formData.items, { item: '', quantity: 1 }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/purchase-orders', formData);
    onOrderCreated();
    setFormData({ supplier: '', items: [{ item: '', quantity: 1 }] });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Create Purchase Order</h2>

      <label className="block mb-2">
        Supplier:
        <select
          className="block w-full mt-1 border rounded p-2"
          value={formData.supplier}
          onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
        >
          <option value="">Select</option>
          {suppliers.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </label>

      {formData.items.map((row, index) => (
        <div key={index} className="flex gap-4 mb-2">
          <select
            className="w-2/3 p-2 border rounded"
            value={row.item}
            onChange={(e) => handleItemChange(index, 'item', e.target.value)}
          >
            <option value="">Select Item</option>
            {items.map(i => (
              <option key={i._id} value={i._id}>{i.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={row.quantity}
            className="w-1/3 p-2 border rounded"
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addItemRow} className="text-blue-600 underline mb-3">
        + Add Item
      </button>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PurchaseOrderForm;
