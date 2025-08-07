import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useWebRTC } from "../../hooks/CustomHooks/useWebRTC";
import { useSocket } from "../../context/SocketContext";

const VideoCallModal: React.FC = () => {
  const { localVideoRef, remoteVideoRef, endVideoCall } = useWebRTC();
  const { socket } = useSocket();
  const { callAccepted, calleeId, callerId , isCalling} = useSelector(
    (state: RootState) => state.videoCall
  );
  const userId = useSelector((state: RootState) => state.userData.id);
  console.log("Modals :",localVideoRef,remoteVideoRef);
  const handleEndCall = () =>{
     console.log(`Calleee :: ${calleeId} || CallerId:: ${callerId}`);
     const to = userId === callerId ? calleeId : callerId;
     console.log("End Call in Video Call Modal ::: ",to);
     socket?.emit("end-call",{
        to
    });
    endVideoCall();
  }
  if((!isCalling && !calleeId || callAccepted) && !callAccepted) return null
  return (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-95 z-50 flex flex-col items-center justify-center p-6 space-y-6">
  <div className="text-center">
    <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
      {callerId ? `📞 Incoming Call from ${callerId}` : `📹 In Call with ${calleeId}`}
    </h2>
  </div>
  <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-6 items-center justify-center">
    <video
      ref={remoteVideoRef}
      autoPlay
      muted
      playsInline
      className="w-full md:w-[75%] h-[320px] rounded-2xl shadow-lg border border-gray-700 object-cover"
    />
    <video
      ref={localVideoRef}
      autoPlay
      muted
      playsInline
      className="absolute md:static bottom-5 right-5 w-[120px] h-[90px] md:w-[25%] md:h-[160px] bg-gray-700 rounded-xl shadow-md border-2 border-white object-cover z-20"
    />
  </div>
  <button
    onClick={handleEndCall}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg font-semibold rounded-xl transition duration-200 shadow-lg"
  >
    ❌ End Call
  </button>
 </div>
  );
};
export default VideoCallModal;

