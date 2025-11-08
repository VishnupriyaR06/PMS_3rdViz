import { useState } from "react";
import { FaProjectDiagram, FaUsers, FaUsersCog, FaTasks, FaUserCircle } from "react-icons/fa";
import Sidebar from "/src/Components/Reusable_Components/Sidebar.jsx";

import Project from "../../Components/Admin_DashBoard_Components/Project";
import Users from "../../Components/Admin_DashBoard_Components/Users";
import Teams from "../../Components/Admin_DashBoard_Components/Teams";
import Task from "../../Components/Admin_DashBoard_Components/Task";
import TeamLeadProfile from "../../Components/TeamLead_DashBoard_Components/TeamLeadProfile.jsx";

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
        return <TeamLeadProfile />; // ✅ Profile Render
      default:
        return <TeamLeadProfile />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar
        title="Team Lead Panel"
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        gradient="from-pink-500 to-orange-400"
      />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-hidden">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200 p-8 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
          {/* Render active section */}
          <div className="w-full h-full">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default TeamLeadDashboardWrapper;