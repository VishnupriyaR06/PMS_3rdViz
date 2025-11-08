import { useState } from "react";
import {
  FaProjectDiagram,
  FaUsers,
  FaUsersCog,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";
import Navbar from "/src/Components/Reusable_Components/Navbar.jsx";

import Project from "../../Components/Admin_DashBoard_Components/Project";
import Users from "../../Components/Admin_DashBoard_Components/Users";
import Teams from "../../Components/Admin_DashBoard_Components/Teams";
import Task from "../../Components/Admin_DashBoard_Components/Task";
import TeamLeadProfile from "/src/Components/TeamLead_DashBoard_Components/TeamLeadProfile.jsx";

const TeamLeadDashboardWrapper = () => {
  const [activeSection, setActiveSection] = useState("Project");

  const sections = [
    { name: "Project", icon: <FaProjectDiagram /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Teams", icon: <FaUsersCog /> },
    { name: "Task", icon: <FaTasks /> },
    { name: "Profile", icon: <FaUserCircle /> }, // ✅ Added Profile section
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Project":
        return <Project />;
      case "Users":
        return <Users />;
      case "Teams":
        return <Teams />;
      case "Task":
        return <Task />;
      case "Profile":
        return <TeamLeadProfile />;
      default:
        return <Project />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
      {/* ✅ Top Navbar */}
      <Navbar
        title="Team Lead Panel"
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        gradient="from-pink-500 to-orange-400"
      />

      {/* ✅ Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200 p-8 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default TeamLeadDashboardWrapper;
