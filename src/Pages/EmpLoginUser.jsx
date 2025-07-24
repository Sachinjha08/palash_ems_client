import API from '../api/api.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components//Layout.jsx';
function EmpLoginUser() {

    const [product, setproduct] = useState([])

    const fetchdata = async () => {

        try {
            const res = await API.get('/user/allusers');
           
            const empldata =(res.data.employees);
            setproduct(empldata);
            console.log(empldata);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])

    return (

       <Layout>
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Total Login Users</h2>
            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-200 text-left">
                    <th className="p-2 border">Index</th>
                        <th className="p-2 border">Name:</th>
                        <th className="p-2 border">Email:</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((p, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-2 border">{i+1}</td>
                            <td className="p-2 border">{p.name}</td>
                            <td className="p-2 border">{p.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         
        </div>
        </Layout>

    )
}

export default EmpLoginUser