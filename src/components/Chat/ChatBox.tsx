import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useChatContext } from "../../context/chatContext";
import { TMessage } from '../../types/chatTypes';
interface Props {
  currentUserId: string;
  selectedUserId: string;
}
const ChatBox: React.FC<Props> = ({ currentUserId, selectedUserId }) => {
  const { selectedUser , messages } = useChatContext();
  const { socket } = useSocket();
  const [chatMessages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState("");
  
  useEffect(() => {
    console.log("Messages ::",messages);
    setMessages(messages);
  }, [messages]);
  
  useEffect(() => {
    const handleReceive = (message: TMessage) => {
      const isForCurrentChat =
        (message.sender === selectedUserId && message.receiver === currentUserId) ||
        (message.sender === currentUserId && message.receiver === selectedUserId);

      if (isForCurrentChat) {
        setMessages((prev) => [...prev, message]);
      }
    };
   socket?.on("receive-message", handleReceive);
    return () => {
      socket?.off("receive-message", handleReceive);
    };
  }, [socket, selectedUserId, currentUserId]);

  const sendMessage = () => {
    console.log(`Sender :: ${currentUserId} - Receiver :: ${selectedUserId}`);
    const msg: TMessage = {
      sender: currentUserId,
      receiver: selectedUserId,
      content: text,
    };
    socket?.emit("send-message", msg);
    setText("");
  };
  return (
    <div className="flex flex-col h-full">
       <div className="flex items-center gap-4 p-4 shadow-md rounded-lg bg-white hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-semibold text-lg shadow-inner bg-gradient-to-tr from-red-800 via-purple-950 to-teal-800">
            {selectedUser?.name.charAt(0).toUpperCase()}
          </div>
            <span className="text-gray-800 font-medium text-base">{selectedUser?.name}</span>
      </div>
      <div className="flex-1 overflow-y-auto border p-2 mb-2 rounded">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-1 ${msg.sender === currentUserId ? "text-right" : "text-left"}`}
          >
            <span className="inline-block bg-blue-100 text-gray-800 p-2 rounded-xl">
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
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
