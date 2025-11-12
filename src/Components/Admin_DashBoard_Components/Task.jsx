
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TaskCreate = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   const [formData, setFormData] = useState({
//     project: "",
//     task_name: "",
//     task_inform: "",
//     task_members: [],
//     start_date: "",
//     deadline: "",
//     priority: "",
//     status: "",
//   });

//   // ✅ Fetch projects, users, and tasks on mount
//   useEffect(() => {
//     // Fetch Projects
//     axios
//       .get("http://127.0.0.1:8000/api/get_project_details/")
//       .then((res) => setProjects(res.data))
//       .catch((err) => console.log(err));

//     // Fetch Users
//     axios
//       .get("http://127.0.0.1:8000/api/user_details/")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log(err));

//     // ✅ Fetch existing Tasks from your backend
//     axios
//       .get("http://127.0.0.1:8000/api/get_Task_details/")
//       .then((res) => setTasks(res.data))
//       .catch((err) => console.log("Error fetching tasks:", err));
//   }, []);

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ Handle Multi-select Members
//   const handleMembersChange = (e) => {
//     const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
//     setFormData((prev) => ({
//       ...prev,
//       task_members: selected,
//     }));
//   };

//   // ✅ Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/Task_create/",
//         formData
//       );
//       alert("✅ Task created successfully!");
//       setTasks((prev) => [...prev, res.data]); // add new task card instantly
//       setShowForm(false); // hide form
//       setFormData({
//         project: "",
//         task_name: "",
//         task_inform: "",
//         task_members: [],
//         start_date: "",
//         deadline: "",
//         priority: "",
//         status: "",
//       });
//     } catch (error) {
//       alert("❌ Failed to create task. Check console.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6">
//         <div className="relative flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//             Task Management
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm">
//             Manage All Tasks in One Place.
//           </p>
//           {/* Subtle gradient divider for structure */}
//           <div className="absolute top-15 mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
//         </div>
      
//       {/* Create Task Button */}
//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
//         >
//           + Create Task
//         </button>
//       )}
//   </div>
//       {/* Task Form */}
//       {showForm && (
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
//           <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//             {/* Project Dropdown */}
//             <select
//               name="project"
//               value={formData.project}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             >
//               <option value="">Select Project</option>
//               {projects.map((p, index) => (
//                 <option key={index} value={p.project_name}>
//                   {p.project_name}
//                 </option>
//               ))}
//             </select>

//             {/* Task Name */}
//             <input
//               type="text"
//               name="task_name"
//               value={formData.task_name}
//               onChange={handleChange}
//               placeholder="Task Name"
//               className="border p-2 rounded"
//               required
//             />

//             {/* Description */}
//             <textarea
//               name="task_inform"
//               value={formData.task_inform}
//               onChange={handleChange}
//               placeholder="Task Description"
//               className="border p-2 rounded col-span-2"
//               required
//             />

//             {/* Members */}
//             <select
//               multiple
//               onChange={handleMembersChange}
//               className="border p-2 rounded col-span-2 h-24"
//             >
//               {users.map((u, index) => (
//                 <option key={index} value={u.username}>
//                   {u.username}
//                 </option>
//               ))}
//             </select>

//             {/* Dates */}
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
//               name="deadline"
//               value={formData.deadline}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             />

//             {/* Priority */}
//             <select
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             >
//               <option value="">Select Priority</option>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>

//             {/* Status */}
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="border p-2 rounded"
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>

//             {/* Buttons */}
//             <div className="col-span-2 flex justify-end gap-4 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Create Task
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Task Cards */}
//       {!showForm && tasks.length > 0 && (
//         <div className="mt-8 grid grid-cols-3 gap-6">
//           {tasks.map((task, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 shadow rounded-lg border border-gray-200"
//             >
//               <h3 className="text-lg font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//                 {task.task_name}
//               </h3>
//               <p className="text-gray-700 mt-1">{task.Task_inform}</p>
//               <p className="text-sm mt-2">
//                 <strong>Project:</strong> {task.project}
//               </p>
//               <p className="text-sm">
//                 <strong>Members:</strong>{" "}
//                 {Array.isArray(task.Task_member)
//                   ? task.Task_member.join(", ")
//                   : ""}
//               </p>
//               <p className="text-sm">
//                 <strong>Priority:</strong> {task.priority}
//               </p>
//               <p className="text-sm">
//                 <strong>Status:</strong> {task.status}
//               </p>
//               <p className="text-xs text-gray-500 mt-2">
//                 {task.start_date} → {task.deadline}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskCreate;
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskCreate = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    project: "",
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    assigned_to: "",
  });

  // ✅ Fetch projects & users when component loads
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/project_details/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Project fetch error:", err));

    axios
      .get("http://127.0.0.1:8000/api/user_details/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit task to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/create_task/",
        {
          project: parseInt(formData.project),
          name: formData.name,
          description: formData.description,
          start_date: formData.start_date,
          end_date: formData.end_date,
          assigned_to: formData.assigned_to,
        }
      );

      alert("✅ Task created successfully!");

      // Reset form
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
      alert("❌ Failed to create task. Backend error.");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
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
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg"
          >
            + Create Task
          </button>
        )}
      </div>

      {/* Create Task Form */}
      {showForm && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            {/* Project - must send ID */}
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            {/* Task Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Task Name"
              className="border p-2 rounded"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="border p-2 rounded col-span-2"
              required
            />

            {/* Assign To */}
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

            {/* Start Date */}
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {/* End Date */}
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskCreate;
