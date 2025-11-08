import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("role"); // e.g. "admin" or "employee"
  const location = useLocation();

  // If user is not logged in
  if (!role) {
    // But trying to access login -> allow it
    if (location.pathname === "/login" || location.pathname === "/") {
      return children;
    }
    // Otherwise, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If logged in and tries to access login page -> redirect to dashboard
  if (location.pathname === "/login" || location.pathname === "/") {
    return <Navigate to={`/${role}`} replace />;
  }

  // If role doesn't match allowed role -> redirect to their dashboard
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}`} replace />;
  }

  // Everything valid → render the protected component
  return children;
};

export default ProtectedRoute;
