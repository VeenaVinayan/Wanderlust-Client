import React, { useEffect } from "react";
import UserList from "../../components/Chat/UserList";
import ChatBox from "../../components/Chat/ChatBox";
import { useLocation } from 'react-router-dom';
import { getChatUserDetails } from "../../services/Chat/ChatService";
import { TChatUser } from "../../types/chatTypes";
import { useChatContext } from "../../context/chatContext";

const UserChat: React.FC = () => {
  const { selectedUser, addUserToChatList } = useChatContext();
  const currentUserId = localStorage.getItem("userId")!;
  const location = useLocation();
  const agentId = location.state;
  useEffect(() => {
    const init = async () => {
      console.log(`SelectedUser --->${selectedUser} and Current Used Id :::${currentUserId}`)
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
        }
      }
    };
    init();
  }, [agentId]);
  return (
    <>
       <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 bg-white border-r border-gray-200 shadow-lg rounded-b-none md:rounded-r-2xl z-10">
         <div className="p-4 bg-teal-300 text-white text-xl font-semibold rounded-tr-none md:rounded-tr-2xl sticky top-0">
            💬 Chats
          </div>
           <div className="overflow-y-auto h-[calc(100vh-64px)] p-2">
            <UserList />
          </div>
        </div>
         <div className="flex-1 flex flex-col p-2 overflow-hidden">
          {selectedUser ? (
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                <ChatBox
                  currentUserId={currentUserId}
                  selectedUserId={selectedUser.id}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 text-center text-gray-600">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to WanderChat 👋</h2>
                <p className="text-gray-500">Select a user to start chatting 📩</p>
              </div>
            </div>
          )}
        </div>
      </div>
   </>
  );
};

export default UserChat;
