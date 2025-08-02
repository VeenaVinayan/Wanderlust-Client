import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface VideoCallState{
     isCalling :boolean;
     isReceivingCall: boolean;
     callAccepted: boolean;
     callerId: string | null;
     calleeId : string | null;
     offer : RTCSessionDescriptionInit | null;
     answer : RTCSessionDescriptionInit | null;
     remoteStream : MediaStream | null;
     localStream: MediaStream | null;
     peerConnection : RTCPeerConnection | null;
}
const initialState: VideoCallState = {
     isCalling:false,
     isReceivingCall: false,
     callAccepted:false,
     callerId:null,
     calleeId:null,
     offer:null,
     answer:null,
     remoteStream:null,
     localStream:null,
     peerConnection:null,
}
const videoCallSlice = createSlice({
     name:'videoCall',
     initialState,
     reducers:{
          initiateCall(state : VideoCallState, action:PayloadAction<{calleeId: string,callerId:string}>){
               state.isCalling = true;
               state.calleeId = action.payload.calleeId;
              },
          receivingCall(state : VideoCallState, action:PayloadAction<{callerId: string,offer: RTCSessionDescription}>){
              state.isReceivingCall = true;
              state.callerId = action.payload.callerId;
              state.offer = action.payload.offer;
          },
          acceptCall(state : VideoCallState, action: PayloadAction<{ answer:RTCSessionDescription}>){
              state.callAccepted = true;
              state.isReceivingCall = false;
              state.answer = action.payload.answer;
          },
          endCall(){
             return initialState;
          },
          setRemoteStream(state:VideoCallState , action: PayloadAction<MediaStream>){
              state.remoteStream = action.payload;
          },
          setLocalStream(state: VideoCallState, action: PayloadAction<MediaStream>){
             state.localStream = action.payload;
          },
          setPeerConnection(state : VideoCallState, action: PayloadAction<RTCPeerConnection>){
              state.peerConnection = action.payload;
          }
     }
});

export const{
     initiateCall,
     receivingCall,
     acceptCall,
     endCall,
     setLocalStream,
     setRemoteStream,
     setPeerConnection
} = videoCallSlice.actions;

export default videoCallSlice.reducer;