// import { useState, useMemo } from "react";
// import {
//   FaProjectDiagram,
//   FaUsers,
//   FaLayerGroup,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// import Project from "/src/Components/Admin_DashBoard_Components/AdminProjectManagement";
// import Users from "/src/Components/Admin_DashBoard_Components/AdminUserManagement";
// import Category from "/src/Components/Admin_DashBoard_Components/AdminCategoryManagement";
// import Navbar from "/src/Components/Reusable_Components/Navbar";

// import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AddProjectModal";

// const AdminDashboardWrapper = () => {
//   const [activeSection, setActiveSection] = useState("Project");
//   const [showAddProjectModal, setShowAddProjectModal] = useState(false);

//   // ✅ Navigation items configuration
//   const navItems = useMemo(
//     () => [
//       { name: "Project", icon: <FaProjectDiagram /> },
//       { name: "Users", icon: <FaUsers /> },
//       { name: "Category", icon: <FaLayerGroup /> },
//     ],
//     []
//   );

//   // ✅ Handlers to open modals (passed to Project)
//   const handleOpenProjectModal = () => setShowAddProjectModal(true);
//   const handleCloseProjectModal = () => setShowAddProjectModal(false);
//   const handleProjectCreated = () => {
//     setShowAddProjectModal(false);
//   };

//   // ✅ Section content mapping
//   const sectionComponents = {
//     Project: (
//       <Project onAddProjectClick={handleOpenProjectModal} />
//     ),
//     Users: <Users />,
//     Category: <Category />,
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900 transition-all duration-300">
//       {/* ✅ Top Navbar */}
//       <Navbar
//         title="Admin Panel"
//         navItems={navItems}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       {/* ✅ Content Area */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="bg-white/90 rounded-3xl shadow-xl border border-pink-200 h-full transition-all duration-300">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeSection}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.35, ease: "easeInOut" }}
//               className="min-h-[80vh]"
//             >
//               {sectionComponents[activeSection]}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>

//        {/* ✅ Global Modals controlled from parent */}
//       {showAddProjectModal && (
//         <AddProjectModal
//           onClose={handleCloseProjectModal}
//           onProjectCreated={handleProjectCreated}
//         />
//       )}

//     </div>
//   );
// };

// export default AdminDashboardWrapper;
// import { useState, useMemo } from "react";
// import {
//   FaProjectDiagram,
//   FaUsers,
//   FaLayerGroup,
//   FaUserCircle, // ✅ Added
// } from "react-icons/fa";

// import { motion, AnimatePresence } from "framer-motion";

// import Project from "/src/Components/Admin_DashBoard_Components/AdminProjectManagement";
// import Users from "/src/Components/Admin_DashBoard_Components/AdminUserManagement";
// import Category from "/src/Components/Admin_DashBoard_Components/AdminCategoryManagement";
// import Admin_Profile from "/src/Components/Admin_DashBoard_Components/Admin_Profile.jsx"; // ✅ Added
// import Navbar from "/src/Components/Reusable_Components/Navbar";
// import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AddProjectModal";

// const AdminDashboardWrapper = () => {
//   const [activeSection, setActiveSection] = useState("Project");
//   const [showAddProjectModal, setShowAddProjectModal] = useState(false);

//   // ✅ Navigation items
//   const navItems = useMemo(
//     () => [
//       { name: "Project", icon: <FaProjectDiagram /> },
//       { name: "Users", icon: <FaUsers /> },
//       { name: "Category", icon: <FaLayerGroup /> },
//       { name: "Profile", icon: <FaUserCircle /> }, // ✅ Newly added tab
//     ],
//     []
//   );

//   // ✅ Handlers
//   const handleOpenProjectModal = () => setShowAddProjectModal(true);
//   const handleCloseProjectModal = () => setShowAddProjectModal(false);
//   const handleProjectCreated = () => setShowAddProjectModal(false);

//   // ✅ Section content mapping
//   const sectionComponents = {
//     Project: <Project onAddProjectClick={handleOpenProjectModal} />,
//     Users: <Users />,
//     Category: <Category />,
//     Profile: <Admin_Profile />, // ✅ Added
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
      
//       <Navbar
//         title="Admin Panel"
//         navItems={navItems}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="bg-white/90 rounded-3xl shadow-xl border border-pink-200 h-full">
          
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeSection}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.35, ease: "easeInOut" }}
//               className="min-h-[80vh]"
//             >
//               {sectionComponents[activeSection]}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>

//       {/* ✅ Global Modal */}
//       {showAddProjectModal && (
//         <AddProjectModal
//           onClose={handleCloseProjectModal}
//           onProjectCreated={handleProjectCreated}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboardWrapper;
import { useState, useMemo } from "react";
import {
  FaProjectDiagram,
  FaUsers,
  FaLayerGroup,
  FaTasks,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import Project from "/src/Components/Admin_DashBoard_Components/AdminProjectManagement";
import Users from "/src/Components/Admin_DashBoard_Components/AdminUserManagement";
import Category from "/src/Components/Admin_DashBoard_Components/AdminCategoryManagement";
import Admin_Profile from "/src/Components/Admin_DashBoard_Components/Admin_Profile.jsx";

import Navbar from "/src/Components/Reusable_Components/Navbar";
import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AddProjectModal";
import Task from "/src/Components/Admin_DashBoard_Components/Task";
// import { FaTasks } from "react-icons/fa";


const AdminDashboardWrapper = () => {
  const [activeSection, setActiveSection] = useState("Project");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // ✅ Removed Profile from navItems
  const navItems = useMemo(
    () => [
      { name: "Project", icon: <FaProjectDiagram /> },
      { name: "Users", icon: <FaUsers /> },
      { name: "Category", icon: <FaLayerGroup /> },
      { name: "Task", icon: <FaTasks /> },
    ],
    []
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
