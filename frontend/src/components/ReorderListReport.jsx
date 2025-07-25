import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReorderListReport = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/reports/reorder-list')
      .then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reorder List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.reorderLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

 const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/reports/reorder-list')
      .then(res => setItems(res.data));
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Item", "Quantity", "Reorder Level"];
    const tableRows = items.map(item => [
      item.name, item.quantity, item.reorderLevel
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("reorder-list.pdf");
  };

  const csvData = items.map(item => ({
    Name: item.name,
    Quantity: item.quantity,
    ReorderLevel: item.reorderLevel
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reorder List Report</h2>
        <div className="space-x-2">
          <CSVLink data={csvData} filename="reorder-list.csv" className="btn">
            Export CSV
          </CSVLink>
          <button onClick={exportPDF} className="btn bg-red-600 text-white px-2 py-1 rounded">
            Export PDF
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.reorderLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );



export default ReorderListReport;
