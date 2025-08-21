export type TChatUser = {
    id: string;
    name:string;
    lastMessageTime:Date;
    lastMessage:string;
    unreadCount:number;
}
export type TUserChat = {
   id:string;
   name:string;
}
export type TMessageDetails = {
   _id: string;
   messages:{
     sender:string;
     receiver:string;
     content: string;
     createdAt: string;
     isRead:boolean;
   }
}
export type TMessage = {
   sender:string;
   receiver:string;
   content:string;
   createdAt:Date;
   isRead:boolean;
}

export type TMessageSent = Omit<TMessage, 'createdAt' | 'isRead'>;

export type TChatContextType = {
  chatUsers: TChatUser[];
  setChatUsers: React.Dispatch<React.SetStateAction<TChatUser[]>>;
  selectedUser: TChatUser | null;
  messages: TMessage[];
  sortChatList: () => void;
  selectUser: (user: TChatUser) => void;
  addUserToChatList: (user: TChatUser) => void;
  clearChatState: ()=> void;
}
export type TVideoCall ={
   roomId:string;
}
