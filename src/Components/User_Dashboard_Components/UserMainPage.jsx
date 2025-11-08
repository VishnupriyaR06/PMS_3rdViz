import { useEffect, useState } from "react";
import axios from "axios";
import { Users, FolderOpen, ArrowLeft } from "lucide-react";

import ProjectDetails from "/src/Components/User_Dashboard_Components/UserProjectDetails.jsx";

const UserMainPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [username, setUsername] = useState("");

  const BASE_API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchProjects(storedUsername);
    } else {
      console.warn("⚠️ Username not found in localStorage");
      setLoading(false);
    }
  }, []);

  const fetchProjects = async (username) => {
    try {
      const res = await axios.get(`${BASE_API}/api/get_project_details/`);
      const userProjects = res.data.filter((proj) =>
        Array.isArray(proj.members)
          ? proj.members.some(
            (member) =>
              member?.toLowerCase().trim() === username?.toLowerCase().trim()
          )
          : false
      );
      setProjects(userProjects);
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const ShimmerCard = () => (
    <div className="animate-pulse p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-gray-200 shadow-sm h-44" />
  );

  // 🔹 Detail View
  if (selectedProject) {
    return (
      <div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 mb-6 text-pink-600 font-semibold hover:text-pink-700 hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>
        <ProjectDetails project={selectedProject} />
      </div>
    );
  }

  return (
    <div className=" w-full p-6">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
            >
              Welcome, {username || "User"}
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Projects assigned to you — stay on top of your progress.
            </p>
          </div>
        </div>
        {/* Optional subtle divider */}
        <div className="mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center mt-28"
        >
          <FolderOpen className="w-14 h-14 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg italic">
            No projects assigned to you yet.
          </p>
        </div>
      ) : (
        <div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projects.map((proj, index) => (
            <div
              key={proj.id || index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              onClick={() => setSelectedProject(proj)}
              className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {proj.project_name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {proj.description || "No description available."}
              </p>

              {/* Members */}
              <div className="flex items-center text-sm text-gray-700 gap-2 mt-auto">
                <Users className="text-orange-500 w-4 h-4" />
                <span className="truncate">
                  {proj.members?.length > 0
                    ? proj.members.join(", ")
                    : "No members listed"}
                </span>
              </div>

              {/* Status Tag */}
              {proj.status && (
                <span
                  className={`absolute top-3 right-4 px-3 py-1 text-xs font-semibold rounded-full ${proj.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : proj.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {proj.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMainPage;
