import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { useSocket } from "../../context/SocketContext"
import { endCallUser, setRoomIdUser, setShowVideoCallUser } from "../../features/authentication/Video";
import { MdCallEnd } from "react-icons/md"

function IncomingVideoCall() {
  const { showIncomingVideoCall } = useSelector((state: RootState) => state.videoCall)
    
  const dispatch = useDispatch<AppDispatch>()
  const { socket } = useSocket();
 
  const handleEndCall = async () => {
    if (!showIncomingVideoCall) {
         return;
    }
    await socket?.emit("reject-call", {
      to: showIncomingVideoCall._id,
      sender: "user",
      name: showIncomingVideoCall.agentName,
    });
    dispatch(endCallUser());
  };
  const handleAcceptCall = async () => {
    if (!showIncomingVideoCall) {
      return;
    }
    socket?.emit("accept-incoming-call", {
      to: showIncomingVideoCall._id,
      from: showIncomingVideoCall.agentId,
      roomId: showIncomingVideoCall.roomId,
    });
    dispatch(setRoomIdUser(showIncomingVideoCall.roomId));
    dispatch(setShowVideoCallUser(true));
  };

  if(!showIncomingVideoCall?._id) return;
  return (
    <>
      <div className='w-full h-full flex justify-center items-center z-40 fixed top-1'>
        <div className='w-96 bg-cyan-950  z-40 rounded-xl flex flex-col items-center shadow-2xl shadow-black'>
          <div className='flex flex-col gap-7 items-center'>
            <span className='text-lg text-white  mt-4'>
              {'Incoming video call'}
            </span>
            <span className='text-3xl text-white font-bold'>{showIncomingVideoCall?.agentName}</span>

          </div>
          <div className='flex m-2  mb-5 gap-7'>

            <div className='bg-green-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1 cursor-pointer'>
              <MdCallEnd onClick={handleAcceptCall} className='text-3xl' />

            </div>
            <div className='bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1 cursor-pointer'>
              <MdCallEnd onClick={handleEndCall} className='text-3xl' />

            </div>
          </div>
        </div>
      </div>
    </>
  )


}
export default IncomingVideoCall