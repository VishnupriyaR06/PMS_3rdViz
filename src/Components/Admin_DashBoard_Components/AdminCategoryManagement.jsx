import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
import { nanoid } from "nanoid";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


function PhasesReorder({ phases, setPhases, onAdd }) {
  // reorder helper
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(phases);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setPhases(reordered);
  };

  const updatePhaseName = (id, newName) => {
    setPhases((prev) => prev.map((p) => (p.id === id ? { ...p, name: newName } : p)));
  };

  const removePhase = (id) => {
    setPhases((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-pink-50 border border-pink-100 p-4 rounded-xl">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="phases" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap gap-3 min-h-[80px]"
            >
              {phases.map((phase, index) => (
                <Draggable key={phase.id} draggableId={phase.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={false}
                      animate={{
                        scale: snapshot.isDragging ? 1.05 : 1,
                        boxShadow: snapshot.isDragging
                          ? "0 6px 14px rgba(0,0,0,0.15)"
                          : "0 2px 6px rgba(0,0,0,0.05)",
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 bg-white border border-pink-200 rounded-xl px-4 py-3 select-none cursor-grab"
                      style={{ minWidth: 160, maxWidth: 240 }}
                    >
                      <span className="text-sm font-semibold text-pink-500">
                        {index + 1}.
                      </span>

                      <input
                        value={phase.name}
                        onChange={(e) => updatePhaseName(phase.id, e.target.value)}
                        placeholder={`Phase ${index + 1}`}
                        className="flex-1 text-sm border-none outline-none bg-transparent focus:ring-0 text-gray-700"
                      />

                      {phases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhase(phase.id)}
                          className="text-red-500 hover:text-red-700 text-lg font-bold leading-none"
                        >
                          ×
                        </button>
                      )}
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Phase Button */}
      <button
        type="button"
        onClick={onAdd}
        className="mt-3 text-pink-600 font-medium hover:text-pink-700"
      >
        + Add Phase
      </button>
    </div>
  );
}


export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // phases as array of objects with stable ids
  const [phases, setPhases] = useState([
    { id: nanoid(), name: "Planning" },
    { id: nanoid(), name: "Design" },
    { id: nanoid(), name: "Frontend" },
    { id: nanoid(), name: "Backend" },
    { id: nanoid(), name: "Testing" },
    { id: nanoid(), name: "Deployment" },
  ]);



  // ✅ Fetch existing categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ POST new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert("Category name and description are required");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/category_create//",
        {
          name: categoryName,
          description: categoryDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reset
      setCategoryName("");
      setCategoryDescription("");
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="relative flex justify-between items-center mb-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Category Management
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Manage All Categories in One Place.
          </p>
          <div className="absolute top-15 mt-3 h-0.5 w-full bg-gradient-to-r from-pink-200 via-pink-200 to-transparent" />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          + Add Category
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-start pt-24 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)} // click outside to close
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] max-w-6xl relative"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* Modal Title */}
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-8">
                Add New Category
              </h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (!categoryName.trim() || !categoryDescription.trim()) {
                    alert("Category name and description are required");
                    return;
                  }

                  try {
                    await axios.post(
                      "http://127.0.0.1:8000/api/category_create/",
                      {
                        name: categoryName,
                        description: categoryDescription,
                        phases: phases.filter((p) => p.trim() !== ""),
                      },
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    );

                    // Reset
                    setCategoryName("");
                    setCategoryDescription("");
                    setPhases([
                      "Planning",
                      "Design",
                      "Frontend",
                      "Backend",
                      "Testing",
                      "Deployment",
                    ]);
                    setShowModal(false);
                    fetchCategories();
                  } catch (error) {
                    console.error("Error adding category:", error);
                  }
                }}
              >
                {/* 🔹 Two-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* LEFT SIDE — Category Details */}
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1">
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        placeholder="Enter description"
                        className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pink-300 min-h-[150px]"
                      ></textarea>
                    </div>
                  </div>

                  {/* Phases — horizontal draggable cards with stable ids and free-direction drag */}
                  <div>
                    <label className="text-gray-700 font-medium mb-2 block">
                      Project Phases
                    </label>

                    {/* drag controls for programmatic drag start (so input clicks are safe) */}
                    {/** create dragControls outside render loop */}
                    <PhasesReorder
                      phases={phases}
                      setPhases={setPhases}
                      onAdd={() => setPhases((prev) => [...prev, { id: nanoid(), name: "" }])}
                    />
                  </div>


                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 mt-10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 px-6 rounded-full hover:opacity-90 transition"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {categories.length === 0 ? (
        <p className="text-gray-500 italic text-center">No categories created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-pink-100 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-pink-600 text-lg mb-1">
                {cat.name || cat.category_name}
              </h4>
              <p className="text-gray-600 text-sm">
                {cat.description ? cat.description : "No description"}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Category() {
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryDescription, setCategoryDescription] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // ✅ Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/Category_list/");
//       setCategories(res.data); // backend sends array of categories
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // ✅ Submit category
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!categoryName.trim() || !categoryDescription.trim()) {
//       alert("Category name and description are required");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/category_create/",
//         {
//           name: categoryName,
//           description: categoryDescription,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       // Reset fields
//       setCategoryName("");
//       setCategoryDescription("");
//       setShowModal(false);

//       fetchCategories(); // ✅ Refresh category list
//     } catch (err) {
//       console.error("Error creating category:", err);
//     }
//   };

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-bold text-pink-600">
//             Category Management
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm">
//             Manage all categories easily.
//           </p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-5 py-2 rounded-lg shadow"
//         >
//           + Add Category
//         </button>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               className="bg-white p-8 rounded-2xl w-[90%] max-w-xl relative"
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close button */}
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-4 right-4 text-gray-500"
//               >
//                 ✕
//               </button>

//               {/* Title */}
//               <h3 className="text-2xl font-semibold text-pink-600 mb-6">
//                 Add New Category
//               </h3>

//               {/* Form */}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Category Name
//                   </label>
//                   <input
//                     type="text"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                     placeholder="Enter category name"
//                     className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pink-300"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     value={categoryDescription}
//                     onChange={(e) => setCategoryDescription(e.target.value)}
//                     placeholder="Enter description"
//                     className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pink-300 h-32"
//                   ></textarea>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-3 mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 border rounded-full text-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full"
//                   >
//                     Add Category
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ✅ Category List */}
//       {categories.length === 0 ? (
//         <p className="text-gray-500 italic text-center">No categories created yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white border border-pink-100 p-5 rounded-xl shadow hover:shadow-md"
//             >
//               <h3 className="text-lg font-bold text-pink-600">{cat.name}</h3>
//               <p className="text-gray-700 text-sm mt-1">{cat.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
