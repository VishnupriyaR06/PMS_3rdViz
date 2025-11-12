import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // ✅ Fetch users from your backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/user_details/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Start editing a user
  const startEdit = (user) => {
    setEditingUser(user.email); // unique identifier
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  // ✅ Save changes (PUT or POST)
  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user_update/${editingUser}/`, formData
      );
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // ✅ Delete user
  const deleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user_delete/${email}/`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );

  return (
    <div className="py-10 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
          User Overview
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          All registered users in the system. You can edit or delete them here.
        </p>

        {users.length === 0 ? (
          <p className="text-gray-500 italic">No users found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >
                {editingUser === user.email ? (
                  // ✅ Edit mode
                  <form onSubmit={saveUser}>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      placeholder="Username"
                      className="w-full border px-3 py-2 rounded mb-2 text-sm"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full border px-3 py-2 rounded mb-2 text-sm bg-gray-100 cursor-not-allowed"
                    />
                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Password"
                      className="w-full border px-3 py-2 rounded mb-2 text-sm"
                    />
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded mb-3 text-sm"
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>

                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-3 py-1.5 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-400 text-white px-3 py-1.5 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // ✅ View mode
                  <>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </p>

                    <span className="inline-block text-xs font-semibold bg-gradient-to-r from-pink-500 to-orange-400 text-white px-3 py-1 rounded-full">
                      {user.role}
                    </span>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.email)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
