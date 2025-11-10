import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import AddPhaseModal from "/src/Components/Admin_DashBoard_Components/AddPhaseModal.jsx";
import ProjectDetails from "/src/Components/Admin_DashBoard_Components/AdminProjectsDetails.jsx"

/* ------------------------- Project Card ------------------------- */
const ProjectCard = ({ project, onClick }) => (
  <div
    onClick={() => onClick(project)}
    className="p-5 border rounded-2xl shadow-md bg-white hover:shadow-lg hover:-translate-y-1 hover:bg-pink-50 cursor-pointer transition-all duration-200"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.project_name}</h3>
    <p className="text-sm text-gray-600 mb-1">
      <strong>Name:</strong> {project.name}
    </p>
    <p className="text-sm text-gray-600">
      <strong>Status:</strong> {project.status}
    </p>
  </div>
);

/* ------------------------- Main ProjectForm ------------------------- */
const ProjectForm = ({ onAddProjectClick }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const BASE_API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    if (loading) return; // ✅ stop duplicate calls
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
  
  const fetchTasks = () =>
    axios.get(`${BASE_API}/api/get_Task_details/`)
      .then((res) => setTasks(res.data || []));

  const getTasksForProject = (name) =>
    tasks.filter(
      (t) => t.project?.trim().toLowerCase() === name.trim().toLowerCase()
    );

  return (
    <div className="p-8">
      <div className="relative flex justify-between items-center mb-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Project Management
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Manage All Projects in One Place.
          </p>
          {/* Subtle gradient divider for structure */}
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
          getTasksForProject={getTasksForProject}
        />)}
    </div>
  );
};

export default ProjectForm;