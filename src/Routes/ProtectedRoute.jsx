import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole, isLoginPage = false }) => {
  const role = localStorage.getItem("role");
  const location = useLocation();

  // ✅ If it's a login page
  if (isLoginPage) {
    // If user is logged in → redirect to respective dashboard
    if (role) {
      const redirectMap = {
        Admin: "/admin",
        Manager: "/manager",
        Employee: "/employee",
      };
      return <Navigate to={redirectMap[role] || "/employee"} replace />;
    }
    return children; // Not logged in → show login page
  }

  // ✅ Not logged in → redirect to default login
  if (!role) {
    return <Navigate to="/employee-login" state={{ from: location }} replace />;
  }

  // ✅ Role-based protection
  if (allowedRole && role.toLowerCase() !== allowedRole.toLowerCase()) {
    const redirectMap = {
      Admin: "/admin",
      Manager: "/manager",
      Employee: "/employee",
    };
    return <Navigate to={redirectMap[role] || "/employee"} replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
