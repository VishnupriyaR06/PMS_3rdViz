import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import AddPhaseModal from "/src/Components/Admin_DashBoard_Components/AddPhaseModal.jsx";
import ProjectDetails from "/src/Components/Admin_DashBoard_Components/AdminProjectsDetails.jsx";



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
      className="relative p-6 border rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300"
    >
      {/* ✅ Status badge (right side top) */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
          project.status
        )}`}
      >
        {project.status || "Pending"}
      </span>

      {/* ✅ Priority badge (below status badge) */}
      <span
        className={`absolute top-12 right-3 px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
          project.priority
        )}`}
      >
        {(project.priority || "—").toUpperCase()}
      </span>

      {/* Name */}
      <p className="text-lg font-bold text-gray-900 mt-2 ">
        {project.project_name || project.name || "—"}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-900 leading-relaxed line-clamp-3">
        {project.description || "No description available."}
      </p>

      {/* Gradient Button */}
      <button
        onClick={() => onClick(project)}
        className="mt-6 w-full bg-linear-to-r from-pink-500 to-orange-400 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
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
  const [tasks, setTasks] = useState([]);

  const BASE_API = import.meta.env.VITE_API_URL;


//   const getTasksForProject = async (projectId) => {
//   try {
//     const res = await axios.get(`${BASE_API}/api/project_details/`);
//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch tasks:", err);
//     return [];
//   }
// };

  useEffect(() => {
    fetchProjects();
  }, []);

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


  return (
    <div className="p-8">
      <div className="relative flex justify-between items-center mb-20">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Project Management
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Manage all projects in one place.</p>

          <div className="absolute top-15 mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
        </div>

        <button
          onClick={onAddProjectClick}
          className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 italic text-center">No projects created yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} onClick={setSelectedProject} />
          ))}
        </div>
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          // getTasksForProject={getTasksForProject}
        />
      )}
    </div>
  );
};

export default ProjectForm;