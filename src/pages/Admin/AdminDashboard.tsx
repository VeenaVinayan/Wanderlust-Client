
// import React, { useState } from 'react';
// import { Outlet, NavLink } from 'react-router-dom';
// import {
//   Bell,
//   LayoutDashboard,
//   Users,
//   Package2,
//   ChartAreaIcon,
//   BriefcaseBusiness,
//   MessageCircleCode,
//   LogOutIcon,
//   ChevronDown,
//   BookAIcon,
//   Menu,
//   X
// } from 'lucide-react';

// import { useDispatch } from 'react-redux';
// import { resetUserData } from '../../features/authentication/userSlice';
// import { adminLogout } from '../../services/Admin/Dashboard';

// const DashboardLayout: React.FC = () => {
//   const [isAgentsOpen, setIsAgentsOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     adminLogout();
//     dispatch(resetUserData());
//   };

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const navItems = [
//     { to: '.', label: 'Dashboard', icon: LayoutDashboard },
//     { to: 'users', label: 'Users', icon: Users },
//     { to: 'category', label: 'Category', icon: Package2 },
//     { to: 'packages', label: 'Packages', icon: Package2 },
//     { to: 'booking', label: 'Bookings', icon: BookAIcon },
//     { to: 'settings', label: 'Notifications', icon: MessageCircleCode },
//     { to: 'chat', label: 'Chat', icon: ChartAreaIcon },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`bg-black text-white w-64 space-y-4 p-5 fixed top-0 left-0 h-full z-30 transform ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out md:translate-x-0`}
//       >
//         <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-300 text-transparent bg-clip-text">
//           Wanderlust
//         </h1>

//         <nav className="space-y-3">
//           {navItems.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
//                   isActive
//                     ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-md'
//                     : 'hover:bg-gray-800'
//                 }`
//               }
//               onClick={() => setSidebarOpen(false)}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{label}</span>
//             </NavLink>
//           ))}

//           {/* Agent Dropdown */}
//           <div>
//             <button
//               onClick={() => setIsAgentsOpen(!isAgentsOpen)}
//               className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               <div className="flex items-center gap-3">
//                 <BriefcaseBusiness className="w-5 h-5" />
//                 <span className="text-sm font-medium">Agents</span>
//               </div>
//               <ChevronDown
//                 className={`w-4 h-4 transform transition-transform ${
//                   isAgentsOpen ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>
//             {isAgentsOpen && (
//               <div className="ml-8 mt-2 space-y-2">
//                 <NavLink
//                   to="/admin/adminDashboard/agentView"
//                   className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-700"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   Agent View
//                 </NavLink>
//                 <NavLink
//                   to="/admin/adminDashboard/verification"
//                   className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-700"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   Verification
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Logout */}
//           <NavLink
//             to="/login"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition mt-3"
//             onClick={handleLogout}
//           >
//             <LogOutIcon className="w-5 h-5" />
//             <span className="text-sm font-medium">Logout</span>
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main layout */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden md:ml-64">
//         {/* Header */}
//      <header className="fixed top-0 right-0 z-20 bg-white shadow-md border-b px-4 py-2 w-full">
//        <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button onClick={toggleSidebar} className="md:hidden">
//             {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
//         </div>
//        <div className="flex items-center gap-4">
//          <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
//          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer">
//           A
//         </div>
//        </div>
//      </div>
//     </header>
//     <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-100">
//        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 md:p-8">
//             <Outlet />
//        </div>
//     </main>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-gray-400 text-center text-sm py-4">
//           &copy; 2025 Wanderlust, Inc. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// };

// import React, { useState } from 'react';
// import { Outlet, NavLink } from 'react-router-dom';
// import {
//   Bell,
//   LayoutDashboard,
//   Users,
//   Package2,
//   ChartAreaIcon,
//   BriefcaseBusiness,
//   MessageCircleCode,
//   LogOutIcon,
//   ChevronDown,
//   BookAIcon,
//   Menu,
//   X
// } from 'lucide-react';

// import { useDispatch } from 'react-redux';
// import { resetUserData } from '../../features/authentication/userSlice';
// import { adminLogout } from '../../services/Admin/Dashboard';

// const DashboardLayout: React.FC = () => {
//   const [isAgentsOpen, setIsAgentsOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     adminLogout();
//     dispatch(resetUserData());
//   };

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const navItems = [
//     { to: '.', label: 'Dashboard', icon: LayoutDashboard },
//     { to: 'users', label: 'Users', icon: Users },
//     { to: 'category', label: 'Category', icon: Package2 },
//     { to: 'packages', label: 'Packages', icon: Package2 },
//     { to: 'booking', label: 'Bookings', icon: BookAIcon },
//     { to: 'settings', label: 'Notifications', icon: MessageCircleCode },
//     { to: 'chat', label: 'Chat', icon: ChartAreaIcon },
//   ];

//   return (
//     <div className="flex h-screen  bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 w-64 h-full bg-black text-white z-30 transform ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0 transition-transform duration-300 ease-in-out`}
//       >
//         <div className="h-full p-6 flex flex-col overflow-y-auto">
//           <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-300 text-transparent bg-clip-text mb-6">
//             Wanderlust
//           </h1>

//           <nav className="flex-1 space-y-2">
//             {navItems.map(({ to, label, icon: Icon }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     isActive
//                       ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-md'
//                       : 'hover:bg-gray-800'
//                   }`
//                 }
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span>{label}</span>
//               </NavLink>
//             ))}

//             {/* Agents dropdown */}
//             <div>
//               <button
//                 onClick={() => setIsAgentsOpen(!isAgentsOpen)}
//                 className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   <BriefcaseBusiness className="w-5 h-5" />
//                   <span>Agents</span>
//                 </div>
//                 <ChevronDown
//                   className={`w-4 h-4 transition-transform ${
//                     isAgentsOpen ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>
//               {isAgentsOpen && (
//                 <div className="ml-6 mt-1 space-y-1 text-sm">
//                   <NavLink
//                     to="/admin/adminDashboard/agentView"
//                     className="block px-3 py-2 rounded hover:bg-gray-700"
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     Agent View
//                   </NavLink>
//                   <NavLink
//                     to="/admin/adminDashboard/verification"
//                     className="block px-3 py-2 rounded hover:bg-gray-700"
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     Verification
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink
//               to="/login"
//               className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
//               onClick={handleLogout}
//             >
//               <LogOutIcon className="w-5 h-5" />
//               <span>Logout</span>
//             </NavLink>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Layout */}
//       <div className="flex-1 flex flex-col md:ml-64">
//         {/* Header */}
//         <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-20 bg-white shadow-md px-4 py-3 border-b">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button onClick={toggleSidebar} className="md:hidden">
//                 {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//               <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
//             </div>
//             <div className="flex items-center gap-4">
//               <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg">
//                 A
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Scrollable Main Content */}
//         <main className="flex-1 overflow-y-auto pt-20 px-6 bg-gray-100">
//           <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-160px)]">
//             <Outlet />
//           </div>
//         </main>

//         {/* Footer - full width aligned with main content */}
//         <footer className="w-full bg-gray-900 text-gray-400 text-center text-sm py-4 md:ml-64">
//           &copy; 2025 Wanderlust, Inc. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Bell,
  LayoutDashboard,
  Users,
  Package2,
  ChartAreaIcon,
  BriefcaseBusiness,
  MessageCircleCode,
  LogOutIcon,
  ChevronDown,
  BookAIcon,
  Menu,
  X
} from 'lucide-react';

import { useDispatch } from 'react-redux';
import { resetUserData } from '../../features/authentication/userSlice';
import { adminLogout } from '../../services/Admin/Dashboard';

const DashboardLayout: React.FC = () => {
  const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    adminLogout();
    localStorage.removeItem('userId');
    dispatch(resetUserData());
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { to: '.', label: 'Dashboard', icon: LayoutDashboard },
    { to: 'users', label: 'Users', icon: Users },
    { to: 'category', label: 'Category', icon: Package2 },
    { to: 'packages', label: 'Packages', icon: Package2 },
    { to: 'booking', label: 'Bookings', icon: BookAIcon },
    { to: 'settings', label: 'Notifications', icon: MessageCircleCode },
   ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white z-40 flex flex-col p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-300 text-transparent bg-clip-text">
          Wanderlust
        </h1>
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-md'
                    : 'hover:bg-gray-800'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
          {/* Agent Dropdown */}
          <div>
            <button
              onClick={() => setIsAgentsOpen(!isAgentsOpen)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="w-5 h-5" />
                <span className="text-sm font-medium">Agents</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  isAgentsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isAgentsOpen && (
              <div className="ml-6 mt-1 space-y-1 text-sm">
                <NavLink
                  to="/admin/adminDashboard/agentView"
                  className="block px-3 py-2 rounded hover:bg-gray-700"
                >
                  Agent View
                </NavLink>
                <NavLink
                  to="/admin/adminDashboard/verification"
                  className="block px-3 py-2 rounded hover:bg-gray-700"
                >
                  Verification
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/login"
            className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </NavLink>
        </nav>
      </aside>

      {/* Right section: header + content + footer */}
      <div className="ml-64 flex flex-col w-full h-full">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm border-b px-6 flex items-center justify-between fixed top-0 left-64 right-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 mt-16 overflow-y-auto bg-gray-100 px-6 py-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 text-center text-sm py-4">
          &copy; 2025 Wanderlust, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;


