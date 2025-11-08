import { useState } from 'react';
import { FaProjectDiagram, FaUsersCog, FaTasks, FaUserCircle } from 'react-icons/fa';
import Sidebar from '/src/Components/Reusable_Components/Sidebar.jsx';

import Project from '../../Components/Admin_DashBoard_Components/Project';
import ManagerTeam from '../../Components/Manager_DashBoard_Components/Manager_Team';
import Task from '../../Components/Admin_DashBoard_Components/Task';
import ManagerProfile from '../../Components/Manager_DashBoard_Components/Manager_Profile.jsx'; // ✅ fixed import

const ManagerDashboardWrapper = () => {
  // ✅ Manager Profile is default section
  const [activeSection, setActiveSection] = useState('Manager_Profile');

  const sections = [
    { name: 'Manager_Profile', icon: <FaUserCircle /> },
    { name: 'Project', icon: <FaProjectDiagram /> },
    { name: 'ManagerTeam', icon: <FaUsersCog /> },
    { name: 'Task', icon: <FaTasks /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'Manager_Profile':
        return <ManagerProfile />;
      case 'Project':
        return <Project />;
      case 'ManagerTeam':
        return <ManagerTeam />;
      case 'Task':
        return <Task />;
      default:
        return <ManagerProfile />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-gray-900">
      <Sidebar
        title="Manager Panel"
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        gradient="from-pink-500 to-orange-400"
      />

      <main className="flex-1 h-screen overflow-hidden">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200 p-8 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
          <div className="w-full h-full">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboardWrapper;