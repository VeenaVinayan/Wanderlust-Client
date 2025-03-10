import { RootState } from '../../app/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserData } from '../../types/userTypes';

type Props ={
   role:string;
}
const MainBox : React.FC <Props>= ({role}) => {

const [user, setUser] = useState<UserData>();
const userInfo = useSelector((state: RootState) => state.userData);

useEffect(()=>{
   setUser(userInfo);
},[userInfo]);
return (
    <>
        <main className="flex-1 p-8">
        <div className="text-gray-800">
          <h2 className="text-4xl font-bold text-gray-700 drop-shadow-glow">Welcome {user?.name}</h2>
          <p className="text-xl font-serif italic text-gray-700 leading-relaxed">Here you can manage your data, view reports, and customize settings.</p>
        </div>
        <h1> {role}</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 transform scale-100 hover:scale-105 transition duration-300 ease-in-out shadow-lg hover:shadow-xl p-6 rounded-lg">Profile</h3>
            <p className="text-3xl font-bold text-amber-600"></p>
          </div>
          <div className="bg-white text-xl font-semi-bold text-gray-800 transform scale-100 hover:scale-105 transition duration-300 ease-in-out shadow-lg hover:shadow-xl p-6 rounded-lg">
            Trips
          </div>
          <div className="bg-white text-xl font-semi-bold text-gray-800 transform scale-100 hover:scale-105 transition duration-300 ease-in-out shadow-lg hover:shadow-xl p-6 rounded-lg">
            Wishlist
          </div>
        </div>
      </main>
    </>
  )
}

export default MainBox
