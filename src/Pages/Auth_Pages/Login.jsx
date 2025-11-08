// import { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [activeTab, setActiveTab] = useState("admin");
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     email: "",
//     user_password: "",
//     role_type: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showAdminPassword, setShowAdminPassword] = useState(false);
//   const [showUserPassword, setShowUserPassword] = useState(false);

//   const navigate = useNavigate();
//   const BASE_API = import.meta.env.VITE_API_URL;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//   // ✅ Validation
//   const validateField = useCallback((name, value) => {
//     let error = "";
//     if (name === "username" && !value.trim()) error = "Username is required.";
//     if (name === "password") {
//       if (!value) error = "Password is required.";
//       else if (value.length < 6) error = "Password must be at least 6 characters.";
//     }
//     if (name === "email") {
//       if (!value) error = "Email is required.";
//       else if (!emailRegex.test(value)) error = "Enter a valid email address.";
//     }
//     if (name === "user_password") {
//       if (!value) error = "Password is required.";
//       else if (value.length < 6) error = "Password must be at least 6 characters.";
//     }
//     if (name === "role_type" && !value) error = "Please select a role.";
//     return error;
//   }, []);

//   const validateAll = useCallback(() => {
//     const nextErrors = {};
//     if (activeTab === "admin") {
//       nextErrors.username = validateField("username", form.username);
//       nextErrors.password = validateField("password", form.password);
//     } else {
//       nextErrors.email = validateField("email", form.email);
//       nextErrors.user_password = validateField("user_password", form.user_password);
//       nextErrors.role_type = validateField("role_type", form.role_type);
//     }
//     setErrors(nextErrors);
//     return Object.values(nextErrors).every((v) => !v);
//   }, [activeTab, form, validateField]);

//   const handleChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;
//       const newValue = name === "email" ? value.toLowerCase() : value;
//       setForm((prev) => ({ ...prev, [name]: newValue }));
//       if (touched[name]) {
//         setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
//       }
//     },
//     [touched, validateField]
//   );

//   const handleBlur = useCallback(
//     (e) => {
//       const { name, value } = e.target;
//       setTouched((prev) => ({ ...prev, [name]: true }));
//       setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
//     },
//     [validateField]
//   );

//   const handleTabSwitch = useCallback((tab) => {
//     setActiveTab(tab);
//     setErrors({});
//     setTouched({});
//   }, []);

//  const handleLogin = useCallback(
//   async (e) => {
//     e.preventDefault();
//     if (!validateAll()) return;
//     setLoading(true);

//     try {
//       let res;

//       if (activeTab === "admin") {
//         // 🔐 Admin Login API
//         res = await axios.post(`${BASE_API}/api/admin_login/`, {
//           username: form.username,
//           password: form.password,
//         });

//         if (res.status === 200) {
//           localStorage.setItem("role", "admin");
//           localStorage.setItem("user", JSON.stringify(res.data));
//           navigate("/admin");
//         }

//       } else {
//         // 👤 User Login API
//         res = await axios.post(`${BASE_API}/api/single_login/`, {
//           email: form.email,
//           password: form.user_password,
//           role_type: form.role_type,
//         });

//         if (res.status === 200) {
//           localStorage.setItem("role", res.data.role_type);
//           localStorage.setItem("user", JSON.stringify(res.data));

//           switch (res.data.role_type) {
//             case "Manager":
//               navigate("/manager");
//               break;
//             case "TeamLeader":
//               navigate("/TeamLeader");
//               break;
//             case "employee":
//               navigate("/employee");
//               break;
//             default:
//               navigate("/");
//           }
//         }
//       }
//     } catch (err) {
//       const message =
//         err?.response?.data?.msg ??
//         err?.response?.data?.detail ??
//         "Login failed. Please check credentials.";

//       setErrors({ form: message });
//     } finally {
//       setLoading(false);
//     }
//   },
//   [activeTab, BASE_API, form, navigate, validateAll]
// );


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 p-4">
//       <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/30 text-white transition-all duration-300">
//         <h1 className="text-4xl font-bold text-center mb-2">Welcome Back</h1>
//         <p className="text-center text-white/80 mb-6 text-sm">
//           Sign in to continue to your Dashboard
//         </p>

//         {/* Tabs */}
//         <div className="flex justify-center gap-2 mb-6">
//           <button
//             onClick={() => handleTabSwitch("admin")}
//             className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
//               activeTab === "admin"
//                 ? "bg-white text-pink-400 shadow-lg"
//                 : "bg-white/20 text-white/80 hover:bg-white/30"
//             }`}
//           >
//             Admin
//           </button>

//           <button
//             onClick={() => handleTabSwitch("user")}
//             className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
//               activeTab === "user"
//                 ? "bg-white text-pink-400 shadow-lg"
//                 : "bg-white/20 text-white/80 hover:bg-white/30"
//             }`}
//           >
//             User
//           </button>
//         </div>

//         {errors.form && (
//           <div className="mb-4 text-center text-sm text-red-200 bg-red-800/30 py-2 rounded">
//             {errors.form}
//           </div>
//         )}

//         <form onSubmit={handleLogin} noValidate>
//           {activeTab === "admin" ? (
//             <>
//               {/* Admin Username */}
//               <div className="mb-4">
//                 <label className="block mb-1 font-medium text-white">Username</label>
//                 <input
//                   name="username"
//                   type="text"
//                   value={form.username}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   autoComplete="username"
//                   placeholder="Enter admin username"
//                   className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
//                 />
//                 {errors.username && touched.username && (
//                   <p className="mt-1 text-sm text-red-200">{errors.username}</p>
//                 )}
//               </div>

//               {/* Admin Password */}
//               <div className="mb-4 relative">
//                 <label className="block mb-1 font-medium text-white">Password</label>
//                 <div className="relative">
//                   <input
//                     name="password"
//                     type={showAdminPassword ? "text" : "password"}
//                     value={form.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     autoComplete="current-password"
//                     placeholder="Enter admin password"
//                     className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowAdminPassword((s) => !s)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
//                   >
//                     {showAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.password && touched.password && (
//                   <p className="mt-1 text-sm text-red-200">{errors.password}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 bg-white text-pink-400 font-semibold rounded-lg hover:bg-pink-100 transition-all duration-300 ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? "Logging in..." : "Login as Admin"}
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Email */}
//               <div className="mb-4">
//                 <label className="block mb-1 font-medium text-white">Email</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   autoComplete="email"
//                   placeholder="you@example.com"
//                   className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
//                 />
//                 {errors.email && touched.email && (
//                   <p className="mt-1 text-sm text-red-200">{errors.email}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="mb-4 relative">
//                 <label className="block mb-1 font-medium text-white">Password</label>
//                 <div className="relative">
//                   <input
//                     name="user_password"
//                     type={showUserPassword ? "text" : "password"}
//                     value={form.user_password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     autoComplete="current-password"
//                     placeholder="Enter your password"
//                     className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowUserPassword((s) => !s)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
//                   >
//                     {showUserPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.user_password && touched.user_password && (
//                   <p className="mt-1 text-sm text-red-200">{errors.user_password}</p>
//                 )}
//               </div>

//               {/* Role Type */}
//               <div className="mb-4">
//                 <label className="block mb-1 font-medium text-white">Role Type</label>
//                 <select
//                   name="role_type"
//                   value={form.role_type}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
//                 >
//                   <option value="">Select role</option>
//                   <option value="employee">Employee</option>
//                   <option value="Manager">Manager</option>
//                   <option value="TeamLeader">Team Leader</option>
//                 </select>
//                 {errors.role_type && touched.role_type && (
//                   <p className="mt-1 text-sm text-red-200">{errors.role_type}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 bg-white text-pink-500 font-semibold rounded-lg hover:bg-pink-100 transition-all duration-300 ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;