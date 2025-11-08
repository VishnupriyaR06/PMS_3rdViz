import React, { useState, useEffect } from "react";

const ManagerTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/get_team_details/");
      if (!res.ok) throw new Error("Failed to fetch teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading teams...</p>
      </div>
    );

  return (
    <div className="py-10 px-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
          Team Overview
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Teams created by the Admin. You can view members assigned to each.
        </p>

        {teams.length === 0 ? (
          <p className="text-gray-500 italic">No teams available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  {team.name}
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
                  {team.members && team.members.length > 0 ? (
                    team.members.map((member, i) => (
                      <li key={i}>{member}</li>
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
    </div>
  );
};

export default ManagerTeams;