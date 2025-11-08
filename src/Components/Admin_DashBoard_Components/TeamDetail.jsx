import React, { useEffect, useState } from "react";

export default function TeamDetail({ teamName, onClose }) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Team Name",teamName)

  useEffect(() => {
    // if (!teamId) return;

    const fetchTeamDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/get_team_details/`);
        if (!response.ok) throw new Error("Failed to fetch team details");
        const data = await response.json();
        console.log(data)
        setTeam(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load team details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetail();
  }, [teamName]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 h-5/6 overflow-y-auto relative p-10 rounded-2xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>

        {/* Loading */}
        {/* {loading && <p className="text-center text-gray-500 mt-20">Loading team details...</p>} */}

        {/* Error */}
        {/* {error && <p className="text-center text-red-500 mt-20">{error}</p>} */}

        {/* Team Details */}
        {team && (
          <div className="mt-10 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{team.Name}</h2>
            
            <p><span className="font-semibold">Description:</span> {team.description}</p>

            <div>
              <h3 className="font-semibold mt-4 mb-2">Members:</h3>
              <ul className="list-disc ml-6">
                {team.members && team.members.length > 0 ? (
                  team.members.map((member) => (
                    <li key={member._id}>{member.name} ({member.email})</li>
                  ))
                ) : (
                  <li>No members found.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
