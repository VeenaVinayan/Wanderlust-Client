export type TChatUser = {
    _id: string;
    name:string;
}

export type TMessage = {
    _id?: string;
    sender:string;
    receiver: string;
    content: string;
    createdAt?: string;
}

export type TChatContextType = {
  chatUsers: TChatUser[];
  selectedUser: TChatUser | null;
  messages: TMessage[];
  selectUser: (user: TChatUser) => void;
  addUserToChatList: (user: TChatUser) => void;
}
