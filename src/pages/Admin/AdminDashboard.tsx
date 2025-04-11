// import React, { useState } from 'react';
// import { Outlet, NavLink } from 'react-router-dom';
// import { Bell, UserCircle, LayoutDashboard, Users, Search, Package2, ChartAreaIcon, BriefcaseBusiness, MessageCircleCode, LogOutIcon, ChevronDown } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { resetUserData } from '../../features/authentication/userSlice';
// import { adminLogout } from '../../services/Admin/Dashboard';

// const DashboardLayout: React.FC = () => {
//   const [isAgentsOpen, setIsAgentsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     adminLogout();
//     dispatch(resetUserData());
//   };

//   return (
//   <aside className="text-white bg-gradient-to-b from-black to-gray-800 shadow-xl flex flex-col fixed h-full min-w-fit items-start">
//     <h1 className="text-2xl font-extrabold px-4 mt-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-200 text-transparent bg-clip-text whitespace-nowrap">
//        Wanderlust
//      </h1>
//     <hr className="w-full border-t border-gray-600 my-4" />
//     <nav className="flex flex-col space-y-2 w-full px-2">
//     {[
//       { to: "/admin/adminDashboard", label: "Dashboard", icon: LayoutDashboard },
//       { to: "users", label: "Users", icon: Users },
//       { to: "category", label: "Category", icon: Package2 },
//       { to: "packages", label: "Packages", icon: Package2 },
//       { to: "/settings", label: "Notifications", icon: MessageCircleCode },
//       { to: "/chat", label: "Chat", icon: ChartAreaIcon },
//     ].map(({ to, label, icon: Icon }) => (
//       <NavLink
//         key={to}
//         to={to}
//         className={({ isActive }) =>
//           `flex items-center space-x-3 px-3 py-2 rounded-lg transition duration-300 ${
//             isActive ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-md" : "hover:bg-gray-700"
//           }`
//         }
//       >
//         <Icon className="w-5 h-5 text-white" />
//         <span className="text-sm font-medium whitespace-nowrap">{label}</span>
//       </NavLink>
//     ))}

//       <div className="w-full w-h-screen">
//       <button
//         onClick={() => setIsAgentsOpen(!isAgentsOpen)}
//         className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
//       >
//         <div className="flex items-center space-x-3">
//           <BriefcaseBusiness className="w-5 h-5 text-white" />
//           <span className="text-sm font-medium whitespace-nowrap">Agents</span>
//         </div>
//         <ChevronDown
//           className={`w-4 h-4 text-white transform transition-transform ${
//             isAgentsOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>
//       {isAgentsOpen && (
//         <div className="ml-8 mt-1 space-y-1">
//           <NavLink
//             to="/admin/adminDashboard/agentView"
//             className={({ isActive }) =>
//               `block px-3 py-2 text-sm rounded-lg transition duration-300 whitespace-nowrap ${
//                 isActive ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "hover:bg-gray-700"
//               }`
//             }
//           >
//             Agent View
//           </NavLink>
//           <NavLink
//             to="/admin/adminDashboard/verification"
//             className={({ isActive }) =>
//               `block px-3 py-2 text-sm rounded-lg transition duration-300 whitespace-nowrap ${
//                 isActive ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : "hover:bg-gray-700"
//               }`
//             }
//           >
//             Verification
//           </NavLink>
//         </div>
//       )}
//     </div>

//     <NavLink
//       to="/login"
//       className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300"
//       onClick={handleLogout}
//     >
//       <LogOutIcon className="w-5 h-5 text-white" />
//       <span className="text-sm font-medium whitespace-nowrap">Logout</span>
//     </NavLink>
//   </nav>
// </aside>


//   {/* Main Content */}
//   <div className="flex-1 flex flex-col ml-72">
//     {/* Header */}
//     <header className="bg-white/90 backdrop-blur-md shadow sticky top-0 z-20 px-6 py-4 flex justify-between items-center border-b border-gray-200">
//       <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
//       <div className="relative flex items-center">
//         <Search className="absolute left-4 w-5 h-5 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-72 bg-gray-100 text-gray-700 pl-12 pr-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
//         />
//       </div>
//       <div className="flex items-center space-x-4">
//         <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition" />
//         {localStorage.getItem("username") ? (
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex items-center justify-center font-bold">
//             {localStorage.getItem("username")?.charAt(0).toUpperCase()}
//           </div>
//         ) : (
//           <UserCircle className="w-8 h-8 text-gray-600" />
//         )}
//       </div>
//     </header>

//     {/* Main Content */}
//     <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
//       <div className="bg-white shadow-md rounded-xl p-6">
//         <Outlet />
//       </div>
//     </main>

//     {/* Footer */}
//     <footer className="bg-gray-800 text-gray-300 p-4 text-center mt-auto">
//       <p>&copy; 2025 Wanderlust, Inc. All rights reserved.</p>
//     </footer>
//   </div>
// </div>

//   );
// };

// export default DashboardLayout;
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Bell,
  UserCircle,
  LayoutDashboard,
  Users,
  Search,
  Package2,
  ChartAreaIcon,
  BriefcaseBusiness,
  MessageCircleCode,
  LogOutIcon,
  ChevronDown,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { resetUserData } from '../../features/authentication/userSlice';
import { adminLogout } from '../../services/Admin/Dashboard';

const DashboardLayout: React.FC = () => {
  const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    adminLogout();
    dispatch(resetUserData());
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="text-white w-60 bg-gradient-to-b from-black to-gray-800 shadow-xl flex flex-col fixed h-full min-w-fit px-4 pt-2">
        <h1 className="text-2xl font-extrabold mt-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-200 text-transparent bg-clip-text whitespace-nowrap">
          Wanderlust
        </h1>
        <hr className="w-full border-t border-gray-600 my-4" />
        <nav className="flex flex-col space-y-2 w-full">
          {[
            { to: "/admin/adminDashboard", label: "Dashboard", icon: LayoutDashboard },
            { to: "users", label: "Users", icon: Users },
            { to: "category", label: "Category", icon: Package2 },
            { to: "packages", label: "Packages", icon: Package2 },
            { to: "/settings", label: "Notifications", icon: MessageCircleCode },
            { to: "/chat", label: "Chat", icon: ChartAreaIcon },
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition duration-300 ${
                  isActive ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-md" : "hover:bg-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            </NavLink>
          ))}

          {/* Agents Dropdown */}
          <div>
            <button
              onClick={() => setIsAgentsOpen(!isAgentsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <div className="flex items-center space-x-3">
                <BriefcaseBusiness className="w-5 h-5 text-white" />
                <span className="text-sm font-medium whitespace-nowrap">Agents</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white transform transition-transform ${
                  isAgentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isAgentsOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <NavLink
                  to="/admin/adminDashboard/agentView"
                  className={({ isActive }) =>
                    `block px-3 py-2 text-sm rounded-lg transition duration-300 whitespace-nowrap ${
                      isActive ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Agent View
                </NavLink>
                <NavLink
                  to="/admin/adminDashboard/verification"
                  className={({ isActive }) =>
                    `block px-3 py-2 text-sm rounded-lg transition duration-300 whitespace-nowrap ${
                      isActive ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Verification
                </NavLink>
              </div>
            )}
          </div>

          {/* Logout */}
          <NavLink
            to="/login"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-medium whitespace-nowrap">Logout</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-60"> 
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md shadow sticky top-0 z-20 px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition" />
            {localStorage.getItem("username") ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex items-center justify-center font-bold">
                {localStorage.getItem("username")?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <UserCircle className="w-8 h-8 text-gray-600" />
            )}
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="bg-white shadow-md rounded-xl p-6">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 p-4 text-center mt-auto">
          <p>&copy; 2025 Wanderlust, Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
