import { useState, useMemo } from "react";
import {
  FaProjectDiagram,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Project from "/src/Components/Admin_DashBoard_Components/AdminProjectManagement";
import Users from "/src/Components/Admin_DashBoard_Components/AdminUserManagement";
import Category from "/src/Components/Admin_DashBoard_Components/AdminCategoryManagement";
import Navbar from "/src/Components/Reusable_Components/Navbar";

import Profile from "/src/Components/Manager_DashBoard_Components/Manager_Profile.jsx"

import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AddProjectModal";

const AdminDashboardWrapper = () => {
  const [activeSection, setActiveSection] = useState("Project");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const admin_role = localStorage.getItem("role")
  console.log("admin_role", admin_role)

  // ✅ Navigation items configuration
  const navItems = useMemo(
    () => [
      { name: "Project", icon: <FaProjectDiagram /> },
      { name: "Users", icon: <FaUsers /> },
      { name: "Category", icon: <FaLayerGroup /> },
    ],
    []
  );

  // ✅ Handlers to open modals (passed to Project)
  const handleOpenProjectModal = () => setShowAddProjectModal(true);
  const handleCloseProjectModal = () => setShowAddProjectModal(false);
  const handleProjectCreated = () => {
    setShowAddProjectModal(false);
  };

  // ✅ Section content mapping
  const sectionComponents = {
    Project: (
      <Project onAddProjectClick={handleOpenProjectModal} />
    ),
    Users: <Users />,
    Category: <Category />,
    Profile: <Profile />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900 transition-all duration-300">
      {/* ✅ Top Navbar */}
      <Navbar
        title="Admin Panel"
        navItems={navItems}
        role={admin_role}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* ✅ Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white/90 rounded-3xl shadow-xl border border-pink-200 h-full transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="min-h-[80vh]"
            >
              {sectionComponents[activeSection]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ✅ Global Modals controlled from parent */}
      {showAddProjectModal && (
        <AddProjectModal
          onClose={handleCloseProjectModal}
          onProjectCreated={handleProjectCreated}
        />
      )}

    </div>
  );
};

export default AdminDashboardWrapper;
