
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AddPhaseModal({ show, categoryName, onClose }) {
  const [phaseName, setPhaseName] = useState("");
  const [phaseDescription, setPhaseDescription] = useState("");

  if (!show) return null;

  const handleCreatePhase = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/create_phase_template/", {
        category: categoryName,
        name: phaseName,
        description: phaseDescription,
      });

      alert("✅ Phase created successfully!");
      setPhaseName("");
      setPhaseDescription("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create phase.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 rounded-xl shadow-xl w-[450px]"
      >
        <h2 className="text-2xl font-bold text-purple-600 mb-6">
          Add Phase to {categoryName}
        </h2>

        <form onSubmit={handleCreatePhase}>
          <label className="font-medium">Phase Name</label>
          <input
            className="w-full border px-3 py-2 rounded mb-4"
            value={phaseName}
            onChange={(e) => setPhaseName(e.target.value)}
            placeholder="Enter phase name"
          />

          <label className="font-medium">Phase Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded mb-4"
            value={phaseDescription}
            onChange={(e) => setPhaseDescription(e.target.value)}
            placeholder="Enter phase description"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded"
            >
              Save Phase
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
