
// import { FaSignOutAlt } from "react-icons/fa";

// const Sidebar = ({
//     title = "Dashboard",
//     sections = [],
//     activeSection,
//     setActiveSection,
//     gradient = "from-pink-500 to-orange-400",
// }) => {
//     // Logout handler
//     const handleLogout = () => {
//         localStorage.clear();
//         window.location.href = "/login";
//     };

//     return (
//         <aside className="w-72 bg-white/95 backdrop-blur-xl border-r border-pink-100 shadow-2xl flex flex-col p-6">
//             {/* Header */}
//             <div className="flex flex-col items-center mb-10">
//                 <h1
//                     className={`text-3xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}
//                 >
//                     {title}
//                 </h1>
//             </div>

//             {/* Navigation */}
//             <nav className="flex flex-col gap-2">
//                 {sections.map((section) => (
//                     <button
//                         key={section.name}
//                         onClick={() => setActiveSection(section.name)}
//                         className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${activeSection === section.name
//                                 ? `bg-gradient-to-r ${gradient} text-white shadow-md scale-[1.02]`
//                                 : "text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-orange-100 hover:text-pink-700"
//                             }`}
//                     >
//                         <span className="text-lg">{section.icon}</span>
//                         {section.name}
//                     </button>
//                 ))}
//             </nav>

//             {/* Logout */}
//             <button
//                 onClick={handleLogout}
//                 className={`mt-auto flex items-center justify-center gap-2 bg-gradient-to-r ${gradient} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg`}
//             >
//                 <FaSignOutAlt />
//                 Logout
//             </button>
//         </aside>
//     );
// };

// export default Sidebar;
// import { FaSignOutAlt } from "react-icons/fa";

// const Navbar = ({
//   title = "Dashboard",
//   sections = [],
//   activeSection,
//   setActiveSection,
//   gradient = "from-pink-500 to-orange-400",
// }) => {
//   // Logout handler
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="w-full bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-md flex items-center justify-between px-8 py-4">
//       {/* Left: Title */}
//       <h1
//         className={`text-2xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}
//       >
//         {title}
//       </h1>

//       {/* Middle: Navigation buttons */}
//       <div className="flex gap-6">
//         {sections.map((section) => (
//           <button
//             key={section.name}
//             onClick={() => setActiveSection(section.name)}
//             className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
//               activeSection === section.name
//                 ? `text-purple-700 border-b-2 border-purple-700`
//                 : "text-gray-700 hover:text-purple-600"
//             }`}
//           >
//             <span className="text-lg">{section.icon}</span>
//             {section.name}
//           </button>
//         ))}
//       </div>

//       {/* Right: Logout Button */}
//       <button
//         onClick={handleLogout}
//         className={`flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg`}
//       >
//         <FaSignOutAlt />
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;










import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({
  title = "Dashboard",
  sections = [],
  activeSection,
  setActiveSection,
  gradient = "from-pink-500 to-orange-400",
}) => {
  // ✅ Role-based Logout Handler
  const handleLogout = () => {
    const role = localStorage.getItem("role");

    // Clear all stored data
    localStorage.clear();

    // ✅ Redirect based on role
    if (role === "Admin" || role === "Manager") {
      window.location.href = "/am-login";
    } else if (role === "employee" || role === "TeamLeader") {
      window.location.href = "/et-login";
    } else {
      // Fallback (unknown or no role)
      window.location.href = "/";
    }
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-md flex items-center justify-between px-8 py-4">
      {/* Left: Title */}
      <h1
        className={`text-2xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}
      >
        {title}
      </h1>

      {/* Middle: Navigation buttons */}
      <div className="flex gap-6">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(section.name)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
              activeSection === section.name
                ? `text-purple-700 border-b-2 border-purple-700`
                : "text-gray-700 hover:text-purple-600"
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className={`flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg`}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
