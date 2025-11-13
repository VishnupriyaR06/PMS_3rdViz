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
