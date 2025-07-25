import { useEffect, useState } from 'react';
import axios from 'axios';

const SalesOrderForm = ({ onOrderCreated }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    items: [{ item: '', quantity: 1 }]
  });

  useEffect(() => {
    axios.get('/api/items').then(res => setItems(res.data));
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
    await axios.post('/api/sales-orders', formData);
    onOrderCreated?.();
    setFormData({ customerName: '', items: [{ item: '', quantity: 1 }] });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Create Sales Order</h2>

      <label className="block mb-2">
        Customer Name:
        <input
          className="block w-full mt-1 border rounded p-2"
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        />
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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Order
      </button>
    </form>
  );
};

export default SalesOrderForm;
