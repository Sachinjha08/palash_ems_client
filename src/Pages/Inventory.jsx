// src/pages/InventoryPage.jsx
import { useEffect, useState } from 'react';
import API from '../api/api.js'; // Import the API instance
import Layout from '../components/Layout';
import { useAuth } from '../content/AuthContext.jsx';

const InventoryPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    itemName: '',
    quantity: '',
    unit: '',
    remarks: ''
  });

  const fetchInventory = async () => {
    try {
      const res = await API.get('/inventory/get'); // Use the API instance for the GET request
      setItems(res.data); // Set fetched data to the state
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/inventory/add', formData); // Use the API instance for the POST request
      setFormData({
        type: '',
        itemName: '',
        quantity: '',
        unit: '',
        remarks: ''
      });
      fetchInventory(); // Fetch updated inventory after submitting the new item
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {user?.role === 'admin' && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl mb-10 space-y-4">
          <div>
            <label className="block font-semibold">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">Select Type</option>
              <option value="raw">Raw Material</option>
              <option value="finished">Finished Product</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Item Name</label>
            <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block font-semibold">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block font-semibold">Unit</label>
            <select name="unit" value={formData.unit} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">Select Unit</option>
              <option value="kg">Kg</option>
              <option value="pieces">Pieces</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Remarks</label>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Inventory Item
          </button>
        </form>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Inventory List</h2>
        <table className="w-full table-auto border">
          <thead className='flex justify-center '>
            <tr className="bg-gray-100 ">
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 border capitalize">{item.type}</td>
                <td className="p-2 border">{item.itemName}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-2 border">{item.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default InventoryPage;
