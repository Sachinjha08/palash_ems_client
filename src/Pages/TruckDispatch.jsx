import React, { useState, useEffect } from 'react';
import API from '../api/api.js';
import { useAuth } from '../content/AuthContext.jsx';
import Layout from '../components/Layout.jsx';
const TruckDispatchForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    driverName: '',
    truckNumber: '',
    emptyWeightKg: '',
    loadedWeightKg: '',
    bundleCount: '',
    bundleUnit: 'pieces', // default value
    itemDescription: '',
    remarks: '',
  });

  const [dispatches, setDispatches] = useState([]);

  const fetchDispatches = async () => {
    try {
      const response = await API.get('/truck/get');
      setDispatches(response.data);
    } catch (error) {
      console.error('Error fetching dispatches:', error);
    }
  };

  useEffect(() => {
    fetchDispatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/truck/add', {
        ...formData,
        dispatchBy: user?.id,
      });

      if (response.status === 201) {
        alert('Truck dispatched successfully!');
        setFormData({
          driverName: '',
          truckNumber: '',
          emptyWeightKg: '',
          loadedWeightKg: '',
          bundleCount: '',
          bundleUnit: 'pieces',
          itemDescription: '',
          remarks: '',
        });
        fetchDispatches();
      }
    } catch (error) {
      console.error('Error dispatching truck:', error);
      alert('There was an error dispatching the truck.');
    }
  };

  return (
    <Layout>
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg text-sm">
      <h2 className="text-xl font-bold text-center mb-4">Truck Dispatch</h2>

      {user?.role === 'admin' && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">Driver Name</label>
              <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} required className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Truck Number</label>
              
              <input type="text" name="truckNumber"  maxLength="10" value={formData.truckNumber} onChange={handleChange} required className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Empty Weight (kg)</label>
              <input type="number" name="emptyWeightKg" value={formData.emptyWeightKg} onChange={handleChange} required min="0" className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Loaded Weight (kg)</label>
              <input type="number" name="loadedWeightKg"  value={formData.loadedWeightKg} onChange={handleChange} required min="0" className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Bundle Count</label>
              <input type="number" name="bundleCount" value={formData.bundleCount} onChange={handleChange} required min="0" className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Bundle Unit</label>
              <select name="bundleUnit" value={formData.bundleUnit} onChange={handleChange} className="w-full mt-1 p-2 text-sm border border-gray-300 rounded">
                <option value="pieces">Pieces</option>
                <option value="kg">Kg</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700">Item Description</label>
              <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700">Remarks</label>
              <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full mt-1 p-2 text-sm border border-gray-300 rounded" />
            </div>
          </div>

          <button type="submit" className="w-full mt-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
            Dispatch Truck
          </button>
        </form>
      )}

      {/* Dispatch Records */}
      <h3 className="text-lg font-semibold mt-6">Dispatch Records</h3>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Truck No</th>
              <th className="p-2 border">Driver</th>
              <th className="p-2 border">Bundles</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Empty (kg)</th>
              <th className="p-2 border">Loaded (kg)</th>
              <th className="p-2 border">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {dispatches.map((dispatch, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 border">{dispatch.truckNumber}</td>
                <td className="p-2 border">{dispatch.driverName}</td>
                <td className="p-2 border">{dispatch.bundleCount}</td>
                <td className="p-2 border">{dispatch.bundleUnit}</td>
                <td className="p-2 border">{dispatch.emptyWeightKg}</td>
                <td className="p-2 border">{dispatch.loadedWeightKg}</td>
                <td className="p-2 border">{dispatch.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default TruckDispatchForm;
