// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TeamLeadProfile = () => {
//   const [teamLeader, setTeamLeader] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedData, setUpdatedData] = useState({});
//   const [previewImage, setPreviewImage] = useState(null);
//   const [modal, setModal] = useState({ show: false, message: "", type: "" });

//   useEffect(() => {
//     const email = localStorage.getItem("teamLeaderEmail");
//     if (!email) {
//       console.error("No team leader email found in localStorage!");
//       setLoading(false);
//       return;
//     }

//     const fetchTeamLeaderDetails = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/TeamLeader_details/");
//         const allTeamLeads = response.data;
//         const loggedInLeader = allTeamLeads.find(
//           (t) => t.email?.toLowerCase() === email.toLowerCase()
//         );
//         setTeamLeader(loggedInLeader || null);
//         setUpdatedData(loggedInLeader || {});
//       } catch (error) {
//         console.error("Error fetching team leader details:", error);
//         setModal({
//           show: true,
//           message: "❌ Failed to load profile details. Please try again.",
//           type: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeamLeaderDetails();
//   }, []);

//   // Handle field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUpdatedData((prev) => ({ ...prev, profile_image: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // Handle Update API call
//   const handleUpdate = async () => {
//     try {
//       const email = encodeURIComponent(teamLeader.email); // ✅ Encode email to prevent 404
//       const formData = new FormData();

//       for (const key in updatedData) {
//         if (updatedData[key] !== null && updatedData[key] !== undefined) {
//           formData.append(key, updatedData[key]);
//         }
//       }

//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/TeamLeader_update/${email}/`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setTeamLeader(response.data);
//       setEditMode(false);
//       setModal({
//         show: true,
//         message: "✅ Profile updated successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setModal({
//         show: true,
//         message: "❌ Failed to update profile. Please try again.",
//         type: "error",
//       });
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
//         Loading Team Lead Profile...
//       </div>
//     );

//   if (!teamLeader)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         ❌ No profile found for this team leader.
//       </div>
//     );

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="relative flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//             My Profile
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm">
//             Manage your personal details as Team Lead.
//           </p>
//           <div className="absolute top-15 mt-3 h-0.5 w-full bg-gradient-to-r from-pink-200 via-pink-200 to-transparent" />
//         </div>

//         <div className="flex gap-3">
//           {!editMode ? (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
//             >
//               Edit
//             </button>
//           ) : (
//             <button
//               onClick={handleUpdate}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
//             >
//               Save
//             </button>
//           )}

//           <button
//             onClick={() =>
//               setModal({
//                 show: true,
//                 message: "Are you sure you want to log out?",
//                 type: "confirm",
//               })
//             }
//             className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100 max-w-lg mx-auto">
//         <div className="flex flex-col items-center gap-4">
//           <div className="relative w-28 h-28">
//             <img
//               src={
//                 previewImage ||
//                 (teamLeader.profile_image
//                   ? `http://127.0.0.1:8000${teamLeader.profile_image}`
//                   : "https://via.placeholder.com/100")
//               }
//               alt="Profile"
//               className="w-28 h-28 object-cover rounded-full border-4 border-pink-300 shadow"
//             />
//             {editMode && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//             )}
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-800">
//             {editMode ? (
//               <input
//                 type="text"
//                 name="username"
//                 value={updatedData.username || ""}
//                 onChange={handleChange}
//                 className="border rounded-lg p-1 text-center"
//               />
//             ) : (
//               teamLeader.username
//             )}
//           </h2>
//           <p className="text-gray-500 text-sm mb-4">Team Leader</p>
//         </div>

//         <div className="mt-6 space-y-3 text-gray-700">
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-medium text-gray-800">📧 Email:</span>
//             {editMode ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={updatedData.email || ""}
//                 onChange={handleChange}
//                 className="border rounded-lg p-1 text-right"
//               />
//             ) : (
//               <span>{teamLeader.email}</span>
//             )}
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-medium text-gray-800">📞 Phone:</span>
//             {editMode ? (
//               <input
//                 type="text"
//                 name="Phone_number"
//                 value={updatedData.Phone_number || ""}
//                 onChange={handleChange}
//                 className="border rounded-lg p-1 text-right"
//               />
//             ) : (
//               <span>{teamLeader.Phone_number}</span>
//             )}
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-medium text-gray-800">🔒 Password:</span>
//             {editMode ? (
//               <input
//                 type="text"
//                 name="password"
//                 value={updatedData.password || ""}
//                 onChange={handleChange}
//                 className="border rounded-lg p-1 text-right"
//               />
//             ) : (
//               <span>{teamLeader.password}</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Success/Error Modal */}
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

//       {/* Logout Confirmation Modal */}
//       {modal.show && modal.type === "confirm" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
//             <h2 className="text-lg font-semibold mb-3 text-gray-800">
//               {modal.message}
//             </h2>
//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 onClick={() => handleLogout()}
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

// export default TeamLeadProfile;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TeamLeadProfile = () => {
//   const [teamLead, setTeamLead] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedData, setUpdatedData] = useState({});
//   const [previewImage, setPreviewImage] = useState(null);
//   const [modal, setModal] = useState({ show: false, message: "", type: "" });

//   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

//   // ✅ Fetch Team Leader Details
//   const fetchTeamLeadDetails = async () => {
//     const email = localStorage.getItem("teamLeaderEmail")?.toLowerCase();
//     if (!email) {
//       console.error("⚠️ No team lead email found in localStorage!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get(`${BASE_URL}/api/TeamLeader_details/`);
//       const allTeamLeads = response.data;
//       const loggedInLead = allTeamLeads.find(
//         (t) => t.email?.toLowerCase() === email
//       );

//       if (loggedInLead) {
//         const cachedImg = localStorage.getItem("teamLeadProfileImage");
//         const newImg = loggedInLead.profile_image
//           ? `${BASE_URL}${loggedInLead.profile_image}?t=${Date.now()}`
//           : "https://placehold.co/100x100?text=User";
//         setTeamLead({
//           ...loggedInLead,
//           profile_image: cachedImg || newImg,
//         });
//         setUpdatedData(loggedInLead);
//       } else {
//         setTeamLead(null);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching team lead details:", error);
//       setModal({
//         show: true,
//         message: "❌ Failed to load profile details. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeamLeadDetails();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   // ✅ Upload Profile Image
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setPreviewImage(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("profile_image", file); // Backend expects 'profile_image'

//     try {
//       const encodedEmail = encodeURIComponent(teamLead.email.toLowerCase());
//       const response = await axios.put(
//         `${BASE_URL}/api/TeamLeader_update/${encodedEmail}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const newImageUrl = `${BASE_URL}${response.data.profile_image}?t=${Date.now()}`;
//       setTeamLead((prev) => ({
//         ...prev,
//         ...response.data,
//         profile_image: newImageUrl,
//       }));

//       localStorage.setItem("teamLeadProfileImage", newImageUrl);

//       setPreviewImage(null);
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

//   // ✅ Update Text Fields
//   const handleUpdate = async () => {
//     try {
//       const encodedEmail = encodeURIComponent(teamLead.email.toLowerCase());
//       const formData = new FormData();

//       for (const key in updatedData) {
//         if (updatedData[key] !== null && updatedData[key] !== undefined) {
//           formData.append(key, updatedData[key]);
//         }
//       }

//       const response = await axios.put(
//         `${BASE_URL}/api/TeamLeader_update/${encodedEmail}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const newImageUrl = `${BASE_URL}${response.data.profile_image}?t=${Date.now()}`;
//       setTeamLead({
//         ...response.data,
//         profile_image: newImageUrl,
//       });

//       localStorage.setItem("teamLeadProfileImage", newImageUrl);

//       setEditMode(false);
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

//   // ✅ Loading / Error UI
//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
//         Loading Team Lead Profile...
//       </div>
//     );

//   if (!teamLead)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         ❌ No profile found for this team lead.
//       </div>
//     );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//             Team Lead Profile
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm">
//             Manage your personal details here.
//           </p>
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
//             <img
//               src={
//                 previewImage
//                   ? previewImage
//                   : teamLead.profile_image ||
//                     "https://placehold.co/100x100?text=User"
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
//             {teamLead.username}
//           </h2>
//           <p className="text-gray-500 text-sm mb-4">
//             {teamLead.role_type || "Team Lead"}
//           </p>
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
//               <span>{teamLead.username}</span>
//             )}
//           </div>

//           <div className="flex justify-between border-b pb-2 items-center">
//             <span className="font-medium text-gray-800">📧 Email:</span>
//             <span>{teamLead.email}</span>
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
//               <span>{teamLead.Phone_number || "N/A"}</span>
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
//               <span>{teamLead.password}</span>
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
//       {modal.show && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
//             <h2
//               className={`text-lg font-semibold mb-3 ${
//                 modal.type === "success"
//                   ? "text-green-600"
//                   : modal.type === "error"
//                   ? "text-red-600"
//                   : "text-gray-800"
//               }`}
//             >
//               {modal.message}
//             </h2>
//             {modal.type === "confirm" ? (
//               <div className="flex justify-center gap-4 mt-4">
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => setModal({ ...modal, show: false })}
//                   className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
//                 >
//                   No
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setModal({ ...modal, show: false })}
//                 className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//               >
//                 OK
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamLeadProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamLeadProfile = () => {
  const [teamLead, setTeamLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // ✅ Fetch Team Leader Details
  const fetchTeamLeadDetails = async () => {
    const email = localStorage.getItem("userEmail")?.toLowerCase(); // ✅ updated key
    if (!email) {
      console.error("⚠️ No user email found in localStorage!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/TeamLeader_details/`);
      const allTeamLeads = response.data;
      const loggedInLead = allTeamLeads.find(
        (t) => t.email?.toLowerCase() === email
      );

      if (loggedInLead) {
        const cachedImg = localStorage.getItem("teamLeadProfileImage");
        const newImg = loggedInLead.profile_image
          ? `${BASE_URL}${loggedInLead.profile_image}?t=${Date.now()}`
          : "https://placehold.co/100x100?text=User";

        setTeamLead({
          ...loggedInLead,
          profile_image: cachedImg || newImg,
        });
        setUpdatedData(loggedInLead);
      } else {
        setTeamLead(null);
      }
    } catch (error) {
      console.error("❌ Error fetching team lead details:", error);
      setModal({
        show: true,
        message: "❌ Failed to load profile details. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamLeadDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // ✅ Upload Profile Image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const encodedEmail = encodeURIComponent(teamLead.email.toLowerCase());
      const response = await axios.put(
        `${BASE_URL}/api/TeamLeader_update/${encodedEmail}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newImageUrl = `${BASE_URL}${response.data.profile_image}?t=${Date.now()}`;
      setTeamLead((prev) => ({
        ...prev,
        ...response.data,
        profile_image: newImageUrl,
      }));

      localStorage.setItem("teamLeadProfileImage", newImageUrl);
      setPreviewImage(null);

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

  // ✅ Update Text Fields
  const handleUpdate = async () => {
    try {
      const encodedEmail = encodeURIComponent(teamLead.email.toLowerCase());
      const formData = new FormData();

      for (const key in updatedData) {
        if (updatedData[key] !== null && updatedData[key] !== undefined) {
          formData.append(key, updatedData[key]);
        }
      }

      const response = await axios.put(
        `${BASE_URL}/api/TeamLeader_update/${encodedEmail}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newImageUrl = `${BASE_URL}${response.data.profile_image}?t=${Date.now()}`;
      setTeamLead({
        ...response.data,
        profile_image: newImageUrl,
      });

      localStorage.setItem("teamLeadProfileImage", newImageUrl);
      setEditMode(false);

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

  // ✅ Loading / Error UI
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading Team Lead Profile...
      </div>
    );

  if (!teamLead)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        ❌ No profile found for this team lead.
      </div>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Team Lead Profile
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Manage your personal details here.
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

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100 max-w-lg mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={
                previewImage
                  ? previewImage
                  : teamLead.profile_image ||
                    "https://placehold.co/100x100?text=User"
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
            {teamLead.username}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {teamLead.role_type || "Team Lead"}
          </p>
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
              <span>{teamLead.username}</span>
            )}
          </div>

          <div className="flex justify-between border-b pb-2 items-center">
            <span className="font-medium text-gray-800">📧 Email:</span>
            <span>{teamLead.email}</span>
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
              <span>{teamLead.Phone_number || "N/A"}</span>
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
              <span>{teamLead.password}</span>
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

export default TeamLeadProfile;
