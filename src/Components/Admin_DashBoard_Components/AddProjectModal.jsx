import Select from "react-select";
import axios from "axios";
import { useState } from "react";

export default function AddProjectModal({ onClose, onProjectCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    start_date: "",
    End_date: "",
    status: "Pending", // default
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://127.0.0.1:8000/api/project_create/", formData);

    alert("✅ Project Created Successfully!");

    setFormData({
      name: "",
      description: "",
      priority: "",
      start_date: "",
      End_date: "",
      status: "Pending",
    });

    onProjectCreated();  // ✅ open AddPhaseModal
  } catch (error) {
    console.error(error);
    alert("❌ Failed to create project");
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative border border-pink-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl font-bold"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Add New Project
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <input
            type="text"
            name="name"
            placeholder="Project Title"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={3}
          />

          <div className="grid grid-cols-3 gap-4">
            {/* Start Date */}
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            {/* End Date */}
            <input
              type="date"
              name="End_date"
              value={formData.End_date}
              onChange={(e) =>
                setFormData({ ...formData, End_date: e.target.value })
              }
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            {/* Priority */}
            <select
              name="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Project Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="float-right bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-purple-700 transition"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
