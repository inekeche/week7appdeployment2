import { useEffect, useState } from 'react';
import axios from 'axios';

const PurchaseOrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get('/api/purchase-orders');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Purchase Orders</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Supplier</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="p-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">{order.supplier?.name}</td>
              <td className="p-2 border">
                <ul>
                  {order.items.map((it, idx) => (
                    <li key={idx}>{it.item?.name} × {it.quantity}</li>
                  ))}
                </ul>
              </td>
              <td className="p-2 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrderList;
