import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { UserData } from '../../../types/userTypes';
import { toast } from 'react-toastify';
import { resetUserData } from '../../../features/authentication/userSlice';
import { Home, Search, Menu, X } from 'lucide-react';
import NotificationBell from '../../Notification/NotificationBell';
import { logoutUser } from '../../../services/Auth/Auth';
import { useChatContext } from '../../../context/chatContext';
import { useSocket } from '../../../context/SocketContext';

const Header: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const [user, setUserData] = useState<UserData>();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearChatState } = useChatContext();
  const { socket } = useSocket();

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res) {
        dispatch(resetUserData());
        clearChatState();
        socket?.off();
        socket?.disconnect();
        toast.success('Logout Successfully');
        navigate('/login');
      } else {
        toast.error('Logout Failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-800 via-pink-700 to-red-800 text-transparent bg-clip-text">
          Wanderlust
        </h1>
      </Link>
      <div className="hidden md:flex items-center gap-4">
        <Link to="/" className="text-gray-600 hover:text-black">
          <Home size={20} />
        </Link>
        <Link to="/user/search" className="text-gray-600 hover:text-black">
          <Search size={20} />
        </Link>

        {!user?.isAuthenticated ? (
          <Link
            to="/login"
            className="border border-gray-400 text-gray-600 font-semibold px-4 py-2 rounded-lg hover:border-pink-500 hover:text-pink-500 transition-all duration-300 shadow-sm"
          >
            Login
          </Link>
        ) : (
          <>
            <NotificationBell />
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center text-white font-semibold text-lg rounded-full bg-gradient-to-t from-purple-600 via-pink-800 to-red-900"
              >
                {user?.name.charAt(0)}
              </button>

              {isOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 text-gray-700 text-sm z-20">
                  <li className="px-3 py-2 hover:bg-gray-100 font-semibold rounded-t-md">
                    Hi, {user.name}
                  </li>

                  {["Admin", "Agent"].includes(user.role) ? (
                    <li
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/${user.role.toLowerCase()}/${user.role.toLowerCase()}Dashboard/`);
                        setIsOpen(false);
                      }}
                    >
                      Dashboard
                    </li>
                  ) : (
                    <>
                      <li
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate('/user/userProfile/');
                          setIsOpen(false);
                        }}
                      >
                        Profile
                      </li>
                      <li
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-b-md"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-4 w-56 bg-white shadow-xl rounded-lg z-40 p-4 md:hidden">
          <Link to="/" className="flex items-center gap-2 text-gray-700 mb-3">
            <Home size={18} /> Home
          </Link>
          <Link to="/user/search" className="flex items-center gap-2 text-gray-700 mb-3">
            <Search size={18} /> Search
          </Link>

          {!user?.isAuthenticated ? (
            <Link
              to="/login"
              className="block text-center border border-gray-400 text-gray-600 font-semibold px-4 py-2 rounded-lg hover:border-pink-500 hover:text-pink-500 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <div className="text-gray-700 mb-2 font-semibold">Hi, {user.name}</div>
              {["Admin", "Agent"].includes(user.role) ? (
                <button
                  className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    navigate(`/${user.role.toLowerCase()}/${user.role.toLowerCase()}Dashboard/`);
                    setMenuOpen(false);
                  }}
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <button
                    className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      navigate('/user/userProfile/');
                      setMenuOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
