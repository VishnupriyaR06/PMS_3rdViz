import { useState, useMemo } from "react";
import {
  FaProjectDiagram,
  FaUser,
  FaLayerGroup,
} from "react-icons/fa";
import Navbar from "/src/Components/Reusable_Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

import Project from "/src/Components/Admin_DashBoard_Components/AdminProjects/AdminProjectManagement.jsx";
import UserManagement from "/src/Components/Admin_DashBoard_Components/AdminUserManagement";
import Category from "/src/Components/Admin_DashBoard_Components/AdminCategory/AdminCategoryManagement.jsx";

import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AdminProjects/AddProjectModal.jsx";


const ManagerDashboardWrapper = () => {
  const [activeSection, setActiveSection] = useState("Project");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // ✅ This handler will open the Add Project modal
  // const handleOpenProjectModal = () => {
  //   console.log("Open Add Project Modal");
  //   // Add your modal state trigger here later
  // };

    // ✅ Handlers to open modals (passed to Project)
  const handleOpenProjectModal = () => setShowAddProjectModal(true);
  const handleCloseProjectModal = () => setShowAddProjectModal(false);
  const handleProjectCreated = () => {
    setShowAddProjectModal(false);
  };

const navItems = [
  { name: "Project", icon: <FaProjectDiagram /> },
  { name: "Users", icon: <FaUser /> },
  {name: "Category",icon:<FaLayerGroup />}
];

  
//    const sectionComponents = {
//   Project: <Project onAddProjectClick={handleOpenProjectModal} />,
//   Users: <UserManagement />,
//   Category:<Category/>
// };

  // ✅ Map section names to components
  const sectionComponents = {
    Project: <Manager_Project onAddProjectClick={handleOpenProjectModal} />,
    Task: <Task />,
    Profile: <ManagerProfile />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
      
      {/* ✅ Top Navbar */}
      <Navbar
        title="Manager Panel"
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        gradient="from-pink-500 to-orange-400"
      />

      {/* ✅ Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
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
              {/* ✅ Render selected section */}
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

export default ManagerDashboardWrapper;
