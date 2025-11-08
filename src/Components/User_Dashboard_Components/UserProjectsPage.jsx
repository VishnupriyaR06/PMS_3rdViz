import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaChartLine, FaArrowLeft } from "react-icons/fa";
import ProjectDetails from "/src/Components/User_Dashboard_Components/UserProjectDetails.jsx";

const UserProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_API}/api/get_project_details/`);
      setProjects(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching project details:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Shimmer card for loading state
  const ShimmerCard = () => (
    <div className="animate-pulse bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm h-48" />
  );

  // 🔹 Detail view
  if (selectedProject) {
    return (
      <div
        className="p-6"
      >
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 mb-6 text-pink-600 font-semibold hover:scale-105 hover:text-pink-700 transition"
        >
          <FaArrowLeft /> Back to Projects
        </button>
        <ProjectDetails project={selectedProject} />
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      {/* 🔹 Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Projects Overview
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Click on any project card below to explore details and progress.
            </p>
          </div>
        </div>

        {/* Subtle gradient divider for structure */}
        <div className="mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
      </div>


      {/* 🔹 Loading State */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500 italic mt-20">
          No projects found.
        </div>
      ) : (
        <div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <div
              key={project.id || index}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative p-6 bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-pink-100/30 via-orange-100/20 to-rose-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                {project.project_name || "Untitled Project"}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {project.description || "No description available."}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-pink-500" />
                  <span>{project.team || "Not assigned"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-orange-500" />
                  <span className="capitalize">{project.status || "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProjectsPage;
