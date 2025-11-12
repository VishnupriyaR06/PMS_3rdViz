

// import { useState, useMemo } from "react";
// import {
//   FaProjectDiagram,
//   FaUsersCog,
//   FaTasks,
// } from "react-icons/fa";
// import Navbar from "/src/Components/Reusable_Components/Navbar";
// import { motion, AnimatePresence } from "framer-motion";

// import Manager_Project from "/src/Components/Manager_DashBoard_Components/Manager_project.jsx";
// // import ManagerTeam from "/src/Components/Manager_DashBoard_Components/Manager_Team";
// import Task from "/src/Components/Admin_DashBoard_Components/Task";
// import ManagerProfile from "/src/Components/Manager_DashBoard_Components/Manager_Profile.jsx";

// const ManagerDashboardWrapper = () => {
//   const [activeSection, setActiveSection] = useState("ManagerTeam");

//   // const navItems = useMemo(
//   //   () => [
//   //     { name: "Project", icon: <FaProjectDiagram /> },
//   //     { name: "ManagerTeam", icon: <FaUsersCog /> },
//   //     { name: "Task", icon: <FaTasks /> },
//   //     // { name: "Profile", icon: <FaUserCircle /> },
//   //   ],
//   //   []
//   // );

//   console.log(FaProjectDiagram);
//   console.log(FaUsersCog);
//   console.log(FaTasks);


//   const navItems = [
//   { name: "Project", icon: <FaProjectDiagram /> },
//   // { name: "ManagerTeam", icon: <FaUsersCog /> },
//   { name: "Task", icon: <FaTasks /> },
// ];


//   // const renderContent = () => {
//   //   switch (activeSection) {
//   //     case "Project":
//   //       return <Project />;
//   //     case "ManagerTeam":
//   //       return <ManagerTeam />;
//   //     case "Task":
//   //       return <Task />;
//   //     case "Profile":
//   //       return <ManagerProfile />;
//   //     default:
//   //       return <Project />;
//   //   }
//   // };

//     const sectionComponents = {
//       Project: (
//         <Manager_Project onAddProjectClick={handleOpenProjectModal} />
//       ),
//       // ManagerTeam: <ManagerTeam />,
//       Task: <Task />,
//       Profile: <ManagerProfile />,
//     };

//     console.log("Manager navItems (before render):", navItems);


//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
//       {/* ✅ Top Navbar */}
//       <Navbar
//         title="Manager Panel"
//         navItems={navItems}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//         gradient="from-pink-500 to-orange-400"
//       />

//       {/* ✅ Main Content */}
//       <main className="flex-1 overflow-y-auto p-6">
//         <div className="bg-white/90 rounded-3xl shadow-2l border border-pink-200 h-full transition-all duration-300">
//         <AnimatePresence mode="wait">
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
//           {/* {renderContent()} */}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ManagerDashboardWrapper;
import { useState } from "react";
import { FaProjectDiagram, FaTasks } from "react-icons/fa";

import Navbar from "/src/Components/Reusable_Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

import Manager_Project from "/src/Components/Manager_DashBoard_Components/Manager_project.jsx";
import Task from "/src/Components/Admin_DashBoard_Components/Task";
import ManagerProfile from "/src/Components/Manager_DashBoard_Components/Manager_Profile.jsx";

const ManagerDashboardWrapper = () => {

  // ✅ Default to Project instead of ManagerTeam
  const [activeSection, setActiveSection] = useState("Project");

  // ✅ This handler will open the Add Project modal
  const handleOpenProjectModal = () => {
    console.log("Open Add Project Modal");
    // Add your modal state trigger here later
  };

  // ✅ Navigation items visible in Manager Dashboard
  const navItems = [
    { name: "Project", icon: <FaProjectDiagram /> },
    { name: "Task", icon: <FaTasks /> },
  ];

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
    </div>
  );
};

export default ManagerDashboardWrapper;
