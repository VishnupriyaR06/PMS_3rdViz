import { useState } from "react";
import { FaProjectDiagram, FaUsers, FaUsersCog } from "react-icons/fa";

import Project from "../../Components/Admin_DashBoard_Components/Project";
import Users from "../../Components/Admin_DashBoard_Components/Users";
import Teams from "../../Components/Admin_DashBoard_Components/Teams";
import Category from "../../Components/Admin_DashBoard_Components/Category"; 

const AdminDasboardWrapper = () => {
  const [activeSection, setActiveSection] = useState("Project");

  const navItems = [
    { name: "Project", icon: <FaProjectDiagram /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Teams", icon: <FaUsersCog /> },
    { name: "Category", icon: <FaUsersCog /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Project":
        return <Project />;
      case "Users":
        return <Users />;
      case "Teams":
        return <Teams />;
    case "Category":
        return <Category />;
      default:
        return <Category />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">

      {/* TOP NAVBAR */}
      <nav className="w-full bg-white/80 backdrop-blur-md shadow-md border-b border-pink-200 px-8 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
          Admin Panel
        </h1>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                activeSection === item.name
                  ? "text-purple-600 font-semibold border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-pink-200 p-8 h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDasboardWrapper;