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
    <div className="p-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400">
            Task Management
          </h1>
          <p className="text-gray-600 text-sm mt-2">Create and manage tasks.</p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            + Create Task
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📝 Create New Task</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* PROJECT */}
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="border p-2 rounded"
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

            {/* NAME */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Task Name"
              required
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="border p-2 rounded col-span-2"
              required
            />

            {/* USERS */}
            <select
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
              required
            >
              <option value="">Assign To</option>

              {users.map((u) => (
                <option key={u.id} value={u.username}>
                  {u.username}
                </option>
              ))}
            </select>

            {/* DATES */}
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {/* BUTTONS */}
            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                  loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      )}
        <TaskList />
    </div>
  
  );
};

export default TaskCreate;
