// src/components/Layout.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../content/AuthContext.jsx';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">GFRP Dashboard</h2>
        <nav className="space-y-2">
          <Link className="block hover:bg-gray-700 p-2 rounded" to="/dashboard">Home</Link>

          {/* Admin only links */}
          {user?.role === 'admin' && (
            <>
              <Link className="block hover:bg-gray-700 p-2 rounded" to="/production">Production</Link>
              <Link className="block hover:bg-gray-700 p-2 rounded" to="/inventory">Inventory</Link>
              <Link className="block hover:bg-gray-700 p-2 rounded" to="/truck">Truck Dispatch</Link>
            </>
          )}

          {/* Employee can only view */}
          {user?.role === 'employee' && (
            <>
              <Link className="block hover:bg-gray-700 p-2 rounded" to="/production">View Production</Link>
              <Link className="block hover:bg-gray-700 p-2 rounded" to="/inventory">View Inventory</Link>
              <Link className="block hover:bg-gray-700 p-2 rounded" to="/truck">Truck Details</Link>
            </>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded mt-6"
        >
          Logout
        </button>
        <Link
          to="/reset-password"
          className="block text-center w-full bg-blue-500 hover:bg-green-600 text-white py-2 rounded mt-6"
        >
          Reset Password
        </Link>


      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;
