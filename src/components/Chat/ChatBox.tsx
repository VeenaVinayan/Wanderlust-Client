import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../context/SocketContext";
import { useChatContext } from "../../context/chatContext";
import { TMessage,  TMessageSent } from "../../types/chatTypes";
import { VideoIcon } from "lucide-react";
import { setVideoCall } from "../../features/authentication/VideoCallAgent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
   currentUserId: string;
   selectedUserId: string;
}
const ChatBox: React.FC<Props> = ({ currentUserId, selectedUserId }) => {
  const { selectedUser, messages, setChatUsers } = useChatContext();
  const { socket } = useSocket();
  const [chatMessages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const agent = useSelector((state:RootState) => state.userData);
  selectedUserId = selectedUser!.id;
  const { role } = useSelector((state:RootState)=> state.userData)
  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

useEffect(() => {
  const handleReceive = async (message: TMessage) => {
      const isCurrentChat =
      selectedUserId &&
      ((message.sender === selectedUserId && message.receiver === currentUserId) ||
        (message.sender === currentUserId && message.receiver === selectedUserId));
   
     setChatUsers((prev) => {
      const updated = prev.map((user) => {
        const isInvolved = user.id === message.sender || user.id === message.receiver;
        const isReceiver = message.receiver === currentUserId && user.id === message.sender;

        if (!isInvolved) return user;

        return {
          ...user,
          lastMessage: message.content,
          lastMessageTime: message.createdAt,
          unreadCount:
            isReceiver && !isCurrentChat
              ? (user.unreadCount || 0) + 1
              : user.unreadCount ?? 0,
        };
      });
      return [...updated].sort(
        (a, b) =>
          new Date(b.lastMessageTime || 0).getTime() -
          new Date(a.lastMessageTime || 0).getTime()
      );
    });
    if (isCurrentChat) {
      setMessages((prev) => [...prev, message]);
    }
  };
  socket?.on("receive-message", handleReceive);
  return () => {
    socket?.off("receive-message", handleReceive);
  };
 },[socket, selectedUserId, currentUserId]);
 const sendMessage = () => {
    const msg: TMessageSent = {
      sender: currentUserId,
      receiver: selectedUser!.id,
      content: text,
    };
    socket?.emit("send-message", msg);
    setText("");
  };
  const lastTen = chatMessages.slice(-15);

  const handleCall = () => {
    if(!selectedUser) return;
     dispatch(setVideoCall({
            userID:selectedUser.id,
            type:"out-going",
            callType:"video",
            roomId:`${Date.now()}`,
            agentName:agent.name,
            userName:selectedUser.name
          }
          ));
    };
  const isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };
 return (
 <div className="flex flex-col h-full w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
  <div className="flex items-center gap-3 px-4 py-3 bg-teal-100 text-teal-900 rounded-t-lg shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold text-lg bg-gradient-to-tr from-green-300 via-teal-400 to-gray-400 shadow-inner">
      {selectedUser?.name.charAt(0).toUpperCase()}
    </div>
    <span className="font-semibold text-sm truncate">
      {selectedUser?.name}
    </span>
    { role==="Agent" && ( 
        <div className="ml-auto cursor-pointer" onClick={handleCall}>
          <VideoIcon size={26} color={"gray"} />
        </div>
    )}
  </div>
  <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50 text-sm max-h-[calc(100vh-250px)]">
    {lastTen.map((msg, idx) => (
      <div
        key={idx}
        className={`flex mb-2 ${
          msg.sender === currentUserId ? "justify-end" : "justify-start"
        }`}
      >
        <span
          className={`max-w-[75%] px-3 py-2 rounded-2xl break-words ${
            msg.sender === currentUserId
              ? "bg-blue-100 text-gray-800"
              : "bg-gray-150 text-gray-700"
          }`}
        >
          {msg.content}
        </span>
        <span className="text-xs text-gray-500 ml-2 self-end">
          {isToday(new Date(msg.createdAt))
            ? new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : new Date(msg.createdAt).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
        </span>
      </div>
    ))}
    <div ref={scrollRef} />
  </div>
 <div className="sticky bottom-0 flex items-center p-3 gap-2 border-t bg-white">
    <input
      type="text"
      className="flex-1 rounded-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Type a message..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button
      className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-sm disabled:opacity-50 transition"
      onClick={sendMessage}
      disabled={!text.trim()}
    >
      Send
    </button>
  </div>
</div>
 );
};

export default ChatBox;
