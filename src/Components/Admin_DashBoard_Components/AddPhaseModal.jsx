import React from "react";

export default function AddPhaseModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl relative p-10 shadow-xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>

        <div className="w-full bg-[#faf6ff] px-6 py-4 rounded-xl">
          <h2 className="text-2xl font-semibold text-purple-700 mb-8">Add Phase</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input type="text" placeholder="Design"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input type="text" placeholder="Development"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input type="text" placeholder="Testing"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input type="text" placeholder="Deploy"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-medium">Teams</label>
              <div className="w-full h-full border border-gray-300 rounded-xl bg-white p-4"></div>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
