import { useState } from "react";

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.role || !formData.password || !formData.email) {
      alert("Please fill all fields");
      return;
    }
    setUsers([...users, formData]);
    setFormData({ username: "", role: "", password: "", email: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-6 relative bg-white text-black">
      {/* Add User Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          {showForm ? "Close Form" : "Add User"}
        </button>
      </div>

      {/* User Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border border-gray-300 p-4 rounded-lg max-w-md mx-auto mb-6"
        >
          <h2 className="text-lg font-semibold mb-3 text-center">Add New User</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="role"
              placeholder="User Role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="User Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="User Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <button
              type="submit"
              className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-100 transition"
            >
              Create User
            </button>
          </div>
        </form>
      )}

      {/* User List */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">User List</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users added yet.</p>
        ) : (
          <div className="grid gap-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p><strong>Name:</strong> {user.username}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
                <p className="text-sm text-gray-500">●</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
