
import React from 'react';
import { useChatContext } from '../../context/chatContext'; 

const UserList: React.FC = () => {
  const { chatUsers, selectUser } = useChatContext();

  return (
    <div>
     {chatUsers.length > 0 ? ( 
      <ul>
        {chatUsers.map((user) => (
          <li
            key={user._id}
            className="p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => selectUser(user)}
          >
            <div className="flex items-center gap-4 p-4 shadow-md rounded-lg bg-white hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-semibold text-lg shadow-inner bg-gradient-to-tr from-red-800 via-purple-850 to-teal-800">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-800 font-medium text-base">{user.name}</span>
            </div>
          </li>
        ))}
      </ul>
     ) : (
        <p className="text-gray-500 p-4">No Chats yet!</p>
     )}
    </div>
  );
};

export default UserList;
