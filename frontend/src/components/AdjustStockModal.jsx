// src/components/AdjustStockModal.jsx
import { useState } from 'react';

const AdjustStockModal = ({ item, onClose, onSave }) => {
  const [amount, setAmount] = useState(0);

  const handleAdjust = (type) => {
    const adjustedQty = type === 'add' ? item.quantity + amount : item.quantity - amount;
    onSave({ ...item, quantity: adjustedQty });
  };

  return (
    <div className="modal">
      <h3>Adjust Stock: {item.name}</h3>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <div className="flex space-x-2 mt-2">
        <button onClick={() => handleAdjust('add')} className="btn-green">Add</button>
        <button onClick={() => handleAdjust('remove')} className="btn-yellow">Remove</button>
        <button onClick={onClose} className="btn-gray">Cancel</button>
      </div>
    </div>
  );
};

export default AdjustStockModal;
