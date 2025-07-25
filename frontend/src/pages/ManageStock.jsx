// src/pages/ManageStock.jsx
import { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import StockTable from '../components/StockTable';
import AdjustStockModal from '../components/AdjustStockModal';

const ManageStock = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [adjusting, setAdjusting] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (form) => {
    const method = form._id ? 'PUT' : 'POST';
    const url = form._id ? `/api/items/${form._id}` : '/api/items';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    fetchItems();
    setSelected(null);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const handleAdjustSave = async (updatedItem) => {
    await fetch(`/api/items/${updatedItem._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    });
    fetchItems();
    setAdjusting(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <ItemForm selectedItem={selected} onSubmit={handleSubmit} />
      <div className="mt-6">
        <StockTable items={items} onEdit={setSelected} onDelete={handleDelete} onAdjust={setAdjusting} />
      </div>
      {adjusting && (
        <AdjustStockModal
          item={adjusting}
          onClose={() => setAdjusting(null)}
          onSave={handleAdjustSave}
        />
      )}
    </div>
  );
};

export default ManageStock;
