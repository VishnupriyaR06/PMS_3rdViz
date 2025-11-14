import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/Task_details/");
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">📋 All Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="p-4 bg-white shadow border rounded-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-pink-600">{t.name}</h3>

              <p className="mt-2 text-gray-700">{t.description}</p>

              <p className="mt-2 text-sm">
                <strong>Project:</strong> {t.project}
              </p>

              <p className="text-sm">
                <strong>Assigned To:</strong> {t.assigned_to}
              </p>

              <p className="text-sm mt-2">
                <strong>Start:</strong> {t.start_date}
              </p>

              <p className="text-sm">
                <strong>End:</strong> {t.end_date}
              </p>

              {/* Progress Section */}
              <div className="mt-3">
                <p className="text-sm font-semibold">
                  Progress:{" "}
                  {t.progress === 0 ? "Not Started" : `${t.progress}%`}
                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${t.progress}%` }}
                  ></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
