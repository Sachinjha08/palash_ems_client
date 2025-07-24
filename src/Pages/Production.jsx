
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import Layout from '../components/Layout';
import { useAuth } from '../content/AuthContext.jsx';

const ProductionPage = () => {
  const { user } = useAuth();
  const [productions, setProductions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    shift: '',
    operatorName: '',
    bundleCount: '',
    totalWeightKg: '',
    remarks: ''
  });

  const fetchProductions = async () => {
    try {
      const res = await API.get('/production/all');
      setProductions(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/production/add', formData);
      setFormData({
        date: '',
        shift: '',
        operatorName: '',
        bundleCount: '',
        totalWeightKg: '',
        remarks: ''
      });
      fetchProductions();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Production Management</h1>

        {user.role === 'admin' && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Add Production Record</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border rounded p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Shift</label>
                <select name="shift" value={formData.shift} onChange={handleChange} required className="w-full border rounded p-2">
                  <option value="">Select Shift</option>
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Operator Name</label>
                <input type="text" name="operatorName" value={formData.operatorName} onChange={handleChange} required className="w-full border rounded p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Bundle Count</label>
                <input type="number" name="bundleCount" value={formData.bundleCount} onChange={handleChange} required className="w-full border rounded p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Total Weight (kg)</label>
                <input type="number" name="totalWeightKg" value={formData.totalWeightKg} onChange={handleChange} required className="w-full border rounded p-2" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">Remarks</label>
                <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded p-2" />
              </div>
            </div>

            <button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
              Add Production
            </button>
          </form>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Production History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Shift</th>
                  <th className="p-2 border">Operator</th>
                  <th className="p-2 border">Bundles</th>
                  <th className="p-2 border">Weight (kg)</th>
                  <th className="p-2 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-2 border">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="p-2 border capitalize">{p.shift}</td>
                    <td className="p-2 border">{p.operatorName}</td>
                    <td className="p-2 border">{p.bundleCount}</td>
                    <td className="p-2 border">{p.totalWeightKg}</td>
                    <td className="p-2 border">{p.remarks || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductionPage;
// // src/pages/ProductionPage.jsx
// import { useEffect, useState } from 'react';
// import API from '../api/api.js'; // Import the API instance
// import Layout from '../components/Layout';
// import { useAuth } from '../content/AuthContext.jsx';

// const ProductionPage = () => {
//   const { user } = useAuth();
//   const [productions, setProductions] = useState([]);
//   const [formData, setFormData] = useState({
//     date: '',
//     shift: '',
//     operatorName: '',
//     bundleCount: '',
//     totalWeightKg: '',
//     remarks: ''
//   });

//   const fetchProductions = async () => {
//     try {
//       const res = await API.get('/production/all'); // Use the API instance
//       setProductions(res.data); // Set data to state
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProductions();
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/production/add', formData); // Use the API instance
//       setFormData({
//         date: '',
//         shift: '',
//         operatorName: '',
//         bundleCount: '',
//         totalWeightKg: '',
//         remarks: ''
//       });
//       fetchProductions(); // Fetch productions after submission
//     } catch (err) {
//       console.error('Submit error:', err);
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">Production Details</h1>

//       {user.role === 'admin' && (
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4 max-w-lg">
//           <div>
//             <label className="block">Date</label>
//             <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border rounded p-2" />
//           </div>
//           <div>
//             <label className="block">Shift</label>
//             <select name="shift" value={formData.shift} onChange={handleChange} required className="w-full border rounded p-2">
//               <option value="">Select Shift</option>
//               <option value="morning">Morning</option>
//               <option value="eveing">Evening</option>
//               <option value="night">Night</option>
//             </select>
//           </div>
//           <div>
//             <label className="block">Operator Name</label>
//             <input type="text" name="operatorName" value={formData.operatorName} onChange={handleChange} required className="w-full border rounded p-2" />
//           </div>
//           <div>
//             <label className="block">Bundle Count</label>
//             <input type="number" name="bundleCount" value={formData.bundleCount} onChange={handleChange} required className="w-full border rounded p-2" />
//           </div>
//           <div>
//             <label className="block">Total Weight (kg)</label>
//             <input type="number" name="totalWeightKg" value={formData.totalWeightKg} onChange={handleChange} required className="w-full border rounded p-2" />
//           </div>
//           <div>
//             <label className="block">Remarks</label>
//             <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded p-2" />
//           </div>
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Production</button>
//         </form>
//       )}

//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-xl font-semibold mb-2">Production History</h2>
//         <table className="w-full table-auto border">
//           <thead>
//             <tr className="bg-gray-200 text-left flex justify-center">
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Shift</th>
//               <th className="p-2 border">Operator</th>
//               <th className="p-2 border">Bundles</th>
//               <th className="p-2 border">Weight (kg)</th>
//               <th className="p-2 border">Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productions.map((p, i) => (
//               <tr key={i} className="border-t">
//                 <td className="p-2 border">{new Date(p.date).toLocaleDateString()}</td>
//                 <td className="p-2 border capitalize">{p.shift}</td>
//                 <td className="p-2 border">{p.operatorName}</td>
//                 <td className="p-2 border">{p.bundleCount}</td>
//                 <td className="p-2 border">{p.totalWeightKg}</td>
//                 <td className="p-2 border">{p.remarks || '-'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Layout>
//   );
// };

// export default ProductionPage;
// src/pages/ProductionPage.jsx