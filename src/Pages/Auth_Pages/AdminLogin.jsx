import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "", role_type: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const BASE_API = import.meta.env.VITE_API_URL;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // ✅ Field validation
  const validateField = useCallback((name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required.";
        if (!emailRegex.test(value)) return "Invalid email address.";
        break;
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        break;
      case "role_type":
        if (!value) return "Please select a role.";
        break;
      default:
        return "";
    }
    return "";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "email" ? value.toLowerCase() : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.keys(form).forEach((key) => {
      nextErrors[key] = validateField(key, form[key]);
    });
    setErrors(nextErrors);
    return Object.values(nextErrors).every((v) => !v);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/api/am_login/`, form);
      const { role_type, email } = res.data;

      localStorage.setItem("role", role_type);
      localStorage.setItem("userEmail", email);

      if (role_type === "Admin") navigate("/admin");
      else if (role_type === "Manager") navigate("/manager");
    } catch (err) {
      const msg =
        err?.response?.data?.msg ||
        "Login failed. Please check your credentials.";
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 p-4">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/30 text-white">
        <h1 className="text-4xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-white/80 mb-6 text-sm">
          Sign in to access your dashboard
        </p>

        {errors.form && (
          <div className="mb-4 text-center text-sm text-red-200 bg-red-800/30 py-2 rounded">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="admin@example.com"
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-200">{errors.email}</p>
            )}
          </div>

          {/* Password (with proper eye toggle) */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
                className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 text-gray-700 hover:text-pink-500 transition z-10"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-200">{errors.password}</p>
            )}
          </div>

          {/* Role Type */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Role Type</label>
            <select
              name="role_type"
              value={form.role_type}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.role_type && touched.role_type && (
              <p className="mt-1 text-sm text-red-200">{errors.role_type}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-white text-pink-500 font-semibold rounded-lg hover:bg-pink-100 transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
