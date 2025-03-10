import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header : React.FC = () =>  {
    const navigate = useNavigate();
    const handleLogout = () =>{
        console.log('Inside Logout !');
        navigate('/login');
    }
  return (
    <>
       <header className="w-full bg-white shadow-md py-4 m-4 rounded-2xl">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-blue-600">
        <h1 className=" text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                   Wanderlust
        </h1>
        </div>
        <div 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition"
            onClick={handleLogout}
        >
        Logout
        </div>
      </nav>
    </header>
    </>
  )
}

export default Header

