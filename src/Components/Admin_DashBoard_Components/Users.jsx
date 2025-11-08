import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Fetch users
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user_details/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Add user
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
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/create_user/", newUser);
      setUsers([...users, res.data]);
      setUserName("");
      setRole("");
      setPassword("");
      setEmail("");
      setShowForm(false);
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user");
    }
  };

  // Delete user
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Delete user "${user.username}"?`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/user_details/${user.id}/`);
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
    setPassword(user.password || "");
    setEmail(user.email);
    setPhoneNumber(user.Phone_number || "");
  };

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
      const res = await await axios.put( `http://127.0.0.1:8000/api/user_update/${editingUser.email}/`, { // ✅ email added {
  headers: { "Content-Type": "multipart/form-data" }
});

      setUsers(users.map((u) => (u.email === editingUser.email ? res.data : u)));
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  return (
    <div className="bg-white p-10 text-gray-900">
      {/* Header */}
      <div className="relative flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage and update user profiles easily.
          </p>
          <div className="absolute top-12 mt-3 h-0.5 w-full bg-gradient-to-r from-pink-200 via-pink-100 to-transparent" />
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          {showForm ? "Close Form" : "+ Add User"}
        </button>
      </div>

    {/* Add User Form */}
{showForm && (
  <form
    onSubmit={handleSubmit}
    className="border border-gray-200 p-6 rounded-xl max-w-md mx-auto bg-white shadow-md mb-10"
  >
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
      Add New User
    </h2>

    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      />

      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      />

      {/* USER TYPE DROPDOWN */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white"
      >
        <option value="">User Type</option>
        <option value="employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="TeamLeader">Team Leader</option>
      </select>

      {/* ✅ CONDITIONAL ROLE DROPDOWN */}
      {(role === "employee" || role === "TeamLeader") && (
        <select
          value={subRole}
          onChange={(e) => setSubRole(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="">Select Role</option>
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
        className="border border-gray-300 rounded-md px-3 py-2"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-md px-4 py-2 hover:opacity-90 transition"
      >
        Create User
      </button>
    </div>
  </form>
)}

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center italic col-span-full">
            No users added yet.
          </p>
        ) : (
          users.map((user, index) => (
            <div
              key={user.id || index}
              className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
            >
              <div
                onClick={() => toggleUserDetails(index)}
                className="cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-orange-300 flex items-center justify-center text-white font-bold text-2xl shadow">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-gray-800">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-500">{user.role_type}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {expandedUser === index && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-600">
                  <p>📞 Phone: {user.Phone_number || "N/A"}</p>
                  {user.user_image && (
                    <img
                      src={user.user_image}
                      alt="User"
                      className="w-24 h-24 object-cover rounded-full border mx-auto mt-3"
                    />
                  )}

                  <div className="flex justify-center gap-3 mt-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              ✏️ Edit User - {editingUser.username}
            </h2>
            <form onSubmit={handleUpdateUser} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
             <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="border border-gray-300 rounded-md px-3 py-2 bg-white"
>
  <option value="Manager">Manager</option>
  <option value="Employee">Employee</option>
  <option value="Team Lead">Team Lead</option>
  {/* <option value="3d_artist">3D Artist</option> */}
</select>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              {/* <input
                type="file"
                onChange={(e) => setUserImage(e.target.files[0])}
                className="border border-gray-300 rounded-md px-3 py-2"
              /> */}

              <div className="flex justify-between mt-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;