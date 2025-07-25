import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StockHistoryTable = () => {
  const [history, setHistory] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', item: '', type: '' });
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const res = await axios.get('/api/stock-history', { params: filters });
    setHistory(res.data);
  };

  useEffect(() => {
    axios.get('/api/items').then(res => setItems(res.data));
    fetchData();
  }, []);

  const handleExportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(
      history.map(h => ({
        Date: new Date(h.createdAt).toLocaleString(),
        Item: h.item?.name,
        Type: h.type,
        Quantity: h.quantity,
        Note: h.note
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stock History');
    XLSX.writeFile(wb, 'Stock_History.csv');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Stock History Report', 14, 16);
    doc.autoTable({
      head: [['Date', 'Item', 'Type', 'Qty', 'Note']],
      body: history.map(h => [
        new Date(h.createdAt).toLocaleString(),
        h.item?.name,
        h.type,
        h.quantity,
        h.note || ''
      ]),
      startY: 20
    });
    doc.save('Stock_History.pdf');
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">📜 Stock Movement History</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input type="date" value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          className="border p-2 rounded" />
        <input type="date" value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="border p-2 rounded" />
        <select value={filters.item}
          onChange={(e) => setFilters({ ...filters, item: e.target.value })}
          className="border p-2 rounded">
          <option value="">All Items</option>
          {items.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
        </select>
        <select value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="add">Added</option>
          <option value="remove">Removed</option>
        </select>
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
      </div>

      {/* Table */}
      <table className="w-full border table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Item</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Note</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{new Date(entry.createdAt).toLocaleString()}</td>
              <td className="p-2 border">{entry.item?.name}</td>
              <td className="p-2 border">{entry.type}</td>
              <td className="p-2 border">{entry.quantity}</td>
              <td className="p-2 border">{entry.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export buttons */}
      <div className="flex gap-4 mt-4">
        <button onClick={handleExportCSV} className="bg-green-600 text-white px-4 py-2 rounded">Export CSV</button>
        <button onClick={handleExportPDF} className="bg-red-600 text-white px-4 py-2 rounded">Export PDF</button>
      </div>
    </div>
  );
};

export default StockHistoryTable;
