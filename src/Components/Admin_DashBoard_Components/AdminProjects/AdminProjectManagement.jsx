import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import AddPhaseModal from "/src/Components/Admin_DashBoard_Components/AdminCategory/AddPhaseModal.jsx";
import ProjectDetails from "/src/Components/Admin_DashBoard_Components/AdminProjects/AdminProjectsDetails.jsx";

/* ------------------------- Project Card ------------------------- */
const ProjectCard = ({ project, onClick }) => {
  // Status badge color logic
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-200 text-gray-700";

    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500 text-white shadow-md shadow-green-200";
      case "in progress":
        return "bg-blue-500 text-white shadow-md shadow-blue-200";
      default:
        return "bg-yellow-500 text-white shadow-md shadow-yellow-200";
    }
  };

  // Priority badge color logic
  const getPriorityColor = (priority) => {
    if (!priority) return "bg-gray-200 text-gray-800";

    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 text-white shadow-md shadow-red-200";
      case "medium":
        return "bg-orange-400 text-white shadow-md shadow-orange-200";
      case "low":
        return "bg-green-500 text-white shadow-md shadow-green-200";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer transition-all duration-300 overflow-hidden"
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* ✅ Status badge */}
      <span
        className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(
          project.status
        )}`}
      >
        {project.status || "Pending"}
      </span>

      {/* ✅ Priority badge */}
      <span
        className={`absolute top-16 right-4 px-3 py-1.5 text-xs font-semibold rounded-full ${getPriorityColor(
          project.priority
        )}`}
      >
        {(project.priority || "—").toUpperCase()}
      </span>

      {/* Project Icon/Initial */}
      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl flex items-center justify-center mb-4 shadow-md">
        <span className="text-white font-bold text-lg">
          {(project.project_name || project.name || "P").charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-gray-900 mt-2 pr-20 line-clamp-1">
        {project.project_name || project.name || "Untitled Project"}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[60px]">
        {project.description || "No description available for this project."}
      </p>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100"></div>

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(project);
        }}
        className="mt-2 w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        View Details
      </button>
    </div>
  );
};

/* ------------------------- Main ProjectForm ------------------------- */
const ProjectForm = ({ onAddProjectClick }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_API = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    fetchProjects();
  }, []);

  /* ✅ Fetch all projects */
  const fetchProjects = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API}/api/project_details/`);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Fetch tasks for a selected project (Option 1 fix) */
  const getTasksForProject = async (projectId) => {
    try {
      const res = await axios.get(`${BASE_API}/api/projects/${projectId}/tasks/`);
      return res.data; // Return list of tasks
    } catch (err) {
      console.error("Failed to fetch tasks for project:", err);
      return []; // Return empty array on error
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header Section */}
      <div className="relative mb-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Project Management
            </h1>
            <p className="text-gray-600 mt-3 text-base max-w-2xl">
              Manage all your projects in one centralized dashboard. Track progress, assign tasks, and monitor project health.
            </p>
          </div>

          <button
            onClick={onAddProjectClick}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Project
          </button>
        </div>

        {/* Decorative Gradient Line */}
        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Get started by creating your first project to organize tasks and track progress.
          </p>
          <button
            onClick={onAddProjectClick}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} onClick={setSelectedProject} />
          ))}
        </div>
      )}

      {/* ✅ Show ProjectDetails modal when a project is selected */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          getTasksForProject={getTasksForProject} // ✅ fixed reference
        />
      )}
    </div>
  );
};

export default ProjectForm;