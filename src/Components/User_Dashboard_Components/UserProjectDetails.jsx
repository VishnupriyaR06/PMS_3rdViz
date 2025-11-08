const UserProjectDetail = ({ project }) => {
  return (
    <div className="p-6 ">

      <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-200 max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold bg-linear-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
          {project.project_name || "Untitled Project"}
        </h1>

        {/* Description Card */}
        <div className=" p-5 rounded-xl shadow-md border border-gray-200 mb-5">
          <p className="text-xl text-gray-800 font-medium">Description</p>
          <p className="text-gray-600 text-sm mt-2">
            {project.description || "No description provided"}
          </p>
        </div>

        {/* Grid Layout for Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Team Card */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-gray-800 font-medium">Team</p>
            <p className="text-gray-600 text-sm mt-2">
              {project.team || "Not assigned"}
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-gray-800 font-medium">Status</p>
            <p className="text-gray-600 text-sm mt-2">
              {project.status || "N/A"}
            </p>
          </div>

          {/* Start Date Card */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-gray-800 font-medium">Start Date</p>
            <p className="text-gray-600 text-sm mt-2">
              {project.start_date || "Not set"}
            </p>
          </div>

          {/* End Date Card */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-gray-800 font-medium">End Date</p>
            <p className="text-gray-600 text-sm mt-2">
              {project.end_date || "Not set"}
            </p>
          </div>

          {/* Members Card */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
            <p className="text-lg text-gray-800 font-medium">Members</p>
            <p className="text-gray-600 text-sm mt-2">
              {project.members && project.members.length > 0
                ? project.members.join(", ")
                : "No members assigned"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProjectDetail;
