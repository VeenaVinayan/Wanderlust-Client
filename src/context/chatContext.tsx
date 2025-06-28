import React, { createContext, useContext, useState, useEffect } from "react";
import { getChatUsers, getMessages } from '../services/Chat/ChatService'; 
import { TChatUser, TMessage, TChatContextType } from '../types/chatTypes';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const ChatContext = createContext<TChatContextType | null>(null);
export const useChatContext = () => useContext(ChatContext)!;

export const ChatProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({
  userId,
  children,
}) => {
  const [chatUsers, setChatUsers] = useState<TChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<TChatUser | null>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const { role } = useSelector((state : RootState) => state.userData);
  console.log("Role of user ::",role);
  useEffect(() => {
    console.log('Agent User ::',userId);
    if(!userId) return;
    const loadChats = async () => {
      const data = await getChatUsers(userId,role); 
      setChatUsers(data.users);
    };
    loadChats();
  },[userId]);

  const selectUser = async (user: TChatUser) => {
    setSelectedUser(user);
    const data = await getMessages(userId, user._id,role);
    setMessages(data.messages);
  };

  const addUserToChatList = (newUser: TChatUser) => {
    const exists = chatUsers.find((u) => u._id === newUser._id);
    if (!exists) {
      setChatUsers((prev) => [...prev, newUser]);
    }
    selectUser(newUser);
  };

  return (
    <ChatContext.Provider
      value={{ chatUsers, selectedUser, messages, selectUser, addUserToChatList }}
    >
      {children}
    </ChatContext.Provider>
  );
};

