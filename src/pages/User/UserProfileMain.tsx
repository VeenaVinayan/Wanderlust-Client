import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import {
  FaUser,
  FaWallet,
  FaComment,
  FaHeart,
  FaBook,
} from "react-icons/fa";
import { X, Menu } from "lucide-react";
import Header from "../../components/layout/Shared/Header";
import Footer from "../../components/layout/Shared/Footer";
import { RootState } from "../../app/store";

const UserProfile: React.FC = () => {
  const navItems = [
    { name: "Profile", icon: <FaUser />, to: "profile" },
    { name: "Wallet", icon: <FaWallet />, to: "wallet" },
    { name: "Booking", icon: <FaBook />, to: "booking" },
    { name: "Chat", icon: <FaComment />, to: "chat" },
    { name: "Wishlist", icon: <FaHeart />, to: "wishlist" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userData);

  return (
    <>
      <div className="relative flex flex-col min-h-screen mt-10">
        <Header />
        <div className="flex flex-1 bg-gray-100 relative">
          <button
            className="md:hidden p-2 m-2 text-gray-700 z-30"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        <aside
            className={`fixed  top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-1 transform transition-transform duration-300 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 md:static md:flex md:flex-col`}
          >
            <div className="text-center mb-6 mt-10 md:mt-0">
              <h5 className="text-2xl font-semibold text-gray-700">
                Hi, {user?.name}
              </h5>
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
                    onClick={() => setIsOpen(false)}
                  >
                    {icon} <span>{name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex-1 p-4 sm:px-6 lg:px-8 mt-10">
            <div className="min-h-[calc(100vh-200px)] bg-white rounded-lg shadow p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;
