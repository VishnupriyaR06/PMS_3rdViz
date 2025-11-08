// import { useEffect, useState } from "react";
// import axios from "axios";

// const UserTaskDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     // ✅ Get stored username (from login)
//     const storedUsername = localStorage.getItem("username");

//     if (!storedUsername) {
//       console.warn("⚠️ Username not found in localStorage");
//       setLoading(false);
//       return;
//     }

//     setUsername(storedUsername);
//     fetchUserTasks(storedUsername);
//   }, []);

//   // ✅ Fetch and filter tasks from the API
//   const fetchUserTasks = (username) => {
//     axios
//       .get("http://127.0.0.1:8000/api/get_Task_details/")
//       .then((res) => {
//         const allTasks = res.data;

//         // ✅ Filter tasks where username exists in Task_member array
//         const userTasks = allTasks.filter((task) =>
//           Array.isArray(task.Task_member)
//             ? task.Task_member.some(
//               (member) =>
//                 member?.toLowerCase().trim() === username?.toLowerCase().trim()
//             )
//             : false
//         );

//         setTasks(userTasks);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching tasks:", err);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {loading ? (
//         <p className="text-gray-500 italic text-center">Loading your tasks...</p>
//       ) : (
//         <>
//           {/* Header */}
//           <div className="bg-white shadow-md rounded-xl p-6 mb-8 text-center">
//             <h1 className="text-3xl font-bold text-gray-800">
//               🧑‍💻 Tasks Assigned to{" "}
//               <span className="text-blue-600">{username}</span>
//             </h1>
//           </div>

//           {/* Task List */}
//           {tasks.length === 0 ? (
//             <p className="text-gray-500 italic text-center">
//               No tasks assigned to you yet.
//             </p>
//           ) : (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {tasks.map((task, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-5 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {task.task_name}
//                   </h3>
//                   <p className="text-gray-700 text-sm mt-2">
//                     <strong>Project:</strong> {task.project}
//                   </p>
//                   <p className="text-gray-700 text-sm mt-1">
//                     <strong>Description:</strong> {task.Task_inform}
//                   </p>
//                   <p className="text-gray-700 text-sm mt-1">
//                     <strong>Priority:</strong> {task.priority}
//                   </p>
//                   <p className="text-gray-700 text-sm mt-1">
//                     <strong>Status:</strong> {task.status}
//                   </p>
//                   <p className="text-gray-600 text-xs mt-2">
//                     <strong>Duration:</strong> {task.start_date} → {task.deadline}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserTaskDashboard;


import { useEffect, useState } from "react";
import axios from "axios";

const UserTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const BASE_API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      console.warn("⚠️ Username not found in localStorage");
      setLoading(false);
      return;
    }

    setUsername(storedUsername);
    fetchUserTasks(storedUsername);
  }, []);

  const fetchUserTasks = async (username) => {
    try {
      const res = await axios.get(`${BASE_API}/api/get_Task_details/`);
      const allTasks = res.data;

      const userTasks = allTasks.filter((task) =>
        Array.isArray(task.Task_member)
          ? task.Task_member.some(
            (member) =>
              member?.toLowerCase().trim() === username?.toLowerCase().trim()
          )
          : false
      );

      setTasks(userTasks);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 italic animate-pulse">
          Loading your tasks...
        </p>
      </div>
    );

  return (
    <div className=" p-6">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Tasks Overview
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Tasks assigned to{" "}
              <span className="font-semibold bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">{username}</span>
            </p>
          </div>
        </div>

        {/* Subtle gradient divider for structure */}
        <div className="mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
      </div>

      {/* Task Grid */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          No tasks assigned to you yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              {/* Task Title */}
              <h2 className="text-xl font-semibold mb-2 bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {task.task_name || "Untitled Task"}
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-800">📁 Project:</span>{" "}
                  {task.project || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">📝 Description:</span>{" "}
                  {task.Task_inform || "No details provided"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">⚡ Priority:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                      }`}
                  >
                    {task.priority || "Not set"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">🚀 Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {task.status || "Pending"}
                  </span>
                </p>
                <p className="text-gray-500 text-xs mt-3">
                  <strong>📅 Duration:</strong>{" "}
                  {task.start_date || "?"} → {task.deadline || "?"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTaskPage;
