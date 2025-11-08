import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AddProjectModal.jsx";
import ProjectDetails from "/src/Components/Admin_DashBoard_Components/AdminProjectsDetails.jsx";

/* ------------------------- Project Card ------------------------- */
const ProjectCard = ({ project, onClick }) => (
  <div
    onClick={() => onClick(project)}
    className="p-5 border rounded-2xl shadow-md bg-white hover:shadow-lg hover:-translate-y-1 hover:bg-pink-50 cursor-pointer transition-all duration-200"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.project_name}</h3>
    <p className="text-sm text-gray-600 mb-1">
      <strong>Team:</strong> {project.team}
    </p>
    <p className="text-sm text-gray-600">
      <strong>Status:</strong> {project.status}
    </p>
  </div>
);

/* ------------------------- Main ProjectForm ------------------------- */
const ProjectForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState({ show: false, message: "", type: "" }); // ✅ Added modal state

  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    team: "",
    members: [],
    status: "",
    start_date: "",
    end_date: "",
  });

  const BASE_API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_API}/api/team_list/`).then((res) => setTeams(res.data || []));
    axios.get(`${BASE_API}/api/user_list/`).then((res) => setUsers(res.data || []));
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API}/api/get_project_details/`);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = () =>
    axios.get(`${BASE_API}/api/get_Task_details/`).then((res) => setTasks(res.data || []));

  /* ✅ Updated handleSubmit with Modal */
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_API}/api/create_project/`, formData)
      .then(() => {
        setModal({
          show: true,
          message: "✅ Project created successfully!",
          type: "success",
        });
        setShowForm(false);
        setFormData({
          project_name: "",
          description: "",
          team: "",
          members: [],
          status: "",
          start_date: "",
          end_date: "",
        });
        fetchProjects();
      })
      .catch(() =>
        setModal({
          show: true,
          message: "❌ Failed to submit project",
          type: "error",
        })
      );
  };

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
          <div className="absolute top-15 mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No projects created yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} onClick={setSelectedProject} />
          ))}
        </div>
      )}

      {showForm && (
        <AddProjectModal
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          teams={teams}
          users={users}
        />
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          getTasksForProject={getTasksForProject}
        />
      )}

      {/* ✅ Modal Popup */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
            <h2
              className={`text-lg font-semibold mb-3 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.message}
            </h2>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;