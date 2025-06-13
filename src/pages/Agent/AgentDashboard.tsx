// export default AgentDashboard;
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAgentData } from "../../features/authentication/AgentDataSlice";
import { Outlet, NavLink } from "react-router-dom";

const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetAgentData());
    localStorage.removeItem("Agent_accessToken");
    navigate("/login");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Fixed) */}
      <aside className="w-64 bg-white shadow-md flex flex-col fixed top-0 left-0 h-full">
        <div className="h-20 flex items-center justify-center border-b">
          <h1 className="text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Wanderlust
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <NavLink
              to="/agent/agentDashboard"
              className="block p-3 bg-pink-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              🏠 Dashboard
            </NavLink>
            <NavLink
              to="bookingData"
              className="block p-3 bg-pink-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              📦 Bookings
            </NavLink>
            <NavLink
              to="notification"
              className="block p-3 bg-pink-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              🔔 Notifications
            </NavLink>
            <NavLink
              to="package"
              className="block p-3 bg-pink-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              🎁 Packages
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full block p-3  bg-pink-200 text-red-600 hover:bg-red-100 rounded-lg font-semibold text-left"
            >
              ⚙️ Logout
            </button>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header (Fixed) */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-[calc(100%-16rem)] top-0 left-64 z-10 h-16">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Agent</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-4xl font-bold tracking-wide">
              {"Riya".charAt(0).toUpperCase()}
            </span>
          </div>
        </header>

        {/* Content Area (No Scrollbar) */}
        <main className="flex-1 p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
