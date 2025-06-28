import React from 'react'
import ChatBox from '../Chat/ChatBox';
import UserList from '../Chat/UserList';
import { useChatContext } from '../../context/chatContext';

const AgentChat : React.FC = () => {
    const { selectedUser } = useChatContext();
    const currentUserId = localStorage.getItem("userId")!;  
  return (
    <>
      <div className="flex h-full w-full overflow-hidden">
  {/* Sidebar */}
  <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r shadow-md flex flex-col">
    <div className="p-4 border-b bg-gradient-to-r from-red-900 to-purple-900 text-white font-bold text-lg">
      💬 Chats
    </div>
    <div className="flex-1 overflow-y-auto">
      <UserList />
    </div>
  </div>

  {/* Chat Box */}
  <div className="flex-1 flex flex-col overflow-hidden">
    {selectedUser ? (
      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-lg m-2 p-2 md:p-4 overflow-hidden">
        <ChatBox
          currentUserId={currentUserId}
          selectedUserId={selectedUser._id}
        />
      </div>
    ) : (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Welcome to Chat</h2>
          <p>Select a user to start chatting 📩</p>
        </div>
      </div>
    )}
  </div>
</div>

    </>
  )
}

export default AgentChat

