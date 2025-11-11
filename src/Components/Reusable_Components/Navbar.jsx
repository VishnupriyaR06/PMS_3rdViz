
import { useState, useRef, useEffect } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";   // ✅ Added

const Navbar = ({
  title = "Dashboard",
  navItems = [],
  activeSection,
  setActiveSection,
  gradient = "from-pink-500 to-orange-400",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();   // ✅ Initialize navigate

  // console.log("Navbar received navItems:", navItems);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle Logout using navigate
  const handleLogout = () => {
    const role = localStorage.getItem("role");
    localStorage.clear();

    if (role === "Admin" || role === "Manager") {
      navigate("/admin-login");
    } else if (role === "employee" || role === "TeamLeader") {
      navigate("/employee-login");
    } else {
      navigate("/");
    }
  };

  // ✅ Handle Profile Click using component routes (navigate)
  const handleProfile = () => {
    setIsDropdownOpen(false);

    const role = localStorage.getItem("role");

    if (role === "Admin") {
      navigate("/admin_profile");
    } else if (role === "Manager") {
      navigate("/manager_profile");
    } else if (role === "TeamLeader") {
      navigate("/teamlead_profile");
    } else if (role === "employee") {
      navigate("/employee_profile");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-md flex items-center justify-between px-6 sm:px-8 py-3 sticky top-0 z-50">
        {/* ✅ Left: Title */}
        <h1
          className={`text-2xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}
        >
          {title}
        </h1>

        {/* ✅ Middle: Navigation Buttons */}
        <div className="flex gap-6">
          {navItems.map((navItem, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(navItem.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                activeSection === navItem.name
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-700 hover:text-pink-600"
              }`}
            >
              <span className="text-lg">{navItem.icon}</span>
              {navItem.name}
            </button>
          ))}
        </div>

        {/* ✅ Right: Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <button
                  onClick={handleProfile}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 hover:bg-pink-50 transition-all duration-150 text-sm font-medium"
                >
                  <FaUserCircle className="text-pink-500" /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 hover:bg-pink-50 transition-all duration-150 text-sm font-medium border-t border-gray-100"
                >
                  <FaSignOutAlt className="text-red-500" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ✅ Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-6 text-center"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out of your account?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold shadow-md hover:opacity-90 transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
