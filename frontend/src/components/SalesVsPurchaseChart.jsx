import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SalesVsPurchaseChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/reports/sales-vs-purchase?range=month')
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sales vs Purchase Chart</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="purchased" stroke="#8884d8" name="Purchased" />
          <Line type="monotone" dataKey="sold" stroke="#82ca9d" name="Sold" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesVsPurchaseChart;
