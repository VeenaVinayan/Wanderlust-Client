import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useRef } from "react";
import { useSocket } from "../../context/SocketContext";
import {
  setRoomId,
  setShowVideoCall,
  setVideoCall,
} from "../../features/authentication/VideoCallAgent";
function AgentVideoCall() {
  const videoCallRef = useRef<HTMLDivElement | null>(null);
  const { roomIdAgent, videoCall } = useSelector(
    (state: RootState) => state.agentVideoCall
  );
  const dispatch = useDispatch();
  const { socket } = useSocket();
  useEffect(() => {
    if (!roomIdAgent) return;

    console.log("🎥 AgentVideoCall component mounted with room:", roomIdAgent);

    const appID = Number(import.meta.env.VITE_APP_ZEGOCLOUD_APP_ID);
    const serverSecret = import.meta.env.VITE_APP_ZEGOCLOUD_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomIdAgent.toString(),
      Date.now().toString(), 
      "Agent"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    const handleLeave = () => {
      console.log("📴 Agent leaving call room.");
      zp.destroy();
      dispatch(setShowVideoCall(false));
      dispatch(setRoomId(null));
      dispatch(setVideoCall(null));
    };

    zp.joinRoom({
      container: videoCallRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showPreJoinView: false,
       onLeaveRoom: () => {
        if (socket && videoCall?.userID) {
          socket.emit("leave-room", { to: videoCall.userID });
        }
        handleLeave();
      },
    });

    socket?.on("user-left", handleLeave);

    return () => {
      console.log("🧹 Cleaning up AgentVideoCall...");
    
      socket?.off("user-left", handleLeave);
      zp.destroy();
    };
  }, [roomIdAgent, dispatch, socket, videoCall]);

  return (
    <div
        style={{ width: '100vw', height: '100vh', backgroundColor: 'black',zIndex:9999,position:"fixed",top:0,left:0 }}
      ref={videoCallRef}
    />
  );
}

export default AgentVideoCall;
