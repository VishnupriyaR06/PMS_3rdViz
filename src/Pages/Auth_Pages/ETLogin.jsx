import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ETLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role_type: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const BASE_API = import.meta.env.VITE_API_URL;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validateField = useCallback((name, value) => {
    let error = "";
    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Enter a valid email.";
    }
    if (name === "password") {
      if (!value) error = "Password is required.";
      else if (value.length < 6) error = "Password must be at least 6 characters.";
    }
    if (name === "role_type" && !value) error = "Please select a role.";
    return error;
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
      const res = await axios.post(`${BASE_API}/api/single_login/`, {
        email: form.email,
        password: form.password,
        role_type: form.role_type,
      });

      if (res.status === 200) {
        localStorage.setItem("role", res.data.role_type);
        localStorage.setItem("userEmail", res.data.email);

        if (res.data.role_type === "employee") {
          navigate("/employee");
        } else if (res.data.role_type === "TeamLeader") {
          navigate("/TeamLeader");
        }
      }
    } catch (err) {
      const message =
        err?.response?.data?.msg ||
        "Login failed. Please check credentials.";
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 p-4">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/30 text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Employee / Team Lead Login</h1>

        {errors.form && (
          <div className="mb-4 text-center text-sm text-red-200 bg-red-800/30 py-2 rounded">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-white">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-200">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block mb-1 font-medium text-white">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-200">{errors.password}</p>
            )}
          </div>

          {/* Role Type */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-white">Role Type</label>
            <select
              name="role_type"
              value={form.role_type}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="TeamLeader">Team Leader</option>
            </select>
            {errors.role_type && touched.role_type && (
              <p className="mt-1 text-sm text-red-200">{errors.role_type}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-white text-pink-500 font-semibold rounded-lg hover:bg-pink-100 transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ETLogin;
