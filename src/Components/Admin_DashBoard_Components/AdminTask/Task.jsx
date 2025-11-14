// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TaskCreate = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     project: "",
//     name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     assigned_to: "",
//   });

//   // FETCH PROJECTS + USERS
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [projRes, userRes] = await Promise.all([
//           axios.get("http://127.0.0.1:8000/api/project_details/"),
//           axios.get("http://127.0.0.1:8000/api/user_details/"),
//         ]);

//         setProjects(projRes.data); // MUST contain id
//         setUsers(userRes.data); // MUST contain username
//       } catch (err) {
//         console.error("Fetch error:", err);
//         alert("Could not load projects or users.");
//       }
//     };

//     fetchData();
//   }, []);

//   // HANDLE CHANGES
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // CREATE TASK
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         project: Number(formData.project), // backend expects id
//         name: formData.name.trim(),
//         description: formData.description.trim(),
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         assigned_to: formData.assigned_to, // backend expects username
//       };

//       console.log("Sending payload:", payload);

//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/create_task/",
//         payload
//       );

//       alert("Task created successfully!");

//       setFormData({
//         project: "",
//         name: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         assigned_to: "",
//       });

//       setShowForm(false);
//     } catch (error) {
//       console.error("Task creation error:", error);
//       alert(
//         error.response?.data?.msg || "Failed to create task"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400">
//             Task Management
//           </h1>
//           <p className="text-gray-600 text-sm mt-2">
//             Create and manage tasks.
//           </p>
//         </div>

//         {!showForm && (
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
//           >
//             + Create Task
//           </button>
//         )}
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">📝 Create New Task</h2>

//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//             {/* PROJECT DROPDOWN */}
//             <select
//               name="project"
//               value={formData.project}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             >
//               <option value="">Select Project</option>
//               {projects.map((proj) => (
//                 <option key={proj.id} value={proj.id}>
//                   {proj.name}
//                 </option>
//               ))}
//             </select>

//             {/* TASK NAME */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Task Name"
//               className="border p-2 rounded"
//               required
//             />

//             {/* DESCRIPTION */}
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Task Description"
//               className="border p-2 rounded col-span-2"
//               required
//             />

//             {/* ASSIGN USER */}
//             <select
//               name="assigned_to"
//               value={formData.assigned_to}
//               onChange={handleChange}
//               className="border p-2 rounded col-span-2"
//               required
//             >
//               <option value="">Assign To</option>
//               {users.map((u) => (
//                 <option key={u.id} value={u.username}>
//                   {u.username}
//                 </option>
//               ))}
//             </select>

//             {/* DATES */}
//             <input
//               type="date"
//               name="start_date"
//               value={formData.start_date}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             />

//             <input
//               type="date"
//               name="end_date"
//               value={formData.end_date}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             />

//             {/* BUTTONS */}
//             <div className="col-span-2 flex justify-end gap-4 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`px-4 py-2 rounded text-white ${
//                   loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
//                 }`}
//               >
//                 {loading ? "Creating..." : "Create Task"}
//               </button>
//             </div>

//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskCreate;
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "/src/Components/Admin_DashBoard_Components/AdminTask/TaskList.jsx";  

const TaskCreate = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    project: "",
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    assigned_to: "",
  });

  // FETCH PROJECTS + USERS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, userRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/project_details/"),
          axios.get("http://127.0.0.1:8000/api/user_details/"),
        ]);

        setProjects(projRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Could not load projects or users.");
      }
    };

    fetchData();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // AUTO DETECT correct project ID field
      const selectedProject = projects.find(
        (p) => p.id == formData.project || p.project_id == formData.project
      );

      const project_id =
        selectedProject?.id || selectedProject?.project_id || null;

      if (!project_id) {
        alert("Invalid project ID!");
        return;
      }

      const payload = {
        project: project_id,
        name: formData.name.trim(),
        description: formData.description.trim(),
        start_date: formData.start_date,
        end_date: formData.end_date,
        assigned_to: formData.assigned_to,
      };

      console.log("Sending payload:", payload);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/create_task/",
        payload
      );

      alert("Task created successfully!");

      setFormData({
        project: "",
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        assigned_to: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Task creation error:", error);
      alert(error.response?.data?.msg || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header Section */}
      <div className="relative mb-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-gray-600 mt-3 text-base max-w-2xl">
              Create, assign, and manage tasks across all your projects efficiently.
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Task
            </button>
          )}
        </div>

        {/* Decorative Gradient Line */}
        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
      </div>

      {/* Create Task Form */}
      {showForm && (
        <div className="bg-white shadow-2xl rounded-2xl p-6 lg:p-8 mb-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Create New Task
              </h2>
              <p className="text-gray-600 text-sm">Fill in the details to create a new task</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PROJECT */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project</label>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select Project</option>
                {projects.map((proj) => (
                  <option
                    key={proj.id || proj.project_id}
                    value={proj.id || proj.project_id}
                  >
                    {proj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TASK NAME */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Task Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Enter task name"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows="4"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            {/* ASSIGN TO */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700">Assign To</label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select Team Member</option>
                {users.map((u) => (
                  <option key={u.id} value={u.username}>
                    {u.username}
                  </option>
                ))}
              </select>
            </div>

            {/* DATES */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* BUTTONS */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row justify-end gap-4 mt-6 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all font-medium order-2 sm:order-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading 
                    ? "bg-green-300 cursor-not-allowed" 
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:scale-105"
                } text-white order-1 sm:order-2`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Task...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Task
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task List Component */}
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
};

export default TaskCreate;
