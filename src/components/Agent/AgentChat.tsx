
import React from 'react';
import ChatBox from '../Chat/ChatBox';
import UserList from '../Chat/UserList';
import { useChatContext } from '../../context/chatContext';

const AgentChat: React.FC = () => {
  const { selectedUser } = useChatContext();
  const currentUserId = localStorage.getItem("userId")!;

  return (
    // <>
    //  <div className='flex flex-row'>
    //    <div
    //     className={`flex flex-col transition-all duration-300
    //     ${selectedUser ? 'hidden md:flex' : 'flex'} 
    //     w-full md:w-1/3 lg:w-1/4 bg-white border-r shadow-lg`}
    //   >
    //     <div className="p-4 bg-gradient-to-r from-purple-900 to-teal-800 text-white text-xl font-bold shadow-md">
    //       💬 Chats
    //     </div>
    //     <div className="flex-1 overflow-y-auto custom-scrollbar">
    //       <UserList />
    //     </div>
    //   </div>

    //   <div className="flex-1 flex flex-col">
    //     {selectedUser ? (
    //       <div className="flex-1 flex flex-col m-3 md:m-6 bg-white rounded-2xl shadow-2xl overflow-hidden">
    //         <ChatBox
    //           currentUserId={currentUserId}
    //           selectedUserId={selectedUser.id}
    //         />
    //       </div>
    //     ) : (
    //       <div className="flex-1 flex items-center justify-center px-4 text-center text-gray-600">
    //         <div className="space-y-2">
    //           <h2 className="text-2xl font-semibold">Welcome to Agent Chat</h2>
    //           <p className="text-sm">Please select a user from the chat list to start a conversation 💬</p>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    // </>
    <>
  <div className="flex flex-col md:flex-row h-[calc(100vh-100px)]">
    <div
      className={`transition-all duration-300
        ${selectedUser ? 'hidden md:flex' : 'flex'} 
        w-full md:w-1/3 lg:w-1/4 bg-white border-r shadow-lg flex-col`}
    >
      <div className="p-4 bg-gradient-to-r from-purple-900 to-teal-800 text-white text-xl font-bold shadow-md">
        💬 Chats
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <UserList />
      </div>
    </div>
    <div className="flex-1 flex flex-col">
      {selectedUser ? (
        <div className="flex-1 flex flex-col m-2 sm:m-4 md:m-6 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <ChatBox
            currentUserId={currentUserId}
            selectedUserId={selectedUser.id}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 text-center text-gray-600">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Welcome to Agent Chat</h2>
            <p className="text-sm">
              Please select a user from the chat list to start a conversation 💬
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</>
);
};

export default AgentChat;
