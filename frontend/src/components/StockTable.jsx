// src/components/StockTable.jsx
const StockTable = ({ items, onEdit, onDelete, onAdjust }) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th>Name</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Reorder Level</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          const isLow = item.quantity <= item.reorderLevel;
          return (
            <tr key={item._id} className={isLow ? 'bg-red-50' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.reorderLevel}</td>
              <td className={isLow ? 'text-red-600' : 'text-green-600'}>
                {isLow ? 'Low Stock' : 'In Stock'}
              </td>
              <td>
                <button onClick={() => onEdit(item)} className="text-blue-600">Edit</button>
                <button onClick={() => onDelete(item._id)} className="text-red-600 ml-2">Delete</button>
                <button onClick={() => onAdjust(item)} className="text-gray-600 ml-2">Adjust</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StockTable;
