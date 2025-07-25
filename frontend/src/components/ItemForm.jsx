// src/components/ItemForm.jsx
import { useState, useEffect } from 'react';

const ItemForm = ({ selectedItem, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: 0,
    reorderLevel: 10
  });

  useEffect(() => {
    if (selectedItem) {
      setForm(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Item Name" className="input" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
      <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="input" />
      <input type="number" name="reorderLevel" value={form.reorderLevel} onChange={handleChange} placeholder="Reorder Level" className="input" />
      <button type="submit" className="btn-primary">{selectedItem ? "Update" : "Create"} Item</button>
    </form>
  );
};

export default ItemForm;
