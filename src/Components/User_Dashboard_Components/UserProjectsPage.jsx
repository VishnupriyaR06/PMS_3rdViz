import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaChartLine, FaArrowLeft, FaCalendar, FaFlag, FaTag } from "react-icons/fa";

const UserProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_API}/api/project_details/`);
      setProjects(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching project details:", error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Shimmer card for loading state
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

  // 🔹 Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  // 🔹 Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 🔹 Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 🔹 Detail view
  if (selectedProject) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 mb-6 text-pink-600 font-semibold hover:scale-105 hover:text-pink-700 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-pink-50"
        >
          <FaArrowLeft /> Back to Projects
        </button>
        <ProjectDetails project={selectedProject} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      {/* 🔹 Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Projects Overview
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Manage and track all your projects in one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{projects.length}</p>
              <p className="text-sm text-gray-600">Total Projects</p>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="mt-6 h-1 w-full bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-300 rounded-full" />
      </div>

      {/* 🔹 Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-lg">⚠️</span>
            </div>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={fetchProjects}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* 🔹 Loading State */}
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
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            There are no projects available at the moment. Check back later or contact your administrator.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id || index}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative p-6 bg-white/80 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-orange-50/30 to-yellow-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 flex-1 mr-3">
                    {project.name || project.project_name || "Untitled Project"}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority || "Normal"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {project.description || "No description available."}
                </p>

                {/* Project Meta Information */}
                <div className="space-y-3 mb-6">
                  {/* Category */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaTag className="text-purple-500 flex-shrink-0" />
                    <span className="truncate">{project.category || "Uncategorized"}</span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendar className="text-blue-500 flex-shrink-0" />
                    <span>{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-orange-500" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status || "Unknown"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created: {formatDate(project.create_at)}
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-200 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProjectsPage;