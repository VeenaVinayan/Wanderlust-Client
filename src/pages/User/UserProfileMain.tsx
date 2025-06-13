import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
  FaUser,
  FaWallet,
  FaBell,
  FaComment,
  FaVideo,
  FaHeart,
  FaBook
} from "react-icons/fa";
import Header from '../../components/layout/Shared/Header';
import Footer from '../../components/layout/Shared/Footer';
import { RootState } from "../../app/store";

export default function UserProfile() {
  const navItems = [
    { name: "Profile", icon: <FaUser />, to: "." },
    { name: "Wallet", icon: <FaWallet />, to: "wallet" },
    { name: "Booking", icon: <FaBook />, to: "booking" },
    { name: "Notifications", icon: <FaBell />, to: "notifications" },
    { name: "Chat", icon: <FaComment />, to: "chat" },
    { name: "Video Call", icon: <FaVideo />, to: "video-call" },
    { name: "Wishlist", icon: <FaHeart />, to: "wishlist" },
  ];

  const user = useSelector((state: RootState) => state.userData);

  return (
    <>
      <div className="flex flex-col min-h-screen mt-10">
        <Header />

        <div className="flex flex-1 bg-gray-100">
          {/* Sidebar */}
          <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-lg p-5">
            <div className="text-center mb-6">
              <h5 className="text-2xl font-semibold text-gray-700">Hi, {user?.name}</h5>
            </div>
            <hr className="mb-6" />
            <ul className="space-y-3">
              {navItems.map(({ name, icon, to }) => (
                <li key={name}>
                  <NavLink
                    to={to}
                      className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                      }`
                    }
                  >
                    {icon} <span>{name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>

        <main className="flex-1 p-4 md:p-8 mt-7">
           <div className="min-h-[calc(100vh-200px)] bg-white rounded-lg shadow p-4 md:p-6">
             <div className="mt-4">
               <Outlet />
             </div>
           </div>
        </main>
       </div>
      <Footer />
     </div>
    </>
  );
}

