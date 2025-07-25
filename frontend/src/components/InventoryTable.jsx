// src/components/InventoryTable.jsx
import { useState, useMemo } from 'react';

const InventoryTable = ({ items }) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    filtered.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortAsc
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
    return filtered;
  }, [items, search, sortKey, sortAsc]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, page]);

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search item..."
          className="border px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="quantity">Quantity</option>
          <option value="category">Category</option>
        </select>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-sm text-blue-600"
        >
          {sortAsc ? 'Asc ▲' : 'Desc ▼'}
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="text-sm">
          ◀ Prev
        </button>
        <span className="text-sm">Page {page}</span>
        <button disabled={page * itemsPerPage >= filteredItems.length} onClick={() => setPage(p => p + 1)} className="text-sm">
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
