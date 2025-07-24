

// // import React from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import About from './Pages/About.jsx';
// // import LandingPage from './Pages/LandingPages.jsx';
// // import LoginPage from './Pages/Login.jsx';
// // import RegisterPage from './Pages/Register.jsx';

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<LandingPage />} />
// //         <Route path="/login" element={<LoginPage />} />
// //         <Route path="/register" element={<RegisterPage />} />
// //         <Route path='/about' element={<About/>}/>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // src/App.js

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './content/AuthContext.jsx';
// import Login from './Pages/Login.jsx';
// import Register from './Pages/Register.jsx';
// import Dashboard from './Pages/Dashboard.jsx'
// import Production from './Pages/Production.jsx';
// import Inventory from './Pages/Inventory.jsx';
// import TruckDispatch from './Pages/TruckDispatch.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';
//  import LandingPage from './Pages/LandingPages.jsx';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path='/' element={<LandingPage/>}/>

//           <Route
//             path="/dashboard"
//             element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
//           />
//           <Route
//             path="/production"
//             element={<ProtectedRoute><Production /></ProtectedRoute>}
//           />
//           <Route
//             path="/inventory"
//             element={<ProtectedRoute><Inventory /></ProtectedRoute>}
//           />
//           <Route
//             path="/truck"
//             element={<ProtectedRoute><TruckDispatch /></ProtectedRoute>}
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './content/AuthContext.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Production from './Pages/Production.jsx';
import Inventory from './Pages/Inventory.jsx';
import TruckDispatch from './Pages/TruckDispatch.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './Pages/LandingPages.jsx';
import Unauthorized from './Pages/Unauthorized.jsx';
import EmpLoginUser from './Pages/EmpLoginUser.jsx';
import ResetPassword from './Pages/ChangePassword.jsx';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/production"
            element={
              <ProtectedRoute>
                <Production />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/truck"
            element={
              <ProtectedRoute>
                <TruckDispatch />
              </ProtectedRoute>
            }
          />
                <Route
            path="/emplogin"
            element={
              <ProtectedRoute>
                <EmpLoginUser/>
              </ProtectedRoute>
            }
          />
          <Route
          path='/reset-password' element={<ProtectedRoute><ResetPassword/></ProtectedRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
