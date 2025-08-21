import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useRef, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  setRoomIdUser,
  setShowIncomingVideoCall,
  setShowVideoCallUser,
  setVideoCallUser,
} from '../../features/authentication/Video';

const VideoCall: React.FC = () => {
  const appID = Number(import.meta.env.VITE_APP_ZEGOCLOUD_APP_ID);
  const serverSecret = import.meta.env.VITE_APP_ZEGOCLOUD_SERVER_SECRET;
  const videoCallRef = useRef<HTMLDivElement | null>(null);

  const { roomIdUser, showIncomingVideoCall } = useSelector(
    (state: RootState) => state.videoCall
  );
  const { socket } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomIdUser) return;

    console.log("🚀 Starting video call with Room ID:", roomIdUser);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomIdUser,
      Date.now().toString(), 
      'User'
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    const handleUserLeft = () => {
      console.log('👋 User left the room');
      zc.destroy();
      dispatch(setShowVideoCallUser(false));
      dispatch(setRoomIdUser(null));
      dispatch(setVideoCallUser(null));
      dispatch(setShowIncomingVideoCall(null));
    };

    zc.joinRoom({
      container: videoCallRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showPreJoinView: false,
      onLeaveRoom: () => {
        socket?.emit('leave-room', { to: showIncomingVideoCall?._id });
        handleUserLeft();
      },
    });
    socket?.on('user-left', handleUserLeft);

    return () => {
    
      console.log('🧹 Cleaning up video call...');
      zc.destroy();
      socket?.off('user-left', handleUserLeft);
    };
  }, [roomIdUser, socket, dispatch, appID, serverSecret, showIncomingVideoCall]);

  return (
    <div
      ref={videoCallRef}
      style={{ width: '100vw', height: '100vh', backgroundColor: 'black',zIndex:9999,position:"fixed",top:0,left:0 }}
    />
  );
};

export default VideoCall;
