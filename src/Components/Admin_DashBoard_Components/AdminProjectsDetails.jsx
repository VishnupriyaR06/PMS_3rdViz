import React, { useState } from "react";
import axios from "axios";

/* ------------------------- Task Card ------------------------- */
const ProjectTaskCard = ({ task }) => (
  <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition">
    <h5 className="text-lg font-semibold text-pink-700">{task.task_name}</h5>
    <p className="text-sm text-gray-700 mt-1">{task.Task_inform}</p>
    <p className="text-sm mt-2"><strong>Priority:</strong> {task.priority}</p>
    <p className="text-sm"><strong>Status:</strong> {task.status}</p>
    <p className="text-xs text-gray-500 mt-1">{task.start_date} → {task.deadline}</p>

    <p className="text-sm mt-2">
      <strong>Members:</strong>{" "}
      {Array.isArray(task.Task_member)
        ? task.Task_member.map((m) => (typeof m === "object" ? m.username || m.email : m)).join(", ")
        : ""}
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
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-[100]">
      <div className={`p-6 rounded-xl shadow-lg border ${colors} w-[90%] max-w-sm text-center`}>
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
          OK
        </button>
      </div>
    </div>
  );
};

/* ------------------------- Project Modal ------------------------- */
const ProjectDetails = ({ project, onClose, getTasksForProject, onProjectUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "", confirmDelete: false });

  const [form, setForm] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    start_date: project.start_date,
    End_date: project.End_date,
    priority: project.priority || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showAlert = (type, message) =>
    setAlert({ show: true, type, message });

  /* ✅ UPDATE PROJECT (Fixed URL + Encoded Name) */
  const handleUpdate = async () => {
    try {
      const encodedName = encodeURIComponent(project.name);

      const res = await axios.put(
        `http://127.0.0.1:8000/api/project_update/${encodedName}/`,
        form
      );

      showAlert("success", "✅ Project updated successfully!");
      setIsEditing(false);
      if (onProjectUpdated) onProjectUpdated(res.data);

    } catch (err) {
      console.error("Update Error:", err.response?.data || err);
      showAlert("error", "❌ Failed to update project.");
    }
  };

  /* ✅ DELETE PROJECT (Fixed URL + Encoded Name) */
  const handleDelete = () => {
    setAlert({
      show: true,
      type: "warning",
      message: `Are you sure you want to delete "${project.name}"?`,
      confirmDelete: true,
    });
  };

  const confirmDelete = async () => {
    try {
      const encodedName = encodeURIComponent(project.name);

      await axios.delete(`http://127.0.0.1:8000/api/project_delete/${encodedName}/`);

      showAlert("success", "🗑️ Project deleted successfully!");
      setTimeout(() => onClose(), 1000);

    } catch (err) {
      console.error("Delete Error:", err.response?.data || err);
      showAlert("error", "❌ Failed to delete project.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full h-full overflow-y-auto relative p-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>

        <div className="max-w-3xl mx-auto mt-10">

          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h3 className="text-4xl font-bold text-pink-600">{form.name}</h3>

            <div className="space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Edit Section */}
          {isEditing ? (
            <div className="space-y-4 text-gray-800 text-lg leading-relaxed">
              <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg p-2" />
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-lg p-2" />

              <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg p-2">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="border rounded-lg p-2" />
                <input type="date" name="End_date" value={form.End_date} onChange={handleChange} className="border rounded-lg p-2" />
              </div>

              <select name="priority" value={form.priority} onChange={handleChange} className="w-full border rounded-lg p-2">
                <option value="">Project Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <button onClick={handleUpdate} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Save Changes
              </button>
            </div>
          ) : (
            /* View Section */
            <div className="space-y-4 text-gray-800 text-lg">
              <p><strong>Name:</strong> {project.name}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Priority:</strong> {project.priority || "Not set"}</p>
              <p><strong>Description:</strong> {project.description || "No description provided."}</p>
              <p><strong>Start Date:</strong> {project.start_date}</p>
              <p><strong>End Date:</strong> {project.End_date}</p>
            </div>
          )}

          {/* Task List */}
          <div className="mt-10 border-t pt-6">
            <h4 className="text-2xl font-semibold mb-4">📋 Tasks for this Project</h4>
            {getTasksForProject(project.name).length === 0 ? (
              <p className="text-gray-500 italic">No tasks available.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {getTasksForProject(project.name).map((task, i) => (
                  <ProjectTaskCard key={i} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertModal
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => {
          if (alert.confirmDelete) confirmDelete();
          setAlert({ show: false, type: "", message: "", confirmDelete: false });
        }}
      />
    </div>
  );
};

export default ProjectDetails;