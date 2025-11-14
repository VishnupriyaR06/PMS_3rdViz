import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImage, setUserImage] = useState(null);

 const roletype = localStorage.getItem("role");
 
  // ✅ Fetch all users on load
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user_details/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // ✅ Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !role || !password || !email) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      username: userName,
      role_type: role,
      password,
      email,
      Phone_number: phoneNumber,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/create_user/", newUser);
      setUsers([...users, res.data]);
      resetForm();
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user");
    }
  };

  // ✅ Delete user
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Delete user "${user.username}"?`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/user_delete/${user.email}/`);
        setUsers(users.filter((u) => u.id !== user.id));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };

  const toggleUserDetails = (index) => {
    setExpandedUser(expandedUser === index ? null : index);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserName(user.username);
    setRole(user.role_type);
    setPassword("");
    setEmail(user.email);
    setPhoneNumber(user.Phone_number || "");
  };

  // ✅ Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    const formData = new FormData();
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("Phone_number", phoneNumber);
    formData.append("password", password);
    formData.append("role_type", role);
    if (userImage) formData.append("profile_image", userImage);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/user_update/${editingUser.email}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUsers(users.map((u) => (u.email === editingUser.email ? res.data : u)));
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  // ✅ Reset form state
  const resetForm = () => {
    setUserName("");
    setRole("");
    setSubRole("");
    setPassword("");
    setEmail("");
    setPhoneNumber("");
    setUserImage(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header Section */}
      <div className="relative mb-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-gray-600 mt-3 text-base max-w-2xl">
              Manage and update user profiles with ease. Add, edit, or remove users from your system.
            </p>
          </div>

          {roletype === "Admin" && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New User
            </button>
          )}
        </div>

        {/* Decorative Gradient Line */}
        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
      </div>

      {/* ✅ Add User Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowForm(false)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Add New User
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />

                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select User Type</option>
                    <option value="employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="TeamLeader">Team Leader</option>
                  </select>

                  {(role === "employee" || role === "TeamLeader") && (
                    <select 
                      value={subRole} 
                      onChange={(e) => setSubRole(e.target.value)} 
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Sub Role</option>
                      <option value="designer">Designer</option>
                      <option value="developer">Developer</option>
                      <option value="backend">Backend</option>
                      <option value="3d-artist">3D Artist</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  )}

                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={resetForm} 
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditingUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setEditingUser(null)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Edit User
                </h3>
              </div>

              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <input 
                    type="password" 
                    placeholder="Change Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <input 
                    type="file" 
                    onChange={(e) => setUserImage(e.target.files[0])} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setEditingUser(null)} 
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ User Cards Grid */}
      {users.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Users Found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Get started by adding your first user to the system.
          </p>
          {roletype === "Admin" && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Add First User
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <motion.div 
              key={user.id || index} 
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
              layout
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
              
              <div onClick={() => toggleUserDetails(index)} className="cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  {/* User Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4 ring-4 ring-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* User Info */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{user.username}</h3>
                  <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full mb-2">
                    {user.role_type}
                  </span>
                  <p className="text-sm text-gray-500 truncate w-full">{user.email}</p>
                </div>
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {expandedUser === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-600"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{user.Phone_number || "N/A"}</span>
                      </div>
                      
                      {user.user_image && (
                        <div className="flex justify-center mt-3">
                          <img src={user.user_image} alt="User" className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 shadow" />
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 mt-4">
                      <button 
                        onClick={() => handleEditUser(user)} 
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)} 
                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;