import React, { useEffect } from "react";
import UserList from "../../components/Chat/UserList";
import ChatBox from "../../components/Chat/ChatBox";
import { useLocation } from 'react-router-dom';
import { getChatUserDetails } from "../../services/Chat/ChatService";
import { TChatUser } from "../../types/chatTypes";
import { useChatContext } from "../../context/chatContext";

const UserChat: React.FC = () => {
  const { selectedUser, setSelectedUser, addUserToChatList } = useChatContext();
  const currentUserId = localStorage.getItem("userId")!;
  const location = useLocation();
  const agentId = location.state;
  useEffect(() => {
    const init = async () => {
       if (agentId) {
        const res = await getChatUserDetails(agentId);
        if (res?.data) {
          const user: TChatUser = {
            id: res.data.id,
            name: res.data.name,
            lastMessageTime:new Date(),
            lastMessage:'',
            unreadCount:0,
          };
          addUserToChatList(user);
          setSelectedUser(user);
        }
      }
    };
    init();
  }, [agentId]);
  return (
    <>
  <div className="flex flex-col md:flex-row h-[calc(100vh-100px)]">
    <div
      className={`transition-all duration-300
        ${selectedUser ? 'hidden md:flex' : 'flex'} 
        w-full md:w-1/3 lg:w-1/4 bg-white border-r shadow-lg flex-col`}
    >
      <div className="p-4 bg-teal-400 text-white text-xl font-bold shadow-md">
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

export default UserChat;
