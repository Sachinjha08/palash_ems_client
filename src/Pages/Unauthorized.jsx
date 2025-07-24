// src/Pages/Unauthorized.jsx
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
        <p className="mt-4">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
