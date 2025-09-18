import { RootState } from '../../app/store';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserData } from '../../types/userTypes';
import { resetUserData } from '../../features/authentication/userSlice';
import { toast } from 'react-toastify' ;
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apiStore/authApi';

const Navbar: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.userData);
  const [user, setUserInfo] = useState<UserData>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() =>{
    setUserInfo(userInfo);
  },[userInfo]);

  const handleLogout = async () => {
    try{
      const response = await axiosInstance.post('/logout');
      if(response.status === 200){
        localStorage.removeItem("User_accessToken");
        dispatch(resetUserData());
        toast.success('Logout Succesfully');
        navigate("/login");
      }
   }catch(err){
       console.error(err);
    }
  }
  return (
    <nav className="bg-white shadow-md w-100 top-0">
      <div
        className="container mx-auto flex items-center justify-between  
        bg-gradient-to-r from-gray-300 to-black-500 shadow-md"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700 
              text-3xl font-extrabold tracking-wide font-[Poppins]"
            >
              Wanderlust
            </a>
          </div>
        </div>
        <div className="text-gray-800 font-medium flex items-center space-x-4">
          <a
            href="/"
            className="px-4 py-2 hover:text-gray-600 transition duration-300"
          >
            <span className="text-gray-900">Home</span>
         </a>
        {user?.isAuthenticated ? (
            <div className="relative">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden
             bg-gray-300 rounded-full " onClick={() =>setIsDropdownOpen(!isDropdownOpen)}>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-4xl font-abold tracking-wide">
               {  user?.name?.charAt(0).toUpperCase() }
               </span>
            </div>
             { isDropdownOpen && (
                <div
                  id="userDropdown"
                  className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 
                  rounded-lg w-44 bg-gradient-to-r from-gray-300 to-yellow-500 shadow-md"
                >
                  <div className="px-4 py-3 text-sm text-amber-50 dark:text-grey">
                    <div>{user?.name}</div>
                    <div className="font-medium truncate text-amber-50">{user?.email}</div>
                  </div>
                  <div className="py-1">
                    <a
                      className="block px-4 py-2 text-sm text-amber-50 
                      hover:bg-gray-100 dark:hover:bg-gray-300 dark:text-amber-50 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                    </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="px-4 py-2 hover:text-gray-600 transition duration-300"
              >
                <span className="text-gray-900">Login</span>
              </a>
              <a
                href="/register"
                className="px-4 py-2 hover:text-gray-600 transition duration-300"
              >
                <span className="text-gray-900">Register</span>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
