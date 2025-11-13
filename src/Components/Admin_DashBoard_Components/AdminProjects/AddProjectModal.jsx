import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function AddProjectModal({ onClose, onProjectCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    category: "",
    start_date: "",
    End_date: "",
    project_manager: "",
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

  // ✅ Fetch categories and users
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Category_list/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));

    axios
      .get("http://127.0.0.1:8000/api/user_list/")
      .then((res) => {
        console.log("rESPONSE :", res.data[0]?.username),
          setUsers(res.data)
      })
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.start_date || !formData.End_date) {
      setError("Please select Start & End dates");
      return;
    }
    if (!formData.project_manager) {
      setError("Please select a project manager");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ✅ Ensure correct data format (username instead of ID)
      const payload = {
        ...formData,
        project_manager: formData.project_manager, // username
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/project_create/",
        payload
      );

      if (res.data.msg === "user not found") {
        setError("❌ User not found in backend");
        setLoading(false);
        return;
      }

      alert("✅ Project Created Successfully!");
      onProjectCreated();
      onClose();
    } catch (err) {
      console.error("Project creation failed:", err);
      setError("❌ Failed to create project. Check console/logs.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
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
            className="absolute top-8 right-4 text-gray-600 hover:text-black text-xl"
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

            <div>
              <label className="font-medium">Add Project Manager</label>
              <select
                value={formData.project_manager}
                onChange={(e) =>
                  setFormData({ ...formData, project_manager: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select Manager</option>

                {/* ✅ send username instead of ID */}
                {users.map((user) => (
                  <option key={user.id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 font-medium">{error}</p>}
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
