
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/jj.jpg'; // Background image

const LandingPage = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden relative">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 z-20 relative shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">GFRP Rebar Project</div>
          <div className="space-x-4">
            <Link to="/login">
              <button className="text-white bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-700">Login</button>
            </Link>
            <Link to="/register">
              <button className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-500">Register</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-teal-600 to-indigo-800 opacity-70 z-0" />

        {/* Cursor effect */}
        <motion.div
          className="fixed w-24 h-24 rounded-full bg-blue-300 opacity-20 pointer-events-none"
          style={{
            top: cursorPos.y - 48,
            left: cursorPos.x - 48,
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Text Content */}
        <div className="z-10 text-center px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            GFRP Rebar Industrial Management System
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Track production, manage inventory, and monitor logistics in real-time.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md">
                Get Started
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10 text-blue-700">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 shadow-md rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">Production Tracking</h3>
            <p className="text-gray-600">Daily, Weekly, Monthly, and Yearly GFRP output reports with real-time monitoring.</p>
          </div>
          <div className="p-6 shadow-md rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
            <p className="text-gray-600">Live inventory dashboard to manage raw materials and GFRP bundle stock.</p>
          </div>
          <div className="p-6 shadow-md rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">Truck Dispatch</h3>
            <p className="text-gray-600">Manage truck registrations, loaded bundle weights, and dispatch logs efficiently.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>&copy; 2025 GFRP Rebar Industrial Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
