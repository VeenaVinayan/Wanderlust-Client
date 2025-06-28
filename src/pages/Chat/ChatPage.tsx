import React, { useEffect } from "react";
import UserList from "../../components/Chat/UserList";
import ChatBox from "../../components/Chat/ChatBox";
import Header from '../../components/layout/Shared/Header';
import { useLocation } from 'react-router-dom';
import { getAgentDetails } from "../../services/Chat/ChatService";
import { TChatUser } from "../../types/chatTypes";
import { useChatContext } from "../../context/chatContext";

const ChatPage: React.FC = () => {
  const { selectedUser, addUserToChatList } = useChatContext();
  const currentUserId = localStorage.getItem("userId")!;
  const location = useLocation();
  const agentId = location.state;

  useEffect(() => {
    const init = async () => {
      if (agentId) {
        const res = await getAgentDetails(agentId);
        if (res?.data) {
          const user: TChatUser = {
            _id: res.data._id,
            name: res.data.name,
          };
          addUserToChatList(user);
        }
      }
    };
    init();
  }, [agentId]);

  return (
    <div className="flex min-h-screen bg-gray-100 mt-12 flex-col">
      <Header />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r shadow-md">
          <div className="p-4 border-b bg-gradient-to-r from-red-900 to-purple-900 text-white font-bold text-lg">
            💬 Chats
          </div>
          <UserList />
        </div>
        <div className="flex-1 flex flex-col p-2 md:p-4">
          {selectedUser ? (
            <div className="flex flex-col flex-1 bg-white rounded-lg shadow-lg p-2 md:p-4 overflow-hidden">
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
    </div>
  );
};

export default ChatPage;
