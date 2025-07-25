import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentStockReport = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      const res = await axios.get('/api/reports/current-stock');
      setStock(res.data);
    };
    fetchStock();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Current Stock Report</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th>Item</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.SKU}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
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


  const [stock, setStock] = useState([]);

  useEffect(() => {
    axios.get('/api/reports/current-stock')
      .then(res => setStock(res.data));
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Item", "SKU", "Category", "Quantity", "Unit Price"];
    const tableRows = stock.map(item => [
      item.name, item.SKU, item.category, item.quantity, item.unitPrice
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("current-stock-report.pdf");
  };

  const csvData = stock.map(item => ({
    Name: item.name,
    SKU: item.SKU,
    Category: item.category,
    Quantity: item.quantity,
    UnitPrice: item.unitPrice
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Current Stock Report</h2>
        <div className="space-x-2">
          <CSVLink data={csvData} filename="current-stock.csv" className="btn">
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
            <th>SKU</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.SKU}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

export default CurrentStockReport;
