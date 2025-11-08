import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerProfile = () => {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("managerEmail"); // email saved during login
    if (!email) {
      console.error("No manager email found in localStorage!");
      setLoading(false);
      return;
    }

    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/manager_details/");
        const allManagers = response.data;

        // ✅ Filter only the logged-in manager (case-insensitive)
        const loggedInManager = allManagers.find(
          (m) => m.email?.toLowerCase() === email.toLowerCase()
        );

        setManager(loggedInManager || null);
        setUpdatedData(loggedInManager || {});
      } catch (error) {
        console.error("Error fetching manager details:", error);
        setModal({
          show: true,
          message: "❌ Failed to load profile details. Please try again.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchManagerDetails();
  }, []);

  // ✅ Handle field changes when editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // ✅ Handle Update API call
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/manager_update/${manager.email}/`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setManager(response.data);
      setEditMode(false);
      setModal({
        show: true,
        message: "✅ Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating manager:", error);
      setModal({
        show: true,
        message: "❌ Failed to update profile.",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

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
      {/* Header Section */}
      <div className="relative flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Manage your personal details as Manager.
          </p>
          <div className="absolute top-15 mt-3 h-0.5 w-full bg-gradient-to-r from-pink-200 via-pink-200 to-transparent" />
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
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-orange-300 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {manager.username ? manager.username.charAt(0).toUpperCase() : "M"}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {manager.username}
          </h2>
          <p className="text-gray-500 text-sm mb-4">Manager</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          {/* Username */}
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

          {/* Email */}
          <div className="flex justify-between border-b pb-2 items-center">
            <span className="font-medium text-gray-800">📧 Email:</span>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedData.email || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-40"
              />
            ) : (
              <span>{manager.email}</span>
            )}
          </div>

          {/* Phone Number */}
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

          {/* Password */}
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

        {/* Edit / Save Buttons */}
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
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Success/Error Modal */}
      {modal.show && modal.type !== "confirm" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
            <h2
              className={`text-lg font-semibold mb-3 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.message}
            </h2>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {modal.show && modal.type === "confirm" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              {modal.message}
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleLogout()}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerProfile;