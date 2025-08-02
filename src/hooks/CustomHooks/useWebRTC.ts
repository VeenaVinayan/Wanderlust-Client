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
    console.log("Video stream ::",stream);
    console.log("Video Stream  Tracks ::", stream.getAudioTracks());
    const videoTracks = stream.getVideoTracks();
    console.log("Video Tracks :: ",videoTracks);
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

// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSocket } from "../../context/SocketContext";
// import {
//   setLocalStream,
//   setRemoteStream,
//   setPeerConnection,
//   acceptCall,
//   endCall
// } from "../../features/authentication/videoCallSlice";
// import { RootState } from "../../app/store";

// export const useWebRTC = () => {
//   const dispatch = useDispatch();
//   const { socket } = useSocket();
//   const peerConnection = useRef<RTCPeerConnection | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   const { callAccepted, callerId, calleeId } = useSelector(
//     (state: RootState) => state.videoCall
//   );

//   // ICE servers
//   const iceConfig = {
//     iceServers: [
//       {
//         urls: "stun:stun.l.google.com:19302"
//       }
//     ]
//   };

//   // Start local stream
//   const startLocalStream = async () => {
//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }

//       dispatch(setLocalStream(localStream));

//       return localStream;
//     } catch (error) {
//       console.error("Error getting user media:", error);
//     }
//   };

//   // Create peer connection
//   const createPeerConnection = (remoteUserId: string) => {
//     peerConnection.current = new RTCPeerConnection(iceConfig);
//     dispatch(setPeerConnection(peerConnection.current));

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", {
//           to: remoteUserId,
//           candidate: event.candidate
//         });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//       dispatch(setRemoteStream(event.streams[0]));
//     };

//     return peerConnection.current;
//   };

//   const initiateCall = async (remoteUserId: string) => {
//     const localStream = await startLocalStream();
//     const pc = createPeerConnection(remoteUserId);

//     localStream?.getTracks().forEach((track) => {
//       pc.addTrack(track, localStream);
//     });

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     socket.emit("call-user", {
//       to: remoteUserId,
//       offer
//     });
//   };

//   const answerCall = async (offer: RTCSessionDescriptionInit, remoteUserId: string) => {
//     const localStream = await startLocalStream();
//     const pc = createPeerConnection(remoteUserId);

//     localStream?.getTracks().forEach((track) => {
//       pc.addTrack(track, localStream);
//     });

//     await pc.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socket.emit("answer-call", {
//       to: remoteUserId,
//       answer
//     });

//     dispatch(acceptCall());
//   };

//   const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
//     if (
//       peerConnection.current &&
//       peerConnection.current.signalingState === "have-local-offer"
//     ) {
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
//     }
//   };

//   const handleNewICECandidate = async (candidate: RTCIceCandidateInit) => {
//     try {
//       await peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
//     } catch (e) {
//       console.error("Error adding received ice candidate", e);
//     }
//   };

//   const endVideoCall = () => {
//     peerConnection.current?.close();
//     peerConnection.current = null;

//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

//     dispatch(endCall());

//     socket.emit("end-call", {
//       to: callerId || calleeId
//     });
//   };

//   useEffect(() => {
//     socket.on("incoming-call", async ({ from, offer }) => {
//       await answerCall(offer, from);
//     });

//     socket.on("call-answered", async ({ answer }) => {
//       await handleAnswer(answer);
//     });

//     socket.on("ice-candidate", ({ candidate }) => {
//       handleNewICECandidate(candidate);
//     });

//     socket.on("call-ended", () => {
//       endVideoCall();
//     });

//     return () => {
//       socket.off("incoming-call");
//       socket.off("call-answered");
//       socket.off("ice-candidate");
//       socket.off("call-ended");
//     };
//   }, []);

//   return {
//     localVideoRef,
//     remoteVideoRef,
//     initiateCall,
//     endVideoCall
//   };
// };
