// src/components/OverviewCards.jsx
const OverviewCards = ({ totalItems, lowStockCount, recentOrders }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-sm text-gray-600">Total Items</h2>
        <p className="text-2xl font-bold">{totalItems}</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-sm text-gray-600">Low Stock Alerts</h2>
        <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
      </div>
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-sm text-gray-600">Recent Orders</h2>
        <p className="text-2xl font-bold">{recentOrders}</p>
      </div>
    </div>
  );
};

export default OverviewCards;
