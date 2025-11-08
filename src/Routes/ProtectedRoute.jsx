import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("role"); // stored after login
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/am-login" ||
    location.pathname === "/et-login" ||
    location.pathname === "/" ||
    location.pathname === "/am_login";

  // ✅ If user not logged in
  if (!role) {
    // Allow login pages
    if (isLoginPage) return children;
    // Redirect all others to main login
    return <Navigate to="/et-login" replace />;
  }

  // ✅ If logged in user visits a login page again, redirect to their dashboard
  if (isLoginPage) {
    if (role === "Admin") return <Navigate to="/admin" replace />;
    if (role === "Manager") return <Navigate to="/manager" replace />;
    if (role === "TeamLeader") return <Navigate to="/TeamLeader" replace />;
    if (role === "employee") return <Navigate to="/employee" replace />;
  }

  // ✅ Role-based protection
  if (allowedRole) {
    const normalizedAllowed = allowedRole.toLowerCase();
    const normalizedRole = role.toLowerCase();

    if (normalizedAllowed !== normalizedRole) {
      // Unauthorized access → redirect user to their own dashboard
      switch (normalizedRole) {
        case "admin":
          return <Navigate to="/admin" replace />;
        case "manager":
          return <Navigate to="/manager" replace />;
        case "teamleader":
          return <Navigate to="/TeamLeader" replace />;
        case "employee":
          return <Navigate to="/employee" replace />;
        default:
          return <Navigate to="/et-login" replace />;
      }
    }
  }

  // ✅ Authorized → render component
  return children;
};

export default ProtectedRoute;
