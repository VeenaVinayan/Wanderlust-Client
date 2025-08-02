import React ,{ useState } from 'react';
import { useChatContext } from '../../context/chatContext';
import { TChatUser } from '../../types/chatTypes';

const UserList: React.FC = () => {
  const { chatUsers, selectUser } = useChatContext();
  const [ activeUser, setActiveUser ] = useState<TChatUser>();
  const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
  };
  const setSelectedUser = (user :  TChatUser) =>{
           selectUser(user);
           setActiveUser(user)
  }
  return (
    // <div className="p-1 space-y-1 overflow-y-auto max-h-[calc(100vh-6rem)]">
    //   {chatUsers.length > 0 ? (
    //     <ul className="space-y-2">
    //       {chatUsers.map((user) => (
    //         <li
    //           key={user.id}
    //           onClick={() => setSelectedUser(user)}
    //           className={`cursor-pointer transition hover:scale-[1.01] active:scale-100 px-4 py-2 rounded-md ${
    //                       activeUser?.id === user.id? 'bg-teal-200' : ''
    //            }`}>
    //         <div className="flex items-center justify-between p-1 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 group cursor-pointer">
    //         <div className="flex items-center justify-between w-full px-1 py-1 hover:bg-gray-50 rounded-md cursor-pointer">
    //         <div className="flex items-center gap-4 overflow-hidden">
    //          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white font-semibold text-lg shadow-inner">
    //             {user.name.charAt(0).toUpperCase() ?? 'Q'}
    //             {user.unreadCount > 0 && (
    //               <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-white text-[10px] shadow-md">
    //                 {user.unreadCount}
    //               </span>
    //             )}
    //           </div>
    //           <div className="flex flex-col overflow-hidden">
    //             <span className="text-gray-900 font-medium text-sm md:text-base">
    //               {user.name}
    //             </span>
    //             {user.lastMessage && (
    //             <span className="text-gray-500 text-xs md:text-sm truncate max-w-[200px]">
    //               {user.lastMessage}
    //             </span>
    //             )}
    //           </div>
    //         </div>
    //     </div>
    //     <div className="ml-2 text-right">
    //       { user.lastMessageTime && ( 
    //         <span className="text-gray-400 text-[10px] md:text-xs font-light">
    //          {isToday(new Date(user.lastMessageTime))
    //               ? new Date(user.lastMessageTime).toLocaleTimeString([], {
    //                   hour: '2-digit',
    //                   minute: '2-digit',
    //                   hour12: false, 
    //                 })
    //               : new Date(user.lastMessageTime).toLocaleDateString([], {
    //                   month: 'short',
    //                   day: 'numeric',
    //                 })}
    //           </span>
    //          )}
    //         </div>
    //       </div>
    //     </li>
    //   ))}
    //  </ul>
    // ) : (
    //  <div className="text-center text-gray-400 text-sm py-4">
    //        No chats yet!
    //  </div>
    //   )}
    // </div>
    <div className="p-1 md:p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-6rem)]">
  {chatUsers.length > 0 ? (
    <ul className="space-y-2">
      {chatUsers.map((user) => (
        <li
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className={`cursor-pointer transition hover:scale-[1.01] active:scale-100 px-2 md:px-4 py-2 rounded-md ${
            activeUser?.id === user.id ? 'bg-teal-100' : ''
          }`}
        >
          <div className="flex items-center justify-between p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200">
            <div className="flex items-center gap-3 w-full overflow-hidden">
              {/* Avatar and unread badge */}
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-teal-600 text-white font-semibold text-lg">
                {user.name.charAt(0).toUpperCase() ?? 'Q'}
                {user.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] shadow">
                    {user.unreadCount}
                  </span>
                )}
              </div>

              {/* Name and last message */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm md:text-base font-medium text-gray-900 truncate">
                  {user.name}
                </span>
                {user.lastMessage && (
                  <span className="text-xs md:text-sm text-gray-500 truncate max-w-[180px] sm:max-w-[250px]">
                    {user.lastMessage}
                  </span>
                )}
              </div>

              {/* Time */}
              {user.lastMessageTime && (
                <div className="text-right whitespace-nowrap pl-2">
                  <span className="text-[10px] md:text-xs text-gray-400 font-light">
                    {isToday(new Date(user.lastMessageTime))
                      ? new Date(user.lastMessageTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                      : new Date(user.lastMessageTime).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="text-center text-gray-400 text-sm py-6">No chats yet!</div>
  )}
</div>

  );
};

export default UserList;

