import React , {useState, useEffect }from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { UserData } from '../../../types/userTypes';
import { toast } from 'react-toastify';
import { resetUserData } from '../../../features/authentication/userSlice';
import { Home, Search } from 'lucide-react';
import NotificationBell from '../../Notification/NotificationBell';
import { logoutUser } from '../../../services/Auth/Auth';
import { useChatContext } from '../../../context/chatContext';
import { useSocket } from '../../../context/SocketContext';

const Header : React.FC= () => {
  const userData = useSelector( (state: RootState) => state.userData );
  const [ user, setUserData ] = useState<UserData>();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearChatState } = useChatContext();
  const { socket } = useSocket();
  useEffect(() =>{
       setUserData(userData);
  },[userData]);
  const handleLogout = async () => {
    try{
        console.log("Logout user !!");
        const res = await logoutUser();
        if(res){
           dispatch(resetUserData());
           clearChatState();
           socket?.off();
           socket?.disconnect();
           toast.success('Logout Succesfully');
           navigate('/login');
        }else{
            toast.error('Logout Failed');
        }
    }catch(err){
       console.error(err);
    }
  }
  return (
    // <>
    //     <header className="text-white p-4  flex justify-between items-center fixed top-0 left-0 w-full z-20 text-xl shadow-lg ">
    //     <Link to="/" className="flex items-center gap-2">
    //         <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-800 via-pink-700 to-red-800 text-transparent bg-clip-text">
    //           Wanderlust
    //         </h1>
    //         <div className=" my-6">
    //            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-0 to-transparent"></div>
    //           </div> 
    //       </Link>
    //       <div className='flex items-center gap-4' >
    //       <Link to='/' className='justify-end'>
    //          <Home size={20} color={'Gray'} />
    //       </Link>
    //       <Link to='/user/search' className='justify-end'>
    //         <Search size={20} color={'Gray'}/>
    //       </Link>
    //       { (!user?.isAuthenticated )? ( 
    //       <Link 
    //             to="/login"
    //             className="border border-gray-400 text-gray-400 font-bold px-4 py-2 rounded-lg 
    //                 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 shadow-md"
    //                  >
    //             Login
    //        </Link>
    //       ) : (
    //         <> 
    //         <NotificationBell />
    //         <div className="relative">
    //         <button
    //           onClick={() => setIsOpen(!isOpen)}
    //           className="w-10 h-10 flex items-center justify-center text-white font-semibold text-lg rounded-full bg-gradient-to-t from-purple-600 via-pink-800 to-red-900"
    //         >
    //           {user?.name.charAt(0)}
    //         </button>
    //         {isOpen && (
    //          <ul className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-1 text-gray-700 text-sm">
    //          <li className="px-3 py-2 hover:bg-gray-100 text-bold rounded-t-md"> Hi, {user.name}</li>
    //          <li className="px-3 py-2 hover:bg-gray-100 text-bold cursor-pointer" onClick={() => navigate('/user/userProfile/')}> Profile</li>
    //          <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-b-md" onClick={handleLogout}>Logout</li>
    //        </ul>
    //       )}
    //       </div>
    //       </>
    //    ) }
    //   </div>
    //  </header> 
        
    // </>
    <>
  <header className="bg-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-20 text-xl shadow-md">
    <Link to="/" className="flex items-center gap-2">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-800 via-pink-700 to-red-800 text-transparent bg-clip-text">
        Wanderlust
      </h1>
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-4">
      <Link to="/" className="flex justify-end">
        <Home size={20} color={'Gray'} />
      </Link>
      <Link to="/user/search" className="flex justify-end">
        <Search size={20} color={'Gray'} />
      </Link>
      {!user?.isAuthenticated ? (
        <Link
          to="/login"
          className="border border-gray-400 text-gray-400 font-bold px-4 py-2 rounded-lg 
                hover:border-pink-500 hover:text-pink-500 transition-all duration-300 shadow-md"
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
              <ul className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-1 text-gray-700 text-sm">
                <li className="px-3 py-2 hover:bg-gray-100 font-semibold rounded-t-md">Hi, {user.name}</li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer font-semibold"
                  onClick={() => navigate('/user/userProfile/')}
                >
                  Profile
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-b-md"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </div>

    {/* Mobile Menu Toggle */}
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>
  </header>

  {/* Mobile Dropdown Menu */}
  {isOpen && (
    <div className="md:hidden bg-white shadow-md mt-[72px] p-4 text-gray-700 text-base space-y-2 fixed w-full z-10">
      <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
        <Home size={20} color={'Gray'} />
        <span>Home</span>
      </Link>
      <Link to="/user/search" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
        <Search size={20} color={'Gray'} />
        <span>Search</span>
      </Link>
      {!user?.isAuthenticated ? (
        <Link
          to="/login"
          className="block border border-gray-400 text-gray-500 font-bold px-4 py-2 rounded-lg 
            hover:border-pink-500 hover:text-pink-500 transition duration-300"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      ) : (
        <>
          <NotificationBell />
          <div className="text-sm">
            <div className="py-1">Hi, {user.name}</div>
            <div
              className="py-1 cursor-pointer"
              onClick={() => {
                navigate('/user/userProfile/');
                setIsOpen(false);
              }}
            >
              Profile
            </div>
            <div
              className="py-1 cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              Logout
            </div>
          </div>
        </>
      )}
    </div>
  )}
</>

  )
}

export default Header;
