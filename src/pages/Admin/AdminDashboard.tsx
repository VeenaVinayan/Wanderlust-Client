import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NotificationBell from '../../components/Notification/NotificationBell';
import {
  LayoutDashboard, Users, Package2,
  BriefcaseBusiness, LogOutIcon, ChevronDown,
  BookAIcon, Menu, X
} from 'lucide-react';
import { resetUserData } from '../../features/authentication/userSlice';
import { adminLogout } from '../../services/Admin/Dashboard';
import { logoutUser } from '../../services/Auth/Auth';
import { toast } from 'react-toastify';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAgentsOpen, setAgentsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
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

  const navItems = [
    { to: '.', label: 'Dashboard', icon: LayoutDashboard },
    { to: 'users', label: 'Users', icon: Users },
    { to: 'category', label: 'Category', icon: Package2 },
    { to: 'packages', label: 'Packages', icon: Package2 },
    { to: 'booking', label: 'Bookings', icon: BookAIcon },
  ];

  return (
    <div className="flex min--screen bg-gray-100">
      <aside className={`
        fixed inset-y-0 left-0 bg-black text-white w-64 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-40
      `}>
        <div className="flex flex-col p-6 h-full">
          <h1 className="text-3xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-400 via-teal-500 to-gray-300 text-transparent bg-clip-text">
            Wanderlust
          </h1>
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive ? 'bg-teal-700' : 'hover:bg-gray-800'
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
                onClick={() => setAgentsOpen(!isAgentsOpen)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="w-5 h-5" />
                  <span>Agents</span>
                </div>
                <ChevronDown className={`w-4 h-4 transform ${isAgentsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAgentsOpen && (
                <div className="ml-6 mt-1 space-y-1 text-sm">
                  <NavLink to="agentView" className="block px-3 py-2 rounded hover:bg-gray-700">Agent View</NavLink>
                  <NavLink to="verification" className="block px-3 py-2 rounded hover:bg-gray-700">Verification</NavLink>
                </div>
              )}
            </div>

            <button
              className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg bg-teal-500 hover:bg-teal-400 transition"
              onClick={handleLogout}
            >
              <LogOutIcon className="w-5 h-5" />
              <span className="font-bold">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md sticky top-0 z-20 w-full">
          <button className="md:hidden p-2 text-gray-700" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-lg md:text-xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-green-200 via-teal-500 to-gray-400 rounded-full flex items-center justify-center font-bold text-white text-sm md:text-base">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 px-3 sm:px-6 lg:px-5 mt-4">
          <div className="min-h-[calc(100vh-160px)] bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
