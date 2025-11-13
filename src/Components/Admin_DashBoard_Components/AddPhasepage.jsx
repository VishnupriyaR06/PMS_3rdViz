
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddPhasePage({ projectName, onPhaseCreated, onCancel }) {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [teamLeaders, setTeamLeaders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     project: projectName || "",
//     category: "",
//     phases: "",
//     team_leader: "",
//     status: "Pending",
//     start_date: "",
//     end_date: "",
//   });

//   /* ===========================================================
//       1️⃣ Fetch PROJECT CATEGORY based on projectName
//   ============================================================ */
//   useEffect(() => {
//     const fetchProjectCategory = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/project_details/");
//         const allProjects = res.data;

//         const selectedProj = allProjects.find(
//           (proj) => proj.name.trim().toLowerCase() === projectName.trim().toLowerCase()
//         );

//         if (selectedProj) {
//           setFormData((prev) => ({
//             ...prev,
//             category: selectedProj.category, // auto-fill category
//           }));
//         }
//       } catch (err) {
//         console.error("Error fetching project details:", err);
//       }
//     };

//     fetchProjectCategory();
//   }, [projectName]);

//   /* ===========================================================
//       2️⃣ Fetch all categories with phases
//   ============================================================ */
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/get_categories_with_phases/")
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   /* ===========================================================
//       3️⃣ Update selected category phases dynamically
//   ============================================================ */
//   useEffect(() => {
//     if (formData.category) {
//       const found = categories.find((cat) => cat.name === formData.category);
//       setSelectedCategory(found || null);
//     }
//   }, [formData.category, categories]);

//   /* ===========================================================
//       4️⃣ Fetch users for Team Leader dropdown
//   ============================================================ */
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/user_list/")
//       .then((res) => setTeamLeaders(res.data))
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);

//   /* Form Change Handler */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ===========================================================
//       Submit Phase
//   ============================================================ */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/create_phases/", formData);
//       alert(res.data.msg || "Phase created successfully!");
//       if (onPhaseCreated) onPhaseCreated();
//     } catch (err) {
//       console.error("Phase creation error:", err.response?.data || err);
//       alert("Failed to create phase.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">
//         Add New Phase for "{projectName}"
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">

//         {/* CATEGORY (AUTO-FILLED) */}
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Category</label>
//           <input
//             type="text"
//             value={formData.category}
//             className="w-full border rounded-md p-2 bg-gray-100 text-gray-700"
//             disabled
//           />
//         </div>

//         {/* PHASE Dropdown */}
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Select Phase</label>
//           <select
//             name="phases"
//             value={formData.phases}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2"
//             required
//             disabled={!selectedCategory}
//           >
//             <option value="">-- Select Phase --</option>
//             {selectedCategory?.phases?.map((phase) => (
//               <option key={phase.id} value={phase.name}>
//                 {phase.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* TEAM LEADER */}
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Select Team Leader</label>
//           <select
//             name="team_leader"
//             value={formData.team_leader}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2"
//             required
//           >
//             <option value="">-- Select Team Leader --</option>
//             {teamLeaders.map((leader) => (
//               <option key={leader.id} value={leader.username}>
//                 {leader.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* STATUS */}
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Ongoing">Ongoing</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* DATES */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Start Date</label>
//             <input
//               type="date"
//               name="start_date"
//               value={formData.start_date}
//               onChange={handleChange}
//               className="w-full border rounded-md p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">End Date</label>
//             <input
//               type="date"
//               name="end_date"
//               value={formData.end_date}
//               onChange={handleChange}
//               className="w-full border rounded-md p-2"
//               required
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             {loading ? "Saving..." : "Create Phase"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddPhasePage({ projectName, onPhaseCreated, onCancel }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState("phase");

  /* ============================
     LOAD COMPLETED PHASES FROM LOCAL STORAGE
  ============================ */
  const [completedPhases, setCompletedPhases] = useState(() => {
    const saved = localStorage.getItem(`completed_${projectName}`);
    return saved ? JSON.parse(saved) : [];
  });

  const saveCompletedPhases = (list) => {
    localStorage.setItem(`completed_${projectName}`, JSON.stringify(list));
  };

  const [formData, setFormData] = useState({
    project: projectName || "",
    category: "",
    phases: "",
    team_leader: "",
    status: "",
    start_date: "",
    end_date: "",
  });

  /* =============================
       FETCH PROJECT CATEGORY
  ============================= */
  useEffect(() => {
    const fetchProjectCategory = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/project_details/");
        const selectedProj = res.data.find(
          (proj) => proj.name.trim().toLowerCase() === projectName.trim().toLowerCase()
        );

        if (selectedProj) {
          setFormData((prev) => ({
            ...prev,
            category: selectedProj.category,
          }));
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };

    fetchProjectCategory();
  }, [projectName]);

  /* =============================
     FETCH CATEGORY + PHASES
  ============================= */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get_categories_with_phases/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    if (formData.category) {
      const found = categories.find((cat) => cat.name === formData.category);
      setSelectedCategory(found || null);
    }
  }, [formData.category, categories]);

  /* =============================
     FETCH TEAM LEADERS
  ============================= */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user_list/")
      .then((res) => setTeamLeaders(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  /* =============================
     FORM CHANGE HANDLER
  ============================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =============================
             SUBMIT
  ============================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/create_phases/", formData);

      alert("Phase created successfully!");

      // Add to completed list
      const updatedCompleted = [...completedPhases, formData.phases];
      setCompletedPhases(updatedCompleted);
      saveCompletedPhases(updatedCompleted); // SAVE PERSISTENTLY

      // Reset values
      setFormData((prev) => ({
        ...prev,
        phases: "",
        team_leader: "",
        status: "",
      }));

      // Go back to phase selection
      setStep("phase");

    } catch (err) {
      console.error("Phase creation error:", err.response?.data || err);
      alert("Failed to create phase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">
        Add New Phase for "{projectName}"
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Category</label>
            <input
              type="text"
              value={formData.category}
              className="w-full border rounded-md p-2 bg-gray-100 text-gray-600"
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Saving..." : "Create Phase"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </form>

        {/* RIGHT SIDE BOX */}
        <div className="bg-gray-50 border rounded-xl p-6 shadow-md min-h-[350px]">

          {/* STEP 1 → PHASES */}
          {step === "phase" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Select a Phase</h3>

              <div className="space-y-3">
                {selectedCategory?.phases?.map((phase) => {
                  const completed = completedPhases.includes(phase.name);

                  return (
                    <div
                      key={phase.id}
                      onClick={() => {
                        if (completed) return; // DISABLED COMPLETED
                        setFormData((prev) => ({ ...prev, phases: phase.name }));
                        setStep("leader");
                      }}
                      className={`p-3 border rounded-md flex justify-between cursor-pointer transition
                        ${
                          completed
                            ? "bg-green-500 text-white border-green-700 cursor-not-allowed"
                            : formData.phases === phase.name
                            ? "bg-indigo-600 text-white border-indigo-700"
                            : "bg-white hover:bg-indigo-100 border-gray-300"
                        }`}
                    >
                      <span>{phase.name}</span>
                      {completed && <span className="text-xl font-bold">✔</span>}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* STEP 2 → TEAM LEADER */}
          {step === "leader" && (
            <>
              <button
                onClick={() => setStep("phase")}
                className="text-indigo-600 underline mb-3 hover:text-indigo-800"
              >
                ← Back to Phases
              </button>

              <h3 className="text-xl font-semibold mb-4">Select Team Leader</h3>

              <div className="space-y-3">
                {teamLeaders.map((leader) => (
                  <div
                    key={leader.id}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        team_leader: leader.username,
                      }));
                      setStep("status");
                    }}
                    className={`p-3 border rounded-md cursor-pointer transition 
                      ${
                        formData.team_leader === leader.username
                          ? "bg-green-600 text-white border-green-700"
                          : "bg-white hover:bg-green-100 border-gray-300"
                      }`}
                  >
                    {leader.username}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 3 → STATUS */}
          {step === "status" && (
            <>
              <button
                onClick={() => setStep("leader")}
                className="text-indigo-600 underline mb-3 hover:text-indigo-800"
              >
                ← Back to Team Leaders
              </button>

              <h3 className="text-xl font-semibold mb-4">Select Status</h3>

              <div className="space-y-3">
                {["Pending", "Ongoing", "Completed"].map((s) => (
                  <div
                    key={s}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, status: s }))
                    }
                    className={`p-3 border rounded-md cursor-pointer transition
                      ${
                        formData.status === s
                          ? "bg-yellow-400 text-white border-yellow-600"
                          : "bg-white hover:bg-yellow-100 border-gray-300"
                      }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
