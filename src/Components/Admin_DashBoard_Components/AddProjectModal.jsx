// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// export default function AddProjectModal({ onClose, onProjectCreated }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     priority: "",
//     start_date: "",
//     End_date: "",
//     status: "Pending",
//   });
//   const [range, setRange] = useState({ from: undefined, to: undefined });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Local date formatter to fix 1-day offset
//   const formatLocalDate = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-CA"); // → YYYY-MM-DD
//   };

//   const handleRangeChange = (selectedRange) => {
//     if (!selectedRange) {
//       setRange({ from: undefined, to: undefined });
//       setFormData((prev) => ({ ...prev, start_date: "", End_date: "" }));
//       return;
//     }

//     const { from, to } = selectedRange;

//     // ✅ Prevent invalid range (end before start)
//     if (from && to && to < from) {
//       setError("End date cannot be before start date.");
//       setRange({ from, to: undefined });
//       setFormData((prev) => ({
//         ...prev,
//         start_date: formatLocalDate(from),
//         End_date: "",
//       }));
//       return;
//     }

//     setError("");
//     setRange(selectedRange);
//     setFormData((prev) => ({
//       ...prev,
//       start_date: from ? formatLocalDate(from) : "",
//       End_date: to ? formatLocalDate(to) : "",
//     }));
//   };

//   // 🧠 Keep calendar synced with manual input
//   useEffect(() => {
//     const { start_date, End_date } = formData;
//     if (start_date && End_date) {
//       const start = new Date(start_date);
//       const end = new Date(End_date);
//       if (end < start) {
//         setError("End date cannot be before start date.");
//         setFormData((prev) => ({ ...prev, End_date: "" }));
//         setRange({ from: start, to: undefined });
//       } else {
//         setError("");
//         setRange({ from: start, to: end });
//       }
//     } else if (start_date) {
//       setRange({ from: new Date(start_date), to: undefined });
//     } else {
//       setRange({ from: undefined, to: undefined });
//     }
//   }, [formData.start_date, formData.End_date]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.start_date || !formData.End_date) {
//       setError("Please select both start and end dates.");
//       return;
//     }

//     const start = new Date(formData.start_date);
//     const end = new Date(formData.End_date);

//     if (end < start) {
//       setError("End date cannot be before start date.");
//       return;
//     }

//     setError("");
//     setLoading(true);
//     try {
//       await axios.post("http://127.0.0.1:8000/api/project_create/", formData);
//       alert("✅ Project Created Successfully!");
//       setFormData({
//         name: "",
//         description: "",
//         priority: "",
//         start_date: "",
//         End_date: "",
//         status: "Pending",
//       });
//       setRange({ from: undefined, to: undefined });
//       onProjectCreated();
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to create project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="absolute inset-0 z-40 flex items-center justify-center bg-white/40 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           transition={{ duration: 0.25, ease: "easeInOut" }}
//           className="relative bg-white rounded-2xl shadow-2xl border border-pink-200 w-full max-w-5xl p-8 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold transition-all"
//           >
//             ✕
//           </button>

//           {/* ✅ Left: Form */}
//           <div>
//             <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//               Add New Project
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Title */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Project Title
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter project title"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Describe the project..."
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   rows={3}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
//                 />
//               </div>

//               {/* Dates + Priority */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, start_date: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     name="End_date"
//                     value={formData.End_date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, End_date: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Priority
//                   </label>
//                   <select
//                     name="priority"
//                     value={formData.priority}
//                     onChange={(e) =>
//                       setFormData({ ...formData, priority: e.target.value })
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
//                     required
//                   >
//                     <option value="">Select Priority</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
//               </div>

//               {error && (
//                 <p className="text-red-500 text-sm font-medium mt-2">{error}</p>
//               )}

//               {/* Buttons */}
//               <div className="flex justify-end mt-6 gap-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold shadow hover:opacity-90 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
//                     }`}
//                 >
//                   {loading ? "Creating..." : "Create Project"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* ✅ Right: Single Calendar */}
//           <div className="flex flex-col items-center justify-center">
//             <h4 className="text-lg font-semibold text-gray-700 mb-3">
//               Select Project Duration
//             </h4>

//             <div className="rounded-2xl border border-pink-200 shadow-md bg-white p-4 rdp-theme">
//               <DayPicker
//                 mode="range"
//                 selected={range}
//                 onSelect={handleRangeChange}
//                 numberOfMonths={1}
//                 classNames={{
//                   day_selected: "bg-pink-500 text-white font-semibold rounded-full",
//                   day_range_start: "bg-orange-400 text-white font-semibold rounded-full",
//                   day_range_end: "bg-orange-400 text-white font-semibold rounded-full",
//                   day_range_middle:
//                     "bg-gradient-to-r from-pink-400 to-orange-300 text-white rounded-none",
//                   head_cell: "text-pink-600 font-semibold",
//                   caption_label: "text-pink-500 font-bold",
//                 }}
//               />
//             </div>

//             {range?.from && (
//               <p className="mt-4 text-sm text-gray-600">
//                 {range.to ? (
//                   <>
//                     Selected:{" "}
//                     <strong>
//                       {range.from.toLocaleDateString()} →{" "}
//                       {range.to.toLocaleDateString()}
//                     </strong>
//                   </>
//                 ) : (
//                   <>
//                     Start Date:{" "}
//                     <strong>{range.from.toLocaleDateString()}</strong>
//                   </>
//                 )}
//               </p>
//             )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }







import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Dummy data
const CATEGORIES = {
  Design: ["Wireframing", "UI Design", "Prototyping"],
  Development: ["Backend Setup", "Frontend Implementation", "Integration", "Testing"],
  Marketing: ["Research", "Campaign Setup", "Execution", "Analysis"],
  QA: ["Requirement Review", "Test Case Writing", "Execution", "Reporting"],
};

const USERS = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Davis" },
  { id: 4, name: "Diana Lee" },
];

export default function AddProjectModal({ onClose, onProjectCreated }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    category: "",
    start_date: "",
    End_date: "",
    status: "Pending",
    manager: "",
    teamLeaders: {}, // { phaseName: leaderId }
  });
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phases, setPhases] = useState([]);

  const [selectedPhase, setSelectedPhase] = useState(null);


  const formatLocalDate = (date) => (date ? date.toLocaleDateString("en-CA") : "");

  const handleRangeChange = (selectedRange) => {
    if (!selectedRange) {
      setRange({ from: undefined, to: undefined });
      setFormData((prev) => ({ ...prev, start_date: "", End_date: "" }));
      return;
    }

    const { from, to } = selectedRange;
    if (from && to && to < from) {
      setError("End date cannot be before start date.");
      return;
    }

    setError("");
    setRange(selectedRange);
    setFormData((prev) => ({
      ...prev,
      start_date: from ? formatLocalDate(from) : "",
      End_date: to ? formatLocalDate(to) : "",
    }));
  };

  // Sync selected category → auto-set phases
  useEffect(() => {
    if (formData.category) setPhases(CATEGORIES[formData.category] || []);
    else setPhases([]);
  }, [formData.category]);

  const handleNext = () => {
    if (!formData.name || !formData.category || !formData.start_date || !formData.End_date) {
      setError("Please fill all required fields and select valid dates.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.manager) {
      setError("Please assign a project manager.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/project_create/", formData);
      alert("✅ Project Created Successfully!");
      onProjectCreated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-40 flex items-center justify-center bg-white/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="relative bg-white rounded-3xl shadow-2xl border border-pink-200 w-full min-h-[calc(100%-10%)] max-w-7xl p-10 mt-30"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-all"
          >
            ✕
          </button>

          {/* Step indicator */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${step >= 1
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                  : "bg-gray-200 text-gray-600"
                  }`}
              >
                1
              </div>
              <div
                className={`h-1 w-16 ${step === 2 ? "bg-gradient-to-r from-pink-500 to-orange-400" : "bg-gray-300"
                  }`}
              ></div>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${step === 2
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                  : "bg-gray-200 text-gray-600"
                  }`}
              >
                2
              </div>
            </div>
          </div>

          {/* Step Content */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                  {/* Left Form */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      Step 1: Project Details
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Enter project title"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          rows={3}
                          placeholder="Describe the project..."
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">
                            Priority
                          </label>
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={(e) =>
                              setFormData({ ...formData, priority: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                          >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-1">
                            Category
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                          >
                            <option value="">Select Category</option>
                            {Object.keys(CATEGORIES).map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Calendar */}
                  <div className="flex flex-col items-center justify-center">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                      Select Project Duration
                    </h4>

                    <div className="rounded-2xl border border-pink-200 shadow-md bg-white p-4">
                      <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={handleRangeChange}
                        numberOfMonths={1}
                        classNames={{
                          day_selected:
                            "bg-pink-500 text-white font-semibold rounded-full",
                          day_range_middle:
                            "bg-gradient-to-r from-pink-400 to-orange-300 text-white",
                          head_cell: "text-pink-600 font-semibold",
                          caption_label: "text-pink-500 font-bold",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (

                // <motion.div
                //   key="step2"
                //   initial={{ x: 40, opacity: 0 }}
                //   animate={{ x: 0, opacity: 1 }}
                //   exit={{ x: -40, opacity: 0 }}
                //   transition={{ duration: 0.3 }}
                //   className="flex flex-col"
                // >
                //   <h3 className="text-3xl font-bold text-purple-700 mb-8">Add Project</h3>

                //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                //     {/* 🟣 LEFT COLUMN */}
                //     <div>
                //       {/* Project Manager */}
                //       <div className="mb-6">
                //         <label className="block text-gray-700 font-semibold mb-2">
                //           Project Manager
                //         </label>
                //         <select
                //           value={formData.manager}
                //           onChange={(e) => {
                //             setFormData({ ...formData, manager: parseInt(e.target.value) });
                //             setSelectedPhase("manager");
                //           }}
                //           className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                //         >
                //           <option value="">Select Project Manager</option>
                //           {USERS.map((user) => (
                //             <option key={user.id} value={user.id}>
                //               {user.name}
                //             </option>
                //           ))}
                //         </select>
                //       </div>

                //       {/* Phases */}
                //       <h4 className="text-gray-700 font-semibold mb-4">Phases</h4>

                //       <div className="space-y-3">
                //         {phases.map((phase) => (
                //           <button
                //             key={phase}
                //             // onClick={() => setSelectedPhase(phase)}
                //             className={`w-full flex justify-between items-center px-4 py-3 border rounded-xl text-left transition-all duration-200 ${selectedPhase === phase
                //                 ? "bg-purple-100 border-purple-400 shadow-sm"
                //                 : "bg-white border-gray-200 hover:border-purple-300"
                //               }`}
                //           >
                //             <span className="text-gray-700 font-medium">
                //               {phase}
                //               {formData.teamLeaders[phase] && (
                //                 <span className="text-sm text-gray-500 ml-1">
                //                   {" "}
                //                   -{" "}
                //                   {
                //                     USERS.find(
                //                       (u) => u.id === formData.teamLeaders[phase]
                //                     )?.name
                //                   }
                //                 </span>
                //               )}
                //             </span>
                //             {selectedPhase === phase && (
                //               <span className="text-purple-500 font-bold text-lg">•</span>
                //             )}
                //           </button>
                //         ))}
                //       </div>
                //     </div>

                //     {/* 🟣 RIGHT COLUMN */}
                //     <div className="flex flex-col">
                //       <h4 className="text-gray-700 font-semibold mb-4">Teams</h4>

                //       <div className="border border-gray-200 rounded-xl p-4 bg-white h-[420px] overflow-y-auto shadow-inner">
                //         {!selectedPhase ? (
                //           <p className="text-gray-400 text-center mt-20">
                //             Select a Project Manager or a Phase to assign
                //           </p>
                //         ) : (
                //           <>
                //             {selectedPhase === "Manager" ? (
                //               <div>
                //                 <h5 className="text-gray-700 font-semibold mb-3 text-sm">
                //                   Assign Project Manager
                //                 </h5>
                //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                //                   {USERS.map((user) => {
                //                     const assigned = formData.manager === user.id;
                //                     return (
                //                       <button
                //                         key={user.id}
                //                         onClick={() =>
                //                           setFormData({ ...formData, manager: user.id })
                //                         }
                //                         className={`border rounded-lg px-4 py-3 text-left font-medium transition-all ${assigned
                //                             ? "bg-purple-600 text-white shadow-md"
                //                             : "bg-white hover:bg-purple-50 text-gray-700 border-gray-200"
                //                           }`}
                //                       >
                //                         {user.name}
                //                       </button>
                //                     );
                //                   })}
                //                 </div>
                //               </div>
                //             ) : (
                //               <div>
                //                 <h5 className="text-gray-700 font-semibold mb-3 text-sm">
                //                   Assign Team Leader for:{" "}
                //                   <span className="text-purple-600">{selectedPhase}</span>
                //                 </h5>
                //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                //                   {USERS.map((user) => {
                //                     const assigned =
                //                       formData.teamLeaders[selectedPhase] === user.id;
                //                     return (
                //                       <button
                //                         key={user.id}
                //                         onClick={() =>
                //                           setFormData((prev) => ({
                //                             ...prev,
                //                             teamLeaders: {
                //                               ...prev.teamLeaders,
                //                               [selectedPhase]: user.id,
                //                             },
                //                           }))
                //                         }
                //                         className={`border rounded-lg px-4 py-3 text-left font-medium transition-all ${assigned
                //                             ? "bg-purple-600 text-white shadow-md"
                //                             : "bg-white hover:bg-purple-50 text-gray-700 border-gray-200"
                //                           }`}
                //                       >
                //                         {user.name}
                //                       </button>
                //                     );
                //                   })}
                //                 </div>
                //               </div>
                //             )}
                //           </>
                //         )}
                //       </div>
                //     </div>
                //   </div>
                // </motion.div>



                <motion.div
                  key="step2"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Left: Phases */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">
                      Project Phases ({formData.category})
                    </h3>
                    <div className="space-y-3">
                      {phases.length > 0 ? (
                        phases.map((phase, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-pink-100 bg-pink-50/70 font-medium"
                          >
                            {phase}
                            <div className="text-sm text-gray-500 mt-1">
                              Team Leader:{" "}
                              {formData.teamLeaders[phase]
                                ? USERS.find(
                                    (u) => u.id === formData.teamLeaders[phase]
                                  )?.name
                                : "Not Assigned"}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No category selected</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Users */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">
                      Assign Team Leaders
                    </h3>

                    {/* Project Manager */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Project Manager
                      </label>
                      <select
                        value={formData.manager}
                        onChange={(e) =>
                          setFormData({ ...formData, manager: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                      >
                        <option value="">Select Project Manager</option>
                        {USERS.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Assign Team Leader per Phase
                      </label>

                      {phases.map((phase, idx) => (
                        <div key={idx} className="mb-3">
                          <span className="text-sm font-medium text-gray-600">
                            {phase}:
                          </span>
                          <select
                            value={formData.teamLeaders[phase] || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                teamLeaders: {
                                  ...prev.teamLeaders,
                                  [phase]: parseInt(e.target.value),
                                },
                              }))
                            }
                            className="ml-2 border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-pink-400"
                          >
                            <option value="">Select</option>
                            {USERS.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="text-red-500 text-sm font-medium mt-3">{error}</p>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-between mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  ← Back
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold shadow hover:opacity-90 transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`ml-auto px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold shadow hover:opacity-90 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
