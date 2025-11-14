import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPhasePage from "/src/Components/Admin_DashBoard_Components/AddPhasepage.jsx";

/* ------------------------- Task Card ------------------------- */
const ProjectTaskCard = ({ task }) => (
  <div className="border rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow hover:shadow-lg transition-all duration-300">
    <h5 className="text-lg font-semibold text-pink-600">{task.task_name}</h5>
    <p className="text-sm text-gray-700 mt-1">{task.Task_inform}</p>
    <p className="text-sm mt-3">
      <strong className="text-gray-800">Priority:</strong> {task.priority}
    </p>
    <p className="text-sm mt-1">
      <strong className="text-gray-800">Status:</strong> {task.status}
    </p>
    <p className="text-xs text-gray-500 mt-2">
      {task.start_date} → {task.deadline}
    </p>
  </div>
);

/* ------------------------- Alert Modal ------------------------- */
const AlertModal = ({ show, type, message, onClose }) => {
  if (!show) return null;

  const colors =
    type === "success"
      ? "bg-green-100 text-green-700 border-green-400"
      : type === "error"
      ? "bg-red-100 text-red-700 border-red-400"
      : "bg-yellow-100 text-yellow-700 border-yellow-400";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-[100]">
      <div
        className={`p-6 rounded-xl shadow-xl border ${colors} w-[90%] max-w-sm text-center`}
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

/* ------------------------- Project Details ------------------------- */
const ProjectDetails = ({ project, onClose, getTasksForProject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddPhase, setShowAddPhase] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  // ⭐ Selected Project Data from API
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
    confirmDelete: false,
  });

  const [form, setForm] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    start_date: project.start_date,
    End_date: project.End_date,
    priority: project.priority || "",
  });

  /* ================================
      FETCH SELECTED PROJECT DETAILS
  =================================== */
  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/project_details/");
        const allProjects = res.data;

        const selected = allProjects.find(
          (p) => p.name.trim().toLowerCase() === project.name.trim().toLowerCase()
        );

        setSelectedProjectDetails(selected || null);
      } catch (e) {
        console.error("Error loading project details", e);
      }
    };

    loadDetails();
  }, [project]);

  /* Fetch Tasks */
  useEffect(() => {
    const fetchTasks = async () => {
      setTasksLoading(true);
      try {
        const identifier = project.id ?? project.name;
        const result = await getTasksForProject(identifier);
        setTasks(result ?? []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setTasksLoading(false);
      }
    };
    if (project) fetchTasks();
  }, [project, getTasksForProject]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const showAlert = (type, message, confirmDelete = false) =>
    setAlert({ show: true, type, message, confirmDelete });

  /* Update Project */
  const handleUpdate = async () => {
    try {
      const encodedName = encodeURIComponent(project.name);
      const res = await axios.put(
        `http://127.0.0.1:8000/api/project_update/${encodedName}/`,
        form
      );
      showAlert("success", "✅ Project updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update Error:", err);
      showAlert("error", "❌ Failed to update project.");
    }
  };

  /* Delete */
  const handleDelete = () => {
    showAlert("warning", `Delete project "${project.name}"?`, true);
  };

  const confirmDelete = async () => {
    try {
      const encodedName = encodeURIComponent(project.name);
      await axios.delete(
        `http://127.0.0.1:8000/api/project_delete/${encodedName}/`
      );
      showAlert("success", "🗑️ Project deleted successfully!");
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.error("Delete Error:", err);
      showAlert("error", "❌ Failed to delete project.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full h-full overflow-y-auto relative p-10 rounded-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-600 hover:text-black text-3xl font-bold"
        >
          ✕
        </button>

        <div className="max-w-5xl mx-auto mt-10">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-5 mb-10">
            <h3 className="text-4xl font-bold text-pink-600">{form.name}</h3>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow hover:opacity-90 transition"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

              <button
                onClick={() => setShowAddPhase(true)}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                + Add Phase
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Add Phase Section */}
          {showAddPhase ? (
            <AddPhasePage
              projectName={form.name}
              onPhaseCreated={() => {
                setShowAddPhase(false);
                showAlert("success", "✅ Phase created successfully!");
              }}
              onCancel={() => setShowAddPhase(false)}
            />
          ) : isEditing ? (
            /* ------------------ Edit Form ------------------ */
            <div className="space-y-5 text-gray-800 text-lg">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-lg p-3"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="grid grid-cols-2 gap-6">
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />
                <input
                  type="date"
                  name="End_date"
                  value={form.End_date}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />
              </div>

              <button
                onClick={handleUpdate}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              {/* ================================
                  SELECTED PROJECT DETAILS
                ================================= */}
              {selectedProjectDetails ? (
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-5 text-lg text-gray-800">
                  <p><strong>Name:</strong> {selectedProjectDetails.name}</p>
                  <p><strong>Description:</strong> {selectedProjectDetails.description}</p>
                  <p><strong>Priority:</strong> {selectedProjectDetails.priority}</p>
                  <p><strong>Status:</strong> {selectedProjectDetails.status}</p>
                  <p><strong>Category:</strong> {selectedProjectDetails.category}</p>
                  <p><strong>Start Date:</strong> {selectedProjectDetails.start_date}</p>
                  <p><strong>End Date:</strong> {selectedProjectDetails.End_date}</p>
                  <p><strong>Created At:</strong> {selectedProjectDetails.create_at}</p>

                  <div className="p-4 bg-white rounded-lg border">
                    <p className="font-semibold text-gray-700">👤 Project Manager</p>
                    <p><strong>Assigned To:</strong> {selectedProjectDetails.project_manager["assigend to"]}</p>
                    <p><strong>Email:</strong> {selectedProjectDetails.project_manager.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Loading project details...</p>
              )}

              {/* Tasks */}
              <div className="mt-14 border-t pt-8">
                <h4 className="text-3xl font-semibold mb-6">
                  📋 Tasks for this Project
                </h4>

                {tasksLoading ? (
                  <p className="text-gray-500 italic">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                  <p className="text-gray-500 italic">No tasks available.</p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {tasks.map((task, i) => (
                      <ProjectTaskCard key={i} task={task} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <AlertModal
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => {
          if (alert.confirmDelete) confirmDelete();
          setAlert({
            show: false,
            type: "",
            message: "",
            confirmDelete: false,
          });
        }}
      />
    </div>
  );
};

export default ProjectDetails;
