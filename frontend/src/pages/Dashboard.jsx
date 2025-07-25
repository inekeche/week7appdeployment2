// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import OverviewCards from '../components/OverviewCards';
import InventoryTable from '../components/InventoryTable';

const Dashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from backend
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const lowStock = items.filter((item) => item.quantity < 10);
  const recentOrders = 5; // Replace with actual fetch later

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <OverviewCards
        totalItems={items.length}
        lowStockCount={lowStock.length}
        recentOrders={recentOrders}
      />
      <InventoryTable items={items} />
    </div>
  );
};

export default Dashboard;
