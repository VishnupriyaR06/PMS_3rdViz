import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user_details/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-pink-600">Select a User</h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.username}
            className="bg-white shadow p-4 rounded-lg hover:bg-pink-50 cursor-pointer border border-pink-200"
            onClick={() => onSelectUser(user)}
          >
            <h3 className="font-semibold text-gray-800">{user.username}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
