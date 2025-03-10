import { RootState } from '../../../app/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { CircleUser } from 'lucide-react';

const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData)
  return (
     <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 gap-10 min-h-screen">
      {/* User Avatar */}
      <div className="flex flex-col items-center">
        <CircleUser color={'gray'} size={48} />
        <h2 className="text-2xl font-semibold mt-4">{}</h2>
        <p className="text-gray-500">{userData.email}</p>
        <p className="text-gray-500">{userData.name}</p>
      </div>
     
    </div>
  )
}

export default UserProfile;
