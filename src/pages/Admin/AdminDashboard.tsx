import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import NotificationBell from '../../components/Notification/NotificationBell';
import {
  LayoutDashboard,
  Users,
  Package2,
  BriefcaseBusiness,
  LogOutIcon,
  ChevronDown,
  BookAIcon,
  Menu,
  X
} from 'lucide-react';

import { useDispatch } from 'react-redux';
import { resetUserData } from '../../features/authentication/userSlice';
import { adminLogout } from '../../services/Admin/Dashboard';
import { logoutUser } from '../../services/Auth/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    adminLogout();
     dispatch(resetUserData());
     const res = await logoutUser();
    if (res) {  
      toast.success('Logout Successfully');
      navigate('/login');
    } else {
      toast.error('Logout Failed');
    } 
  };
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navItems = [
    { to: '.', label: 'Dashboard', icon: LayoutDashboard },
    { to: 'users', label: 'Users', icon: Users },
    { to: 'category', label: 'Category', icon: Package2 },
    { to: 'packages', label: 'Packages', icon: Package2 },
    { to: 'booking', label: 'Bookings', icon: BookAIcon },
   ];

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 bg-gray-100 relative">
              <button
                  className="md:hidden p-2 m-2 text-gray-700 z-30"
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
                {isSidebarOpen && (
                  <div
                    className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                  />
                )}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white z-40 flex flex-col p-6">
        <h1 className="text-3xl font-extrabold text-center mb-1 bg-gradient-to-r from-green-400 via-teal-500 to-gray-300 text-transparent bg-clip-text">
          Wanderlust
        </h1>
        <hr className="mb-6 mx-auto  border-t-2 border-emerald-100 rounded " />
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-green-300 to-gray-600 shadow-md'
                    : 'hover:bg-gray-800'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
       
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
            className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg bg-teal-500 hover:bg-gray-400 transition text-white"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-5 h-5" />
            <span className='font-bold text-gray-50'>Logout</span>
          </NavLink>
        </nav>
      </aside>
      <div className="ml-64 flex flex-col w-full h-full">
        <header className="h-16 bg-white shadow-sm border-b px-6 flex items-center justify-between fixed top-0 left-64 right-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden">
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-200 via-teal-500 to-gray-400 text-white flex items-center justify-center font-bold text-lg">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gray-100 px-6 py-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Outlet />
          </div>
        </main>
       </div> 
      </div>
      </div> 
    );
};
export default DashboardLayout;

