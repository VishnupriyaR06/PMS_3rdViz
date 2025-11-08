// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeProfile = () => {
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedData, setUpdatedData] = useState({});
//   const [previewImage, setPreviewImage] = useState(null);
//   const [modal, setModal] = useState({ show: false, message: "", type: "" });

//   const BASE_URL = "http://127.0.0.1:8000";

//   useEffect(() => {
//     const email = localStorage.getItem("userEmail");
//     if (!email) {
//       console.error("No employee email found in localStorage!");
//       setLoading(false);
//       return;
//     }

//     const fetchEmployeeDetails = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/user_details/`);
//         console.log(response)
//         const allEmployees = response.data;
//         const loggedInEmployee = allEmployees.find(
//           (e) => e.email?.toLowerCase() === email.toLowerCase()
//         );
//         setEmployee(loggedInEmployee || null);
//         setUpdatedData(loggedInEmployee || {});
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//         setModal({
//           show: true,
//           message: "❌ Failed to load profile details. Please try again.",
//           type: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeDetails();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   // ✅ Fixed image upload to backend (/media/profile_image/)
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Show preview immediately
//     setPreviewImage(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("profile_image", file);

//     try {
//       const response = await axios.put(
//         `${BASE_URL}/api/user_update/${employee.email}/`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("✅ Image upload response:", response.data);

//       setEmployee(response.data);
//       setModal({
//         show: true,
//         message: "✅ Profile image updated successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("❌ Image upload failed:", error);
//       setModal({
//         show: true,
//         message: "❌ Failed to upload profile image.",
//         type: "error",
//       });
//     }
//   };

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     for (const key in updatedData) {
//       if (updatedData[key] !== null && updatedData[key] !== undefined) {
//         formData.append(key, updatedData[key]);
//       }
//     }

//     try {
//       const response = await axios.put(
//         `${BASE_URL}/api/user_update/${employee.email}/`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("✅ Update response:", response.data);

//       setEmployee(response.data);
//       setEditMode(false);
//       setPreviewImage(null);
//       setModal({
//         show: true,
//         message: "✅ Profile updated successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("❌ Profile update failed:", error);
//       setModal({
//         show: true,
//         message: "❌ Failed to update profile.",
//         type: "error",
//       });
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
//         Loading Employee Profile...
//       </div>
//     );

//   if (!employee)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         ❌ No profile found for this employee.
//       </div>
//     );

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="relative flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//             Profile
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm">
//             Manage your personal details as Employee.
//           </p>
//           <div className="absolute top-15 mt-3 h-0.5 w-full bg-gradient-to-r from-pink-200 via-pink-200 to-transparent" />
//         </div>

//         <button
//           onClick={() =>
//             setModal({
//               show: true,
//               message: "Are you sure you want to log out?",
//               type: "confirm",
//             })
//           }
//           className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100 max-w-lg mx-auto">
//         <div className="flex flex-col items-center gap-4">
//           <div className="relative">
//             {/* ✅ Image Display Logic (handles /media/... and http) */}
//             <img
//               src={
//                 previewImage
//                   ? previewImage
//                   : employee.profile_image
//                   ? employee.profile_image.startsWith("http")
//                     ? employee.profile_image
//                     : `${BASE_URL}${employee.profile_image}`
//                   : "https://via.placeholder.com/100?text=User"
//               }
//               alt="Profile"
//               className="w-28 h-28 rounded-full object-cover border-4 border-pink-300 shadow-md"
//             />

//             {editMode && (
//               <label className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-pink-600">
//                 Change
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//             )}
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-800">
//             {employee.username}
//           </h2>
//           <p className="text-gray-500 text-sm mb-4">Employee</p>
//         </div>

//         {/* Editable Fields */}
//         <div className="mt-6 space-y-3 text-gray-700">
//           <div className="flex justify-between border-b pb-2 items-center">
//             <span className="font-medium text-gray-800">👤 Name:</span>
//             {editMode ? (
//               <input
//                 type="text"
//                 name="username"
//                 value={updatedData.username || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 text-sm w-40"
//               />
//             ) : (
//               <span>{employee.username}</span>
//             )}
//           </div>

//           <div className="flex justify-between border-b pb-2 items-center">
//             <span className="font-medium text-gray-800">📧 Email:</span>
//             <span>{employee.email}</span>
//           </div>

//           <div className="flex justify-between border-b pb-2 items-center">
//             <span className="font-medium text-gray-800">📱 Phone:</span>
//             {editMode ? (
//               <input
//                 type="text"
//                 name="Phone_number"
//                 value={updatedData.Phone_number || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 text-sm w-40"
//               />
//             ) : (
//               <span>{employee.Phone_number || "N/A"}</span>
//             )}
//           </div>

//           <div className="flex justify-between border-b pb-2 items-center">
//             <span className="font-medium text-gray-800">🔒 Password:</span>
//             {editMode ? (
//               <input
//                 type="password"
//                 name="password"
//                 value={updatedData.password || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 text-sm w-40"
//               />
//             ) : (
//               <span>{employee.password}</span>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex justify-center gap-4">
//           {!editMode ? (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
//             >
//               Edit Profile
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setEditMode(false);
//                   setPreviewImage(null);
//                 }}
//                 className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {modal.show && modal.type !== "confirm" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
//             <h2
//               className={`text-lg font-semibold mb-3 ${
//                 modal.type === "success" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {modal.message}
//             </h2>
//             <button
//               onClick={() => setModal({ ...modal, show: false })}
//               className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {modal.show && modal.type === "confirm" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
//             <h2 className="text-lg font-semibold mb-3 text-gray-800">
//               {modal.message}
//             </h2>
//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setModal({ ...modal, show: false })}
//                 className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No employee email found in localStorage!");
      setLoading(false);
      return;
    }

    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user_details/`);
        const allEmployees = response.data;
        const loggedInEmployee = allEmployees.find(
          (e) => e.email?.toLowerCase() === email.toLowerCase()
        );
        setEmployee(loggedInEmployee || null);
        setUpdatedData(loggedInEmployee || {});
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setModal({
          show: true,
          message: "❌ Failed to load profile details. Please try again.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/user_update/${employee.email}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEmployee(response.data);
      setModal({
        show: true,
        message: "✅ Profile image updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("❌ Image upload failed:", error);
      setModal({
        show: true,
        message: "❌ Failed to upload profile image.",
        type: "error",
      });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    for (const key in updatedData) {
      if (updatedData[key] !== null && updatedData[key] !== undefined) {
        formData.append(key, updatedData[key]);
      }
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/user_update/${employee.email}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEmployee(response.data);
      setEditMode(false);
      setPreviewImage(null);
      setModal({
        show: true,
        message: "✅ Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("❌ Profile update failed:", error);
      setModal({
        show: true,
        message: "❌ Failed to update profile.",
        type: "error",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full text-lg font-semibold text-gray-700">
        Loading Employee Profile...
      </div>
    );

  if (!employee)
    return (
      <div className="flex justify-center items-center h-full text-gray-600">
        ❌ No profile found for this employee.
      </div>
    );

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage your personal details as Employee.
          </p>
        </div>

        <button
          onClick={() =>
            setModal({
              show: true,
              message: "Are you sure you want to log out?",
              type: "confirm",
            })
          }
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100 max-w-lg mx-auto">
          <div className="flex flex-col items-center gap-4">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={
                  previewImage
                    ? previewImage
                    : employee.profile_image
                    ? employee.profile_image.startsWith("http")
                      ? employee.profile_image
                      : `${BASE_URL}${employee.profile_image}`
                    : "https://via.placeholder.com/100?text=User"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-300 shadow-md"
              />
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-pink-600">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              {employee.username}
            </h2>
            <p className="text-gray-500 text-sm mb-4">Employee</p>
          </div>

          {/* Editable Fields */}
          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex justify-between border-b pb-2 items-center">
              <span className="font-medium text-gray-800">👤 Name:</span>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={updatedData.username || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 text-sm w-40"
                />
              ) : (
                <span>{employee.username}</span>
              )}
            </div>

            <div className="flex justify-between border-b pb-2 items-center">
              <span className="font-medium text-gray-800">📧 Email:</span>
              <span>{employee.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2 items-center">
              <span className="font-medium text-gray-800">📱 Phone:</span>
              {editMode ? (
                <input
                  type="text"
                  name="Phone_number"
                  value={updatedData.Phone_number || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 text-sm w-40"
                />
              ) : (
                <span>{employee.Phone_number || "N/A"}</span>
              )}
            </div>

            <div className="flex justify-between border-b pb-2 items-center">
              <span className="font-medium text-gray-800">🔒 Password:</span>
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  value={updatedData.password || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 text-sm w-40"
                />
              ) : (
                <span>••••••••</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setPreviewImage(null);
                  }}
                  className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
            <h2
              className={`text-lg font-semibold mb-3 ${
                modal.type === "success"
                  ? "text-green-600"
                  : modal.type === "error"
                  ? "text-red-600"
                  : "text-gray-800"
              }`}
            >
              {modal.message}
            </h2>
            {modal.type === "confirm" ? (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => setModal({ ...modal, show: false })}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModal({ ...modal, show: false })}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
