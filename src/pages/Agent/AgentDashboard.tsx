import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAgentData } from '../../features/authentication/AgentDataSlice';
import { Outlet, NavLink } from 'react-router-dom';

const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () =>{
      dispatch(resetAgentData());
      localStorage.removeItem("Agent_accessToken");
      navigate('/login');
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-20 flex items-center justify-center border-b">
          <h1 className=" text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Wanderlust
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <NavLink to="/agent/agentDashboard" className="bg-gray-200 rounded-2xl shadow-lg font-bold">
              <a href="#" className="flex items-center p-3 text-gray-500 hover:bg-blue-100 rounded-lg">
                🏠 Dashboard
              </a>
            </NavLink>
            <NavLink to="booking" className="bg-gray-200 rounded-2xl shadow-lg font-bold">
              <a href="#" className="flex items-center p-3 text-gray-500 hover:bg-blue-100 rounded-lg">
                📦 Bookings
              </a>
            </NavLink>
            <NavLink to="notification" className="bg-gray-200 rounded-2xl shadow-lg font-bold">
              <a href="#" className="flex items-center p-3 text-gray-500 hover:bg-blue-100 rounded-lg">
                📊 Notification
              </a>
            </NavLink>
            <NavLink to="package" className="bg-gray-200 rounded-2xl shadow-lg font-bold">
              <a href="#" className="flex items-center p-3 text-gray-500 hover:bg-blue-100 rounded-lg">
                📊 Package
              </a>
            </NavLink>
            <NavLink to="/login"className="bg-gray-200 rounded-2xl shadow-lg font-bold">
              <a  className="flex items-center p-3 text-gray-500 hover:bg-blue-100 rounded-lg"
                  onClick={handleLogout}>
                ⚙️ Logout
              </a>
            </NavLink>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Agent</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-4xl font-abold tracking-wide">
               {  "Riya".charAt(0).toUpperCase() }
               </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
            <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AgentDashboard;