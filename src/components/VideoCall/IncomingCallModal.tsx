import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { endCall } from "../../features/authentication/videoCallSlice";
import { useWebRTC } from "../../hooks/CustomHooks/useWebRTC";
import { useSocket } from "../../context/SocketContext";

const IncomingCallModal: React.FC = () => {
  const dispatch = useDispatch();
  const { answerCall } = useWebRTC();
  const { socket } = useSocket();
  const {
    isReceivingCall,
    callerId,
  } = useSelector((state: RootState) => state.videoCall);

  const handleAccept = () => {
    console.log("Handle call in Incoming Call ----> Handel Accept ||||!!");
    answerCall(); 
  };
  const handleDecline = () => {
    dispatch(endCall());
    if (socket && callerId){
      socket.emit("decline-call", { to: callerId });
    }
  };
  if(!isReceivingCall) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center w-[90%] max-w-md">
        <p className="text-xl font-semibold mb-4">📞 Incoming Call</p>
        <p className="text-gray-700 mb-6">User <strong>{callerId}</strong> is calling you...</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleAccept}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
          >
            ✅ Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md"
          >
            ❌ Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;

