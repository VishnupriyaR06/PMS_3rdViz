
import { useState, useMemo } from "react";
import {
  FaProjectDiagram,
  FaUsers,
  FaLayerGroup,
  FaTasks,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import Project from "/src/Components/Admin_DashBoard_Components/AdminProjects/AdminProjectManagement.jsx";
import Users from "/src/Components/Admin_DashBoard_Components/AdminUserManagement";
import Category from "/src/Components/Admin_DashBoard_Components/AdminCategory/AdminCategoryManagement.jsx";
import Admin_Profile from "/src/Components/Admin_DashBoard_Components/Admin_Profile.jsx";

import Navbar from "/src/Components/Reusable_Components/Navbar";
import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AdminProjects/AddProjectModal.jsx";
import Task from "/src/Components/Admin_DashBoard_Components/AdminTask/Task.jsx";
// import { FaTasks } from "react-icons/fa";


const AdminDashboardWrapper = () => {
  const [activeSection, setActiveSection] = useState("Project");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // ✅ Removed Profile from navItems
  const navItems = useMemo(
    () => [
      { name: "Dashboard", icon: <FaTasks /> },
      { name: "Project", icon: <FaProjectDiagram /> },
      { name: "Users", icon: <FaUsers /> },
      { name: "Category", icon: <FaLayerGroup /> },
      { name: "Task", icon: <FaTasks /> },
    
    ],
  );

  const handleOpenProjectModal = () => setShowAddProjectModal(true);
  const handleCloseProjectModal = () => setShowAddProjectModal(false);
  const handleProjectCreated = () => setShowAddProjectModal(false);

  // ✅ Map sections including Profile (but not in navbar)
  const sectionComponents = {
    Project: <Project onAddProjectClick={handleOpenProjectModal} />,
    Users: <Users />,
    Category: <Category />,
    Task: <Task />,
    Profile: <Admin_Profile />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
      
      <Navbar
        title="Admin Panel"
        navItems={navItems}
        role={admin_role}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white/90 rounded-3xl shadow-xl border border-pink-200 h-full">

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

      {/* Global Add Project Modal */}
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
