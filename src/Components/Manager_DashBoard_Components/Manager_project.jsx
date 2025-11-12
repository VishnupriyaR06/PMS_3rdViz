// import { useState, useEffect } from "react";
// import axios from "axios";
// import Select from "react-select";
// import AddProjectModal from "/src/Components/Admin_DashBoard_Components/AddProjectModal.jsx";
// import ProjectDetails from "/src/Components/Admin_DashBoard_Components/AdminProjectsDetails.jsx";

// /* ------------------------- Project Card ------------------------- */
// const ProjectCard = ({ project, onClick }) => (
//   <div
//     onClick={() => onClick(project)}
//     className="p-5 border rounded-2xl shadow-md bg-white hover:shadow-lg hover:-translate-y-1 hover:bg-pink-50 cursor-pointer transition-all duration-200"
//   >
//     <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.project_name}</h3>
//     <p className="text-sm text-gray-600 mb-1">
//       <strong>Team:</strong> {project.team}
//     </p>
//     <p className="text-sm text-gray-600">
//       <strong>Status:</strong> {project.status}
//     </p>
//   </div>
// );

// /* ------------------------- Main ProjectForm ------------------------- */
// const ProjectForm = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [teams, setTeams] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [modal, setModal] = useState({ show: false, message: "", type: "" }); // ✅ Added modal state

//   const [formData, setFormData] = useState({
//     project_name: "",
//     description: "",
//     team: "",
//     members: [],
//     status: "",
//     start_date: "",
//     end_date: "",
//   });

//   const BASE_API = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     axios.get(`${BASE_API}/api/team_list/`).then((res) => setTeams(res.data || []));
//     axios.get(`${BASE_API}/api/user_list/`).then((res) => setUsers(res.data || []));
//     fetchProjects();
//     fetchTasks();
//   }, []);

//   const fetchProjects = async () => {
//     if (loading) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_API}/api/get_project_details/`);
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Failed to fetch projects:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTasks = () =>
//     axios.get(`${BASE_API}/api/get_Task_details/`).then((res) => setTasks(res.data || []));

//   /* ✅ Updated handleSubmit with Modal */
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post(`${BASE_API}/api/create_project/`, formData)
//       .then(() => {
//         setModal({
//           show: true,
//           message: "✅ Project created successfully!",
//           type: "success",
//         });
//         setShowForm(false);
//         setFormData({
//           project_name: "",
//           description: "",
//           team: "",
//           members: [],
//           status: "",
//           start_date: "",
//           end_date: "",
//         });
//         fetchProjects();
//       })
//       .catch(() =>
//         setModal({
//           show: true,
//           message: "❌ Failed to submit project",
//           type: "error",
//         })
//       );
//   };

//   const getTasksForProject = (name) =>
//     tasks.filter(
//       (t) => t.project?.trim().toLowerCase() === name.trim().toLowerCase()
//     );

//   return (
//     <div className="p-8">
//       <div className="relative flex justify-between items-center mb-20">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//             Project Management
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm">
//             Manage All Projects in One Place.
//           </p>
//           <div className="absolute top-15 mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
//         </div>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
//         >
//           + Add Project
//         </button>
//       </div>

//       {projects.length === 0 ? (
//         <p className="text-gray-500 italic">No projects created yet.</p>
//       ) : (
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {projects.map((proj, i) => (
//             <ProjectCard key={i} project={proj} onClick={setSelectedProject} />
//           ))}
//         </div>
//       )}

//       {showForm && (
//         <AddProjectModal
//           onClose={() => setShowForm(false)}
//           onSubmit={handleSubmit}
//           formData={formData}
//           setFormData={setFormData}
//           teams={teams}
//           users={users}
//         />
//       )}

//       {selectedProject && (
//         <ProjectDetails
//           project={selectedProject}
//           onClose={() => setSelectedProject(null)}
//           getTasksForProject={getTasksForProject}
//         />
//       )}

//       {/* ✅ Modal Popup */}
//       {modal.show && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
//             <h2
//               className={`text-lg font-semibold mb-3 ${
//                 modal.type === "success" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {modal.message}
//             </h2>
//             <button
//               onClick={() => setModal({ ...modal, show: false })}
//               className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectForm;

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function AddProjectModal({ onClose, onProjectCreated }) {
  // ✅ Get logged-in user details (from localStorage)
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    category: "",
    start_date: "",
    End_date: "",
    manager: loggedUser?.role === "Manager" ? loggedUser.id : "", // auto set for manager
    status: "Pending",
  });

  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toLocalISO = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-CA"); // yyyy-mm-dd
  };

  const handleRangeChange = (selectedRange) => {
    setRange(selectedRange);

    setFormData((prev) => ({
      ...prev,
      start_date: selectedRange?.from ? toLocalISO(selectedRange.from) : "",
      End_date: selectedRange?.to ? toLocalISO(selectedRange.to) : "",
    }));
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Category_list/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));

    axios
      .get("http://127.0.0.1:8000/api/user_list/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.start_date || !formData.End_date) {
      setError("Please select Start & End dates");
      return;
    }

    if (!formData.manager) {
      setError("Please select a project manager");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/project_create/", formData);
      alert("✅ Project Created Successfully!");
      onProjectCreated();
      onClose();
    } catch (err) {
      alert("❌ Creation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-2xl shadow-2xl border border-pink-200 w-full max-w-5xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <button
            onClick={onClose}
            className="absolute top-9 right-4 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* LEFT FORM */}
          <form id="projectForm" className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Add New Project
            </h3>

            <div>
              <label className="font-medium">Title</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ✅ Manager Section */}
            <div>
              <label className="font-medium">Project Manager</label>

              {loggedUser.role === "Manager" ? (
                <>
                  <input
                    type="text"
                    value={loggedUser.username}
                    disabled
                    className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                  />

                  <input
                    type="hidden"
                    name="manager"
                    value={loggedUser.id}
                  />
                </>
              ) : (
                <select
                  value={formData.manager}
                  onChange={(e) =>
                    setFormData({ ...formData, manager: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select Manager</option>
                  {users
                    .filter((u) => u.role === "Manager")
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username || user.email}
                      </option>
                    ))}
                </select>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>

          {/* RIGHT SIDE - Calendar + Button */}
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-semibold mb-3">Pick Start & End Dates</h4>

            <div className="rounded-2xl border border-pink-200 p-4 shadow-md">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleRangeChange}
                numberOfMonths={1}
              />
            </div>

            <button
              form="projectForm"
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
