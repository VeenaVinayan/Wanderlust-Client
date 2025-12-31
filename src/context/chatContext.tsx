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
  const { id,role } = useSelector((state : RootState) => state.userData);
 
  useEffect(() => {
   let controller = new AbortController();  
  if (!userId || role === 'Admin' || chatUsers.length > 0) return;
  const loadChats = async () => {
    try{
       const  users  = await getChatUsers(userId, role,controller.signal);
       setChatUsers(users || []);
    }catch (err) {
       console.error("Failed to load chats", err);
    }
  };
  loadChats();
  return   () => { controller.abort();}
 },[userId, role, chatUsers.length]);

 const selectUser = async (user: TChatUser) => {
    setSelectedUser(user);
    const data = await getMessages(id, user.id,role);
    setChatUsers((prev) => (
      prev.map((u) =>
        u.id === user.id ? { ...u, unreadCount: 0 } : u
      ) 
    ));
    setMessages(data.messages);
  };

  const addUserToChatList = (newUser: TChatUser) => {
   setChatUsers((prev) => {
    const exists = prev.find((u) => u.id === newUser.id);
    if (exists) return prev;
    return [...prev, newUser];
  });
};
  const clearChatState = () =>{
     setChatUsers([]);
     setMessages([])
 }
 const sortChatList = () => {
  const sortedChatList = [...chatUsers].sort((a, b) =>
    new Date(b.lastMessageTime || 0).getTime() -
    new Date(a.lastMessageTime || 0).getTime()
  );
  setChatUsers(sortedChatList);
};
 return (
    <ChatContext.Provider
      value={{ chatUsers, setChatUsers, selectedUser, messages, selectUser, addUserToChatList,sortChatList ,clearChatState }}
    >
      {children}
    </ChatContext.Provider>
  );
};

