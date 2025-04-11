import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
  FaUser,
  FaWallet,
  FaBell,
  FaComment,
  FaVideo,
  FaHeart,
} from "react-icons/fa";
import { Edit2 } from 'lucide-react';
import Header from '../../components/layout/Shared/Header';
import Footer from '../../components/layout/Shared/Footer';
import { RootState } from "../../app/store";

export default function UserProfile() {
  const navItems = [
    { name: "Profile", icon: <FaUser />, to: "user" },
    { name: "Wallet", icon: <FaWallet />, to: "wallet" },
    { name: "Notifications", icon: <FaBell />, to: "notifications" },
    { name: "Chat", icon: <FaComment />, to: "chat" },
    { name: "Video Call", icon: <FaVideo />, to: "video-call" },
    { name: "Wishlist", icon: <FaHeart />, to: "wishlist" },
  ];
  const user = useSelector((state: RootState) => state.userData)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 mt-10 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-lg justify-center items-center p-5 fixed space-y-6">
        <div className="flex flex-col p-2">
         <div className="mt-4 text-center sm:text-left">
           <h5 className="text-2xl font-semibold text-gray-600">Hi , {user?.name}</h5>
         </div>
        </div>

          <hr/>
          <ul className="space-y-4">
            {navItems.map(({ name, icon, to }) => (
              <li key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-2 py-2 rounded-md transition-all duration-200 ${
                      isActive ? "text-blue-600 bg-blue-100" : "text-gray-700 hover:text-blue-500"
                    }`
                  }
                >
                  {icon} <span>{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-60">
         <div className="mt-6">
             <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
