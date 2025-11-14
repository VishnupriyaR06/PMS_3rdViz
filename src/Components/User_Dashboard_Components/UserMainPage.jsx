import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { FaUsers, FaChartLine, FaCalendar, FaTag } from "react-icons/fa";
import ProjectDetails from "/src/Components/User_Dashboard_Components/UserProjectDetails.jsx";

const UserMainPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  const BASE_API = import.meta.env.VITE_API_URL;

  const username = localStorage.getItem("username");
  console.log(username)

  // 🔥 Fetch projects for this user
  const fetchProjects = async (username) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_API}/api/project_details/`);
      console.log("API Response:", response.data);

      const allProjects = response.data || [];

      // Only take projects assigned to this user
      const userProjects = allProjects.filter(
        (p) => p.project_manager?.project_manager === username
      );

      setProjects(userProjects);
    } catch (error) {
      console.error("❌ Error fetching project details:", error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Auto call API on page load
  useEffect(() => {
    if (username) {
      fetchProjects(username);
    } else {
      console.warn("⚠ Username not found in localStorage");
      setLoading(false);
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in progress":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const ShimmerCard = () => (
    <div className="animate-pulse bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm p-6 h-48">
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
      <div className="flex justify-between mt-auto">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  // If a project is opened → show details page
  if (selectedProject) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 mb-6 text-pink-600 font-semibold hover:text-pink-700 hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>

        <ProjectDetails project={selectedProject} />
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Welcome, {username || "User"}
        </h1>

        <p className="text-gray-600 mt-2 text-sm">
          Projects assigned to you — stay on top of your progress.
        </p>

        <div className="mt-6 h-1 w-full bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-300 rounded-full" />
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => fetchProjects(username)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full flex items-center justify-center">
            <FaUsers className="text-3xl text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Projects Assigned
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You currently don’t have any assigned projects.
          </p>
        </div>
      ) : (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {projects.map((project, index) => (
    <div
      key={project.id || index}
      onClick={() => setSelectedProject(project)}
      className="group cursor-pointer relative p-6 bg-white/80 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
    >
      <div className="relative z-10">

        {/* Title + Priority */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2">
            {project.name || project.project_name || "Untitled Project"}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              project.priority
            )}`}
          >
            {project.priority || "Normal"}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
          {project.description || "No description available."}
        </p>

        {/* Members Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 text-sm">Members</h3>

          {project.project_manager ? (
            <div className="text-gray-600 text-sm">
              <p><strong>Role:</strong> Project Manager</p>
              <p>
                <strong>Name:</strong>{" "}
                {project.project_manager["assigend to"] || "Not provided"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {project.project_manager.email || "Not provided"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No members assigned</p>
          )}
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendar className="text-blue-500" />
          <span>
            {formatDate(project.start_date)} •{" "}
            {formatDate(project.end_date)}
          </span>
        </div>

        {/* Status + Created */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-orange-500" />
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status || "Unknown"}
            </span>
          </div>

          <div className="text-xs text-gray-500">
            Created: {formatDate(project.create_at)}
          </div>
        </div>

      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-200 transition"></div>
    </div>
  ))}
</div>
)}
    </div>
  );
};

export default UserMainPage;
