import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // ✅ Fetch Admin Details
  const fetchAdminDetails = async () => {
    let storedEmail = localStorage.getItem("userEmail");

    console.log("📩 Stored Email:", storedEmail);

    if (!storedEmail) {
      console.error("⚠️ No admin email in localStorage");
      setLoading(false);
      return;
    }

    storedEmail = storedEmail.trim().toLowerCase();

    try {
      const response = await axios.get(`${BASE_URL}/api/Admin_list/`);

      console.log("✅ Admin_list Response:", response.data);

      const adminList = response.data;

      if (!Array.isArray(adminList)) {
        console.error("❌ Admin_list API must return an array!");
        setAdmin(null);
        setLoading(false);
        return;
      }

      // ✅ Correct and safe matching
      const matchedAdmin = adminList.find(
        (a) =>
          a.email &&
          a.email.trim().toLowerCase() === storedEmail
      );

      console.log("✅ Matched Admin:", matchedAdmin);

      if (matchedAdmin) {
        setAdmin(matchedAdmin);
        setUpdatedData(matchedAdmin);
      } else {
        console.error("❌ No matching admin found for email:", storedEmail);
        setAdmin(null);
      }
    } catch (error) {
      console.error("❌ Error loading admin:", error);
      setModal({
        show: true,
        message: "❌ Failed to load admin profile.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  // ✅ Handle Form Input
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // ✅ Update Admin Profile
  const handleUpdate = async () => {
    try {
      const encodedEmail = encodeURIComponent(admin.email.trim().toLowerCase());
      const formData = new FormData();

      Object.keys(updatedData).forEach((key) => {
        formData.append(key, updatedData[key]);
      });

      console.log("🚀 Sending updated data:", updatedData);

      const response = await axios.put(
        `${BASE_URL}/api/admin_update/${encodedEmail}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Update Response:", response.data);

      setAdmin(response.data);
      setUpdatedData(response.data);
      setEditMode(false);

      setModal({
        show: true,
        message: "✅ Profile Updated Successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("❌ Update failed:", error);
      setModal({
        show: true,
        message: "❌ Unable to update admin profile.",
        type: "error",
      });
    }
  };

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // ------------------ Rendering States ------------------

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading Admin Profile...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        ❌ No admin profile found.
      </div>
    );
  }

  // ------------------ UI ------------------

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Admin Profile
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Manage your personal details here.</p>
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
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {admin.admin_name}
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          {admin.role_type || "Admin"}
        </p>

        <div className="mt-6 space-y-4 text-gray-700">
          {/* Name */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">👤 Name:</span>
            {editMode ? (
              <input
                type="text"
                name="admin_name"
                value={updatedData.admin_name || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-48"
              />
            ) : (
              <span>{admin.admin_name}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">📧 Email:</span>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedData.email || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-48"
              />
            ) : (
              <span>{admin.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">🔒 Password:</span>
            {editMode ? (
              <input
                type="text"
                name="password"
                value={updatedData.password || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-48"
              />
            ) : (
              <span>{admin.password}</span>
            )}
          </div>

          {/* Role */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">👑 Role:</span>
            {editMode ? (
              <input
                type="text"
                name="role_type"
                value={updatedData.role_type || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-48"
              />
            ) : (
              <span>{admin.role_type || "Admin"}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-5">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">

            <h2
              className={`text-lg font-semibold ${
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
              <div className="flex justify-center gap-4 mt-5">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => setModal({ ...modal, show: false })}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModal({ ...modal, show: false })}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg mt-4"
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

export default AdminProfile;
