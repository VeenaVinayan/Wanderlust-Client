import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLocalStream,
  setRemoteStream,
  setPeerConnection,
  acceptCall,
  endCall,
  receivingCall
} from "../../features/authentication/videoCallSlice";
import { useSocket } from '../../context/SocketContext';
import { RootState } from '../../app/store';

export const useWebRTC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const {
    callerId,
    calleeId,
    offer,
    peerConnection,
  } = useSelector((state: RootState) => state.videoCall);

  const startLocalStream = async () => {
   try{  
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if(localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
   }
    dispatch(setLocalStream(stream));
    return stream;
  }catch(err: unknown){
    if(err instanceof Error)
      console.error("Error accessing media devices:", err.message);
    }
};
 const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        const to = callerId || calleeId;
        if (to) {
          socket?.emit("ice-candidate", {
            to,
            candidate: event.candidate,
          });
        }
      }
    };
   peer.ontrack = (event) => {
      const remoteStream = event.streams[0];
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      dispatch(setRemoteStream(remoteStream));
    };
    dispatch(setPeerConnection(peer));
    return peer;
  };
 const makeCall = async (calleeId : string) => {
    const stream = await startLocalStream();
    const peer = createPeer();
    console.log("Make Call in webRTC !!");
    if (stream) {
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });
    }
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket?.emit("call-user", {
      to: calleeId,
      offer,
    });
  };
const answerCall = async () => {
  try{  
    console.log("Answer Call in WEbRtc");
    const stream = await startLocalStream();
    const peer = createPeer();
     stream?.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
    });
    if(offer) {
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      if (callerId){
         socket?.emit("answer-call", {
          to: callerId,
          answer,
        });
      dispatch(acceptCall({ answer: new RTCSessionDescription(answer) }));
      }
    }
  }catch(err:unknown){
    if(err instanceof Error)
      console.log("Error in answer call",err.message);
      alert('Error occured!! in answer Calll');
  };
  }
  const endVideoCall = () => {
     dispatch(endCall());
     console.log("End Video Call in WebRTC");
    if (peerConnection) {
      peerConnection.close();
    }
   if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  };
  useEffect(() => {
    if (!socket) return;
    socket.on("receive-call", ({ from, offer }) => {
    console.log("Incoming call from:", from);
    dispatch(receivingCall({ callerId :from, offer }));
  });
  socket?.on("call-answered", async ({ answer }) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });
    socket?.on("ice-candidate", ({ candidate }) => {
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
    socket?.on("call-declined",()=>{
      console.log("Call declined by the other user");
       dispatch(endCall());
    })
    socket?.on('call-ended',() =>{
      console.log("Call ended by the other user");
      endVideoCall();
    })
    return () => {
      socket?.off("call-answered");
      socket?.off("ice-candidate");
      socket.off("receive-call");
      socket.off("call-declined");
      socket.off('call-ended');
    };
  },[peerConnection, socket]);

  return {
    localVideoRef,
    remoteVideoRef,
    makeCall,
    answerCall,
    endVideoCall,
  };
};

