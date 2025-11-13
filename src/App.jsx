import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import ManagerDashboardWrapper from "./Pages/Dashboard_Pages/ManagerDashBoardWrapper.jsx";

// ✅ Direct imports (no lazy loading)
import AdminLogin from "/src/Pages/Auth_Pages/AdminLogin.jsx";
import EmployeeLogin from "/src/Pages/Auth_Pages/EmployeeLogin.jsx";
import AdminDashboard from "/src/Pages/Dashboard_Pages/AdminDasboardWrapper.jsx";
import EmployeeDashboard from "/src/Pages/Dashboard_Pages/UserDashboardWrapper.jsx";

// ✅ Scroll to top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// ✅ 404 Page
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
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/employee-login" replace />} />

        {/* Employee Login */}
        <Route
          path="/employee-login"
          element={
            <ProtectedRoute isLoginPage>
              <EmployeeLogin />
            </ProtectedRoute>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={
            <ProtectedRoute isLoginPage>
              <AdminLogin />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manager Dashboard */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRole="Manager">
              <ManagerDashboardWrapper />
            </ProtectedRoute>
          }
        />

        {/* Employee Dashboard */}
        <Route
          path="/employee"
          element={
           <ProtectedRoute allowedRole="Employee">
  <EmployeeDashboard />
</ProtectedRoute>

          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;