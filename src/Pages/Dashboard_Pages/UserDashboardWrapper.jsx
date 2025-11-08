
// import { useState } from "react";
// import Dashboard from "../../Components/User_Dashboard_Components/UserMainPage";
// import Projects from "../../Components/User_Dashboard_Components/UserProjectsPage";
// import Task from "/src/Components/User_Dashboard_Components/UserTaskPage.jsx";
// import {
//   FaTachometerAlt,
//   FaProjectDiagram,
//   FaFileAlt,
// } from "react-icons/fa";

// import Navbar from "/src/Components/Reusable_Components/Navbar.jsx";

// const User = () => {
//   const [activeSection, setActiveSection] = useState("Dashboard");

//   // Sidebar sections with icons
//   const sections = [
//     { name: "Dashboard", icon: <FaTachometerAlt /> },
//     { name: "Projects", icon: <FaProjectDiagram /> },
//     { name: "Task", icon: <FaFileAlt /> },
//   ];

//   // Dynamic content render
//   const renderContent = () => {
//     switch (activeSection) {
//       case "Dashboard":
//         return <Dashboard />;
//       case "Projects":
//         return <Projects />;
//       case "Task":
//         return <Task />;
//       default:
//         return <Dashboard />;
//     }
//   };


//   return (
//     <div className="flex h-screen bg-linear-to-br from-pink-50 via-orange-50 to-rose-100 text-gray-900">

//       <Navbar
//         title="User Panel"
//         sections={sections}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//         gradient="from-pink-500 to-orange-400"
//       />

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-10">
//         <div className="bg-white/90 backdrop-blur-lg border border-pink-100 shadow-2xl rounded-3xl p-8 h-full">
//           {/* Dynamic Section Content */}
//           <div className="w-full h-full">{renderContent()}</div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default User;
import { useState } from "react";
import Dashboard from "../../Components/User_Dashboard_Components/UserMainPage";
import Projects from "../../Components/User_Dashboard_Components/UserProjectsPage";
import Task from "/src/Components/User_Dashboard_Components/UserTaskPage.jsx";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaFileAlt,
  FaUserCircle,
} from "react-icons/fa";
import Navbar from "/src/Components/Reusable_Components/Navbar.jsx";
import EmployeeProfile from "../../Components/User_Dashboard_Components/EmployeeProfile";

const User = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sections = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Projects", icon: <FaProjectDiagram /> },
    { name: "Task", icon: <FaFileAlt /> },
     { name: "Profile", icon: <FaUserCircle /> },

  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Projects":
        return <Projects />;
      case "Task":
        return <Task />;
      case "Profile":
        return <EmployeeProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-rose-100 text-gray-900">
      {/* ✅ Navbar stays at top */}
      <Navbar
        title="User Panel"
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        gradient="from-pink-500 to-orange-400"
      />

      {/* ✅ Main Content fills remaining height */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="bg-white/90 backdrop-blur-lg border border-pink-100 shadow-2xl rounded-3xl p-8 h-full">
          <div className="w-full h-full">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default User;
