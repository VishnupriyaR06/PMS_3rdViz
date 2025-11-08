// src/components/Sidebar.jsx
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({
    title = "Dashboard",
    sections = [],
    activeSection,
    setActiveSection,
    gradient = "from-pink-500 to-orange-400",
}) => {
    // Logout handler
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <aside className="w-72 bg-white/95 backdrop-blur-xl border-r border-pink-100 shadow-2xl flex flex-col p-6">
            {/* Header */}
            <div className="flex flex-col items-center mb-10">
                <h1
                    className={`text-3xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}
                >
                    {title}
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {sections.map((section) => (
                    <button
                        key={section.name}
                        onClick={() => setActiveSection(section.name)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${activeSection === section.name
                                ? `bg-gradient-to-r ${gradient} text-white shadow-md scale-[1.02]`
                                : "text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-orange-100 hover:text-pink-700"
                            }`}
                    >
                        <span className="text-lg">{section.icon}</span>
                        {section.name}
                    </button>
                ))}
            </nav>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className={`mt-auto flex items-center justify-center gap-2 bg-gradient-to-r ${gradient} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg`}
            >
                <FaSignOutAlt />
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;
