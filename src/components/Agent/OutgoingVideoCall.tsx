import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useSocket } from '../../context/SocketContext';
import { endCallAgent } from '../../features/authentication/VideoCallAgent'
import { MdCallEnd } from "react-icons/md";

const  OutgoingVideocall :React.FC = () =>{

  const { videoCall } = useSelector((state: RootState) => state.agentVideoCall);
  console.log("nnnn",videoCall);
  
  const user = useSelector((state: RootState) => state.userData);
  const { socket } = useSocket();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const agentInfo = useSelector((state:RootState) => state.agentSliceData);

  useEffect(() => {
      console.log("Outgoing call Modal",videoCall);
      if(videoCall?.type === "out-going") {
      socket?.emit("outgoing-video-call", {
        to: videoCall.userID,
        from:user.id,
        agentName: videoCall.agentName,
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });

      timeoutRef.current = setTimeout(() => {
        handleEndCall();
      }, 60000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [videoCall?.type]);

  useEffect(() => {
    console.log('Socket instance:', socket);
    if (socket) {
      console.log('Socket connected:', socket.connected);
    }
  }, [socket]);

  const handleEndCall = async () => {
    await socket?.emit('reject-call', { to: videoCall?.userID, sender: 'agent', name: videoCall?.userName, from: agentInfo.name, sder: agentInfo.id })
    dispatch(endCallAgent())
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
  if(!videoCall?.type) return

  return (
    <div className="w-full h-full fixed flex justify-center items-center z-50 top-1">
      <div className="w-96 bg-cyan-950 flex justify-center items-center z-50 rounded-xl shadow-2xl shadow-black">
        <div className="flex flex-col gap-6 items-center">
          <span className="text-lg text-white mt-3">
            {'Outgoing video call'}
          </span>
          <span className="text-3xl text-white">{videoCall?.userName}</span>
         
          <h1 className=' text-white text-2xl font-bold'>Calling......</h1>
          <div className="bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-5 cursor-pointer">
            <MdCallEnd onClick={handleEndCall} className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default OutgoingVideocall