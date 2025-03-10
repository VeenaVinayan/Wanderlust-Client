import React, { useState} from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Bell, UserCircle, LayoutDashboard, Users,Search, Package2,
         BriefcaseBusiness,
         ChartAreaIcon,
         MessageCircleCode,
         LogOutIcon,
         ChevronDown } from 'lucide-react';

import { useDispatch } from 'react-redux';
import { resetUserData } from '../../features/authentication/userSlice';
import { adminLogout } from '../../services/Admin/Dashboard';

const DashboardLayout: React.FC = () => {
    //const navigate = useNavigate();
    const [isAgentsOpen, setIsAgentsOpen] = useState(false); 
    const dispatch = useDispatch();
    
    const handleLogout = () => {
                adminLogout();
                dispatch(resetUserData());
            };

                      
    return (
        <div className="flex h-screen ">
           {/* <aside className="w-72 text-white bg-black p-5 flex flex-col h-full">
             <h1 className=" text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                   Wanderlust
             </h1>
                <hr className="w-full border-t-2 border-gray-50 mt-2 mb-5 " />
                <nav className="flex flex-col space-y-4">
                    <NavLink to="/admin/adminDashboard" className={({isActive}) => `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-500 transition-colors"}`}>
                        <LayoutDashboard className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Dashboard</span>
                    </NavLink>
                    <NavLink to="users" className={({isActive}) => `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors" }`} >
                        <Users className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Users</span>
                    </NavLink>
                    <NavLink to="agents" className={({isActive}) => `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors" }` }>
                        <BriefcaseBusiness className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Agents</span>
                    </NavLink>
                    <NavLink to="category" className={({isActive}) =>`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors"} `}>
                        <Package2 className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Category</span>
                    </NavLink>
                    <NavLink to="category" className={({isActive}) =>`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors"} `}>
                        <Package2 className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Packages</span>
                    </NavLink>
                    <NavLink to="/settings" className={({isActive}) =>`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors"} `}>
                        <MessageCircleCode className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Notifications</span>
                    </NavLink>
                    <NavLink to="/settings" className={({isActive}) =>`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors"} `}>
                        <ChartAreaIcon className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Chat</span>
                    </NavLink>
                    <NavLink to="/login" className={({isActive}) =>`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive && "bg-gray-700 transition-colors"} `}
                            onClick={handleLogout}  >
                        <LogOutIcon className="w-5 h-5 text-gray-200" />
                        <span className="text-sm">Logout</span>
                    </NavLink>
                </nav>
            </aside>
             */}
    <aside className="w-72 text-white bg-black p-5 flex flex-col">
      <h1 className="text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Wanderlust
      </h1>
      <hr className="w-full border-t-2 border-gray-50 mt-2 mb-5" />
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/admin/adminDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-500 transition-colors"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Dashboard</span>
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-700 transition-colors"
            }`
          }
        >
          <Users className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Users</span>
        </NavLink>
        <div>
          <button
            onClick={() => setIsAgentsOpen(!isAgentsOpen)}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <BriefcaseBusiness className="w-5 h-5 text-gray-200" />
              <span className="text-sm">Agents</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-200 transition-transform ${
                isAgentsOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {isAgentsOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink
                to="/admin/adminDashboard/agentView"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm rounded-lg hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Agent View
              </NavLink>
              <NavLink
                to="/admin/adminDashboard/verification"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm rounded-lg hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Verification
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="category"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-700 transition-colors"
            }`
          }
        >
          <Package2 className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Category</span>
        </NavLink>
        <NavLink
          to="packages"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-700 transition-colors"
            }`
          }
        >
          <Package2 className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Packages</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-700 transition-colors"
            }`
          }
        >
          <MessageCircleCode className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Notifications</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-700 transition-colors"
            }`
          }
        >
          <ChartAreaIcon className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Chat</span>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              isActive && "bg-gray-700 transition-colors"
            }`
          }
          onClick={handleLogout}
        >
          <LogOutIcon className="w-5 h-5 text-gray-200" />
          <span className="text-sm">Logout</span>
        </NavLink>
      </nav>
    </aside>
    <div className="flex-1 flex flex-col h-full">
         <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
                  <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                 <div className="relative flex items-center">
                    <Search className="absolute left-4 w-6 h-6 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-80 bg-gray-100 text-gray-700 pl-12 pr-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg"
                     />
                </div>
                    <div className="flex items-center space-x-4">
                        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
                        {
                            localStorage.username ? (
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden
                                bg-gray-300 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-700 ">
                                  <span className="text-white  text-3xl">
                                  {  localStorage?.username?.charAt(0).toUpperCase() }
                                  </span>
                               </div>
                            ):(
                                <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
                            )
                        }
                       
                    </div>
                </header>

                {/* Main Content Box */}
                <main className="flex-1 p-6  overflow-y-auto bg-gray-50">
                    
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <Outlet /> 
                    </div>
                </main>
               
                <footer className="bg-gray-600 text-white p-4 text-center mt-6">
                    <p>&copy; 2025 Wanderlust, Inc. All rights reserved.</p>
                </footer>
                </div>
        </div>
    );
};

export default DashboardLayout;

// import React, { useState } from 'react';
// import { Outlet, NavLink } from 'react-router-dom';
// import { Bell, UserCircle, LayoutDashboard, Users, Search, Package2, BriefcaseBusiness, ChartAreaIcon, MessageCircleCode, LogOutIcon, Menu, X } from 'lucide-react';
// import { adminLogout } from '../../services/Admin/Dashboard';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { resetUserData } from '../../features/authentication/userSlice';

// const DashboardLayout: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     const handleLogout = () => {
//         adminLogout();
//         dispatch(resetUserData());
//         navigate("/login", { replace: true });
//     };

//     return (
//         <div className="fixed top-0 left-0 h-screen w-64 bg-gray-100 shadow-lg">
//             {/* Sidebar */}
//             <aside className={`fixed lg:relative inset-y-0 left-0 z-20 transform lg:translate-x-0 transition-transform duration-300 ease-in-out 
//                 bg-black text-white w-72 p-5 h-full flex flex-col ${sidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"}`}>
//                 {/* Close Button (Mobile) */}
//                 <button 
//                     className="absolute top-4 right-4 text-white lg:hidden" 
//                     onClick={() => setSidebarOpen(false)}
//                 >
//                     <X className="w-6 h-6" />
//                 </button>

//                 <h1 className="text-3xl text-center font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
//                     Wanderlust
//                 </h1>
//                 <hr className="w-full border-t-2 border-gray-50 mt-2 mb-5" />

//                 {/* Navigation */}
//                 <nav className="flex flex-col space-y-4">
//                     {[
//                         { path: "/admin/adminDashboard", icon: LayoutDashboard, label: "Dashboard" },
//                         { path: "users", icon: Users, label: "Users" },
//                         { path: "agents", icon: BriefcaseBusiness, label: "Agents" },
//                         { path: "category", icon: Package2, label: "Category" },
//                         { path: "packages", icon: Package2, label: "Packages" },
//                         { path: "/settings", icon: MessageCircleCode, label: "Notifications" },
//                         { path: "/chat", icon: ChartAreaIcon, label: "Chat" },
//                     ].map(({ path, icon: Icon, label }) => (
//                         <NavLink key={path} to={path} className={({ isActive }) =>
//                             `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors 
//                             ${isActive ? "bg-gray-500" : ""}`
//                         }>
//                             <Icon className="w-5 h-5 text-gray-200" />
//                             <span className="text-sm">{label}</span>
//                         </NavLink>
//                     ))}

//                     {/* Logout */}
//                     <button 
//                         onClick={handleLogout}
//                         className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors w-full text-left"
//                     >
//                         <LogOutIcon className="w-5 h-5 text-gray-200" />
//                         <span className="text-sm">Logout</span>
//                     </button>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col h-full">
//                 {/* Navbar */}
//                 <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
//                     {/* Mobile Menu Button */}
//                     <button 
//                         className="lg:hidden text-gray-600" 
//                         onClick={() => setSidebarOpen(true)}
//                     >
//                         <Menu className="w-6 h-6" />
//                     </button>

//                     {/* Search Bar */}
//                     <div className="relative flex items-center w-full max-w-md mx-auto">
//                         <Search className="absolute left-4 w-6 h-6 text-gray-500" />
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="w-full bg-gray-100 text-gray-700 pl-12 pr-4 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg"
//                         />
//                     </div>

//                     {/* Icons */}
//                     <div className="flex items-center space-x-4">
//                         <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
//                         {localStorage.username ? (
//                             <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden
//                                 bg-gray-300 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-700">
//                                 <span className="text-white text-3xl">
//                                     {localStorage?.username?.charAt(0).toUpperCase()}
//                                 </span>
//                             </div>
//                         ) : (
//                             <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
//                         )}
//                     </div>
//                 </header>

//                 {/* Main Content Box */}
//                 <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
//                     <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//                         <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//                     </div>
//                     <div className="bg-white shadow-lg rounded-lg p-6">
//                         <Outlet />
//                     </div>
//                 </main>

//                 {/* Footer */}
//                 <footer className="bg-gray-600 text-white p-4 text-center mt-6">
//                     <p>&copy; 2025 Wanderlust, Inc. All rights reserved.</p>
//                 </footer>
//             </div>
//         </div>
//     );
// };
// export default DashboardLayout;
