
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { resetAgentData } from "../../features/authentication/AgentDataSlice";
import { Outlet, NavLink } from "react-router-dom";
import { resetUserData } from '../../features/authentication/userSlice';
import NotificationBell from "../../components/Notification/NotificationBell";
import { RootState } from "../../app/store";
import { logoutUser } from "../../services/Auth/Auth";
import { toast } from "react-toastify";
const AgentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agentSliceData);
  const handleLogout = async() => {
    dispatch(resetAgentData());
    dispatch(resetUserData());
    const res = await logoutUser();
    if (res) {
      toast.success("Logout Successfully");
      navigate('/login');
    } else {
      console.error('Logout failed');
    } 
 };

  return (
    <div className="flex min-h-screen bg-gray-100">
     <aside
        className={`bg-white shadow-md fixed top-0 left-0 z-30 h-full w-64 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-20 flex items-center justify-center border-b">
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-emerald-400 via-violet-300 to-gray-500 text-transparent bg-clip-text">
            Wanderlust
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <NavLink
              to="/agent/agentDashboard"
              className="block p-3 bg-emerald-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="bookingData"
              className="block p-3 bg-emerald-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              Bookings
            </NavLink>
            <NavLink
              to="package"
              className="block p-3 bg-emerald-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              Packages
            </NavLink>
            <NavLink
              to="chat"
              className="block p-3 bg-emerald-200 text-gray-600 hover:bg-blue-100 rounded-lg font-semibold"
            >
              Chats
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full block p-3 bg-emerald-200 text-gray-600 hover:bg-red-100 rounded-lg font-semibold text-left"
            >
              ⚙️ Logout
            </button>
          </ul>
        </nav>
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        <header className="fixed top-0 left-0 w-full md:left-64 md:w-[calc(100%-16rem)] h-16 z-20 bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-700 text-2xl focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block font-medium text-gray-700 tracking-wide">
            Welcome,{" "}
            <span className="font-semibold text-gray-600">
              {agent?.name}
            </span>
          </span>

          <NotificationBell />

          <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center">
            <span className="text-gray-700 text-lg font-semibold">
              {agent?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </header>
     <main className="flex-1 px-3 sm:px-6 lg:px-5 mt-4">
          <div className="min-h-[calc(100vh-220px)] bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
 export default AgentDashboard;



