import React, { useState, useEffect } from "react";

const Teams = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamDescription, setTeamDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchTeams();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user_details/");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/get_team_details/");
      if (!res.ok) throw new Error("Failed to fetch teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  };

  const handleCheckboxChange = (username) => {
    setSelectedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      alert("Please enter a team name!");
      return;
    }
    if (selectedUsers.length === 0) {
      alert("Select at least one member to create a team!");
      return;
    }

    const newTeam = {
      name: teamName, // ✅ FIXED to match backend field
      description: teamDescription,
      members: selectedUsers,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/create_Team/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || "Failed to create team");
      }

      await fetchTeams();
      setTeamName("");
      setSelectedUsers([]);
      setTeamDescription("");
      setShowModal(false);
      alert("✅ Team created successfully!");
    } catch (error) {
      console.error("Error creating team:", error);
      alert("❌ Failed to create team. Please try again.");
    }
  };

  return (
    <div className=" py-10 px-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Teams Management
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Manage All Teams in One Place.
          </p>
          {/* Subtle gradient divider for structure */}
          <div className="absolute top-15 mt-3 h-0.5 w-full bg-linear-to-r from-pink-200 via-pink-200 to-transparent" />
        </div>

          <button
            onClick={() => setShowModal(true)}
          className="bg-linear-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            + Add Team
          </button>
        </div>
        <div className="flex items-center justify-between mb-8">
           
          </div>

        <div>

          {teams.length === 0 ? (
            <p className="text-gray-500 italic">No teams created yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team, index) => (
                <div
                  key={team.id || index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                    {team.name || team.team_name}
                  </h3>
                  {team.description && (
                    <p className="text-sm text-gray-500 mb-3">
                      {team.description}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Members:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {Array.isArray(team.members) && team.members.length > 0 ? (
                      team.members.map((member, i) => (
                        <li key={i}>
                          {typeof member === "object"
                            ? member.username
                            : member}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">No members</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                ➕ Create New Team
              </h2>

              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />

              <textarea
                placeholder="Enter team description (optional)"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                rows="3"
              ></textarea>

              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Select Members
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto border p-3 rounded-md mb-4">
                {users.length === 0 ? (
                  <p className="text-gray-500 italic">No users found.</p>
                ) : (
                  users.map((user, index) => (
                    <label
                      key={user.id || index}
                      className={`flex items-center gap-3 border rounded-lg px-3 py-2 cursor-pointer transition ${
                        selectedUsers.includes(user.username)
                          ? "bg-indigo-50 border-indigo-400"
                          : "bg-white border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.username)}
                        onChange={() => handleCheckboxChange(user.username)}
                        className="accent-indigo-600"
                      />
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                    </label>
                  ))
                )}
              </div>

              <button
                onClick={handleCreateTeam}
                className="bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Create Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;