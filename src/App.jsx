// import React, { Suspense, lazy } from "react";
// import { BrowserRouter, Routes, Route, useLocation, Outlet, } from "react-router-dom";
// import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
// import MangerDashboardWrapper from "./Pages/Dashboard_Pages/ManagerDashBoardWrapper.jsx";
// import TeamLeadDashboardWrapper from "/src/Pages/Dashboard_Pages/TeamLeadDashBoardWrapper.jsx";

// // ✅ Lazy load major pages for performance
// const Login = lazy(() => import("/src/Pages/Auth_Pages/Login.jsx"));
// const Admin = lazy(() => import("/src/Pages/Dashboard_Pages/AdminDasboardWrapper.jsx"));
// const User = lazy(() => import("/src/Pages/Dashboard_Pages/UserDashboardWrapper.jsx"));
// const Project = lazy(() => import("/src/Components/User_Dashboard_Components/UserProjectsPage.jsx"));
// const Report = lazy(() => import("/src/Components/Admin_DashBoard_Components/Report.jsx"));
// const Teams = lazy(() => import("/src/Components/Admin_DashBoard_Components/Teams.jsx"));
// const Users = lazy(() => import("/src/Components/Admin_DashBoard_Components/Users.jsx"));
// const ProjectDetail = lazy(() => import("/src/Components/User_Dashboard_Components/UserProjectDetails.jsx"));

// // ✅ Optional: simple loading fallback
// const LoadingScreen = () => (
//   <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-pink-500 to-orange-400 text-white text-lg font-semibold">
//     Loading...
//   </div>
// );

// // ✅ Auto scroll to top on route change
// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   React.useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);
//   return null;
// };

// // ✅ Optional 404 page
// const NotFound = () => (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 text-white">
//     <h1 className="text-5xl font-bold mb-2">404</h1>
//     <p className="text-lg mb-6">Oops! Page not found.</p>
//     <a
//       href="/"
//       className="bg-white text-pink-500 px-5 py-2 rounded-lg font-semibold hover:bg-pink-100 transition"
//     >
//       Go Home
//     </a>
//   </div>
// );


// // ✅ Admin and Employee Route Wrappers
// const AdminRoutes = () => (
//   <>
//     <Route path="admin" element={<Admin />} />
//     <Route path="project" element={<Project />} />
//     <Route path="users" element={<Users />} />
//     <Route path="report" element={<Report />} />
//     <Route path="teams" element={<Teams />} />
//   </>
// );

// const EmployeeRoutes = () => (
//   <>
//     <Route path="employee" element={<User />} />
//     <Route path="project-detail" element={<ProjectDetail />} />
//   </>
// );


// function App() {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Suspense fallback={<LoadingScreen />}>
//         <Routes>
//           {/* Public Routes */}
//           {/* Login page — wrapped to block logged-in users */}
//           <Route
//             path="/login"
//             element={
//               <ProtectedRoute>
//                 <Login />
//               </ProtectedRoute>
//             }
//           />

//           {/* Default route */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Login />
//               </ProtectedRoute>
//             }
//           />

//           {/* Admin Routes */}
//           <Route
//             element={
//               <ProtectedRoute allowedRole="admin">
//                 <Outlet />
//               </ProtectedRoute>
//             }
//           >
//             {AdminRoutes()}
//           </Route>

//           {/* Employee Routes */}
//           <Route
//             element={
//               <ProtectedRoute allowedRole="employee">
//                 <Outlet />
//               </ProtectedRoute>
//             }
//           >
//             {EmployeeRoutes()}
//           </Route>

//           <Route path="/manager" element={<MangerDashboardWrapper />} />
//           <Route path="/TeamLeader" element={<TeamLeadDashboardWrapper />} />

//           {/* 404 Fallback */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Outlet, } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import MangerDashboardWrapper from "./Pages/Dashboard_Pages/ManagerDashboardWrapper.jsx";
import TeamLeadDashboardWrapper from "/src/Pages/Dashboard_Pages/TeamLeadDashBoardWrapper.jsx";
// ✅ Lazy load major pages for performance
// const Login = lazy(() => import("/src/Pages/Auth_Pages/Login.jsx"));
const AMLogin = lazy(() => import("/src/Pages/Auth_Pages/AMLogin.jsx"));
const ETLogin = lazy(() => import("/src/Pages/Auth_Pages/ETLogin.jsx"));
const Admin = lazy(() => import("/src/Pages/Dashboard_Pages/AdminDasboardWrapper.jsx"));
const User = lazy(() => import("/src/Pages/Dashboard_Pages/UserDashboardWrapper.jsx"));
const Project = lazy(() => import("/src/Components/User_Dashboard_Components/UserProjectsPage.jsx"));
const Report = lazy(() => import("/src/Components/Admin_DashBoard_Components/Report.jsx"));
const Teams = lazy(() => import("/src/Components/Admin_DashBoard_Components/Teams.jsx"));
const Users = lazy(() => import("/src/Components/Admin_DashBoard_Components/Users.jsx"));
const ProjectDetail = lazy(() => import("/src/Components/User_Dashboard_Components/UserProjectDetails.jsx"));

// ✅ Optional: simple loading fallback
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-pink-500 to-orange-400 text-white text-lg font-semibold">
    Loading...
  </div>
);

// ✅ Auto scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// ✅ Optional 404 page
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 text-white">
    <h1 className="text-5xl font-bold mb-2">404</h1>
    <p className="text-lg mb-6">Oops! Page not found.</p>
    <a
      href="/"
      className="bg-white text-pink-500 px-5 py-2 rounded-lg font-semibold hover:bg-pink-100 transition"
    >
      Go Home
    </a>
  </div>
);


// ✅ Admin and Employee Route Wrappers
const AdminRoutes = () => (
  <>
    <Route path="admin" element={<Admin />} />
    <Route path="project" element={<Project />} />
    <Route path="users" element={<Users />} />
    <Route path="report" element={<Report />} />
    <Route path="teams" element={<Teams />} />
  </>
);

const EmployeeRoutes = () => (
  <>
    <Route path="employee" element={<User />} />
    <Route path="project-detail" element={<ProjectDetail />} />
  </>
);


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
         
          {/* <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/am-login"
            element={
              <ProtectedRoute>
                <AMLogin />
              </ProtectedRoute>
            }
          />
          <Route
          path="/et-login"
          element={
            <ProtectedRoute>
              <ETLogin /> 
            </ProtectedRoute>
          }
        />

          {/* Default route */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ETLogin />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          {/* <Route
            element={
              <ProtectedRoute allowedRole="admin">
                <Outlet />
              </ProtectedRoute>
            }
          >
            {AdminRoutes()}
          </Route>

          
          <Route
            element={
              <ProtectedRoute allowedRole="employee">
                <Outlet />
              </ProtectedRoute>
            }
          >
            {EmployeeRoutes()}
          </Route>

          <Route path="/manager" element={<MangerDashboardWrapper />} />
          <Route path="/TeamLeader" element={<TeamLeadDashboardWrapper />} /> */}
          <Route
  element={
    <ProtectedRoute allowedRole="admin">
      <Outlet />
    </ProtectedRoute>
  }
>
  {AdminRoutes()}
</Route>

<Route
  element={
    <ProtectedRoute allowedRole="employee">
      <Outlet />
    </ProtectedRoute>
  }
>
  {EmployeeRoutes()}
</Route>

<Route
  path="/manager"
  element={
    <ProtectedRoute allowedRole="Manager">
      <MangerDashboardWrapper />
    </ProtectedRoute>
  }
/>

<Route
  path="/TeamLeader"
  element={
    <ProtectedRoute allowedRole="TeamLeader">
      <TeamLeadDashboardWrapper />
    </ProtectedRoute>
  }
/>


          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
