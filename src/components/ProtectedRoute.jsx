// // // src/components/ProtectedRoute.jsx
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../content/AuthContext.jsx';

// const ProtectedRoute = ({ children, role }) => {
//   const { user } = useAuth();

//   if (!user || !localStorage.getItem('token')) {
//     // If no user or no token, redirect to login page
//     return <Navigate to="/login" />;
//   }

//   if (role && user.role !== role) {
//     // If the user role does not match, redirect to unauthorized page
//     return <Navigate to="/unauthorized" />;
//   }

//   return children; // Allow access to protected route if user exists and has valid role
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../content/AuthContext.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // Check if the user is authenticated and has a valid token
  if (!user || !localStorage.getItem('token')) {
    // If no user or token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If a role is specified and the user's role doesn't match, redirect to unauthorized page
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  // Otherwise, render the children (protected content)
  return children;
};

export default ProtectedRoute;
