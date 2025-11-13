import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerProfile = () => {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


  const fetchManagerDetails = async () => {
    const email = localStorage.getItem("userEmail")?.toLowerCase();
    if (!email) {
      console.error("⚠️ No manager email found in localStorage!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/manager_details/`);
      const allManagers = response.data;
      const loggedInManager = allManagers.find(
        (m) => m.email?.toLowerCase() === email
      );

      if (loggedInManager) {
        // ✅ Load cached image if available
        const cachedImg = localStorage.getItem("managerProfileImage");
        const newImg = `${BASE_URL}${loggedInManager.profile_image}?t=${Date.now()}`;
        setManager({
          ...loggedInManager,
          profile_image: cachedImg || newImg,
        });
        setUpdatedData(loggedInManager);
      } else {
        setManager(null);
      }
    } catch (error) {
      console.error("❌ Error fetching manager details:", error);
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
    fetchManagerDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // ✅ Upload Profile Image (cache busting)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const encodedEmail = encodeURIComponent(manager.email.toLowerCase());
      const response = await axios.put(
        `${BASE_URL}/api/user_update/${encodedEmail}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Force cache-busting (so browser shows new image)
      const newImageUrl = `${BASE_URL}${response.data.profile_image}?t=${Date.now()}`;

      setManager((prev) => ({
        ...prev,
        ...response.data,
        profile_image: newImageUrl,
      }));

      localStorage.setItem("managerProfileImage", newImageUrl);

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
      const encodedEmail = encodeURIComponent(manager.email.toLowerCase());
      const formData = new FormData();

      for (const key in updatedData) {
        if (updatedData[key] !== null && updatedData[key] !== undefined) {
          formData.append(key, updatedData[key]);
        }
      }

      const response = await axios.put(
        `${BASE_URL}/api/user_update/${encodedEmail}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newImageUrl = `${BASE_URL}${response.data.profile_image}?t=${Date.now()}`;
      setManager({
        ...response.data,
        profile_image: newImageUrl,
      });

      localStorage.setItem("managerProfileImage", newImageUrl);

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

  // ✅ Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading Manager Profile...
      </div>
    );

  if (!manager)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        ❌ No profile found for this manager.
      </div>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Manager Profile
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
                  : manager.profile_image ||
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
            {manager.username}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {manager.role_type || "Manager"}
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
              <span>{manager.username}</span>
            )}
          </div>

          <div className="flex justify-between border-b pb-2 items-center">
            <span className="font-medium text-gray-800">📧 Email:</span>
            <span>{manager.email}</span>
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
              <span>{manager.Phone_number || "N/A"}</span>
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
              <span>{manager.password}</span>
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

export default ManagerProfile;
