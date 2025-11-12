// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// export default function CategoryList({ onSelectCategory }) {
//   const [categories, setCategories] = useState([]);
//   const [showCategoryForm, setShowCategoryForm] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryDescription, setCategoryDescription] = useState("");

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/Category_list/");
//       setCategories(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/api/category_create/", {
//         name: categoryName,
//         description: categoryDescription,
//       });

//       setCategoryName("");
//       setCategoryDescription("");
//       setShowCategoryForm(false);
//       fetchCategories();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to create category");
//     }
//   };

//   return (
//     <div className="p-10">

//       {/* ✅ Add Category Button */}
//       {!showCategoryForm && (
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => setShowCategoryForm(true)}
//             className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow"
//           >
//             + Add Category
//           </button>
//         </div>
//       )}

//       {/* ✅ Category List */}
//       {!showCategoryForm && (
//         <>
//           <h2 className="text-2xl font-bold text-pink-600 mb-4">
//             Created Categories
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {categories.map((c) => (
//               <div
//                 key={c.id}
//                 onClick={() => onSelectCategory(c)}
//                 className="bg-white shadow-lg p-4 rounded-xl border hover:shadow-2xl cursor-pointer transition"
//               >
//                 <h3 className="text-lg font-semibold text-pink-600">
//                   {c.name}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {c.description?.substring(0, 40)}...
//                 </p>

//                 <div className="text-right text-pink-600 font-bold mt-2">
//                   View →
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* ✅ Create Category Form */}
//       {showCategoryForm && (
//         <div className="bg-white p-6 mt-10 rounded-xl shadow-xl">
//           <h2 className="text-2xl font-bold text-pink-600 mb-6">
//             Create Category
//           </h2>

//           <form onSubmit={handleCreateCategory}>
//             <label>Category Name</label>
//             <input
//               className="w-full border px-3 py-2 rounded mb-4"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//             />

//             <label>Description</label>
//             <textarea
//               className="w-full border px-3 py-2 rounded mb-4"
//               value={categoryDescription}
//               onChange={(e) => setCategoryDescription(e.target.value)}
//             />

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 type="button"
//                 onClick={() => setShowCategoryForm(false)}
//                 className="px-6 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-pink-500 text-white rounded"
//               >
//                 Save Category
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
