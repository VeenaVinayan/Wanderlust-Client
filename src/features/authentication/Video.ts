import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  UserState} from '../../types/videoCall';

const initialState : UserState={
     showIncomingVideoCall: {
            _id: "",
            callType: "",
            agentId:"",
            roomId: null,
            agentName:"",
        },
  videoCall: "",
  showVideoCallUser: false,
  roomIdUser: null,
}
const videoSlice = createSlice({
    name:"Video-Call",
    initialState,
    reducers:{
    setShowIncomingVideoCall: (state, action) => {
      state.showIncomingVideoCall = action.payload
    },
    setVideoCallUser(state, action: PayloadAction<string | null >) {
      state.videoCall = action.payload;
    },
    setShowVideoCallUser(state, action: PayloadAction<boolean>) {
      state.showVideoCallUser = action.payload;
    },
    setRoomIdUser(state, action: PayloadAction<string | null>) {
      state.roomIdUser = action.payload;
      },
    endCallUser: (state) => {
      state.videoCall = null;
      state.showIncomingVideoCall = null;
      state.showVideoCallUser = false; 
      state.roomIdUser = null;         
    },
    },  
  });

    export  const { setVideoCallUser,setShowVideoCallUser,setRoomIdUser,setShowIncomingVideoCall,endCallUser } = videoSlice.actions;
    export default videoSlice.reducer; 
    