import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";

const AdminLogin = lazy(() => import("/src/Pages/Auth_Pages/AdminLogin.jsx"));
const EmployeeLogin = lazy(() => import("/src/Pages/Auth_Pages/EmployeeLogin.jsx"));
const AdminDashboard = lazy(() => import("/src/Pages/Dashboard_Pages/AdminDasboardWrapper.jsx"));
const ManagerDashboard = lazy(() => import("/src/Pages/Dashboard_Pages/ManagerDashboardWrapper.jsx"));
const EmployeeDashboard = lazy(() => import("/src/Pages/Dashboard_Pages/UserDashboardWrapper.jsx"));
const Manager_Profile = lazy(() => import("/src/Components/Manager_DashBoard_Components/Manager_Profile.jsx"));

// ✅ Optional: simple loading fallback
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-pink-500 to-orange-400 text-white text-lg font-semibold">
    Loading...
  </div>
);

// ✅ Auto scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// ✅ Optional 404 page
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 text-white">
    <h1 className="text-5xl font-bold mb-2">404</h1>
    <p className="text-lg mb-6">Oops! Page not found.</p>
    <a
      href="/"
      className="bg-white text-pink-500 px-5 py-2 rounded-lg font-semibold hover:bg-pink-100 transition"
    >
      Go Home
    </a>
  </div>
);


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>

          {/* ✅ Default route → Employee Login */}
          <Route path="/" element={<Navigate to="/employee-login" replace />} />

          {/* ✅ Employee Login */}
          <Route
            path="/employee-login"
            element={
              <ProtectedRoute isLoginPage>
                <EmployeeLogin />
              </ProtectedRoute>
            }
          />

          {/* ✅ Admin/Manager Login */}
          <Route
            path="/admin-login"
            element={
              <ProtectedRoute isLoginPage>
                <AdminLogin />
              </ProtectedRoute>
            }
          />

          {/* ✅ Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Manager Dashboard */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRole="Manager">
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
  <Route
            path="/manager_profile"
            element={
              <ProtectedRoute allowedRole="Manager">
                <Manager_Profile />
              </ProtectedRoute>
            }
          />
          {/* ✅ Employee Dashboard */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRole="Employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
