import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { IAgent, VideoCallPayload} from '../../types/videoCall';

const initialState : IAgent ={
     videoCall : null,
     showVideoCallAgent: false,
     roomIdAgent: null,
}

const agentSlice=createSlice({
    name: "agentVideoCall",
    initialState,
    reducers:{
         setVideoCall(state, action: PayloadAction<VideoCallPayload  | null>) {
            state.videoCall = action.payload;
          },
          setShowVideoCall(state, action: PayloadAction<boolean>) {
            state.showVideoCallAgent = action.payload;
        },
          setRoomId(state, action: PayloadAction<string | null>) {
            state.roomIdAgent = action.payload;
         },
           endCallAgent: (state) => {
            state.videoCall = null;
            state.showVideoCallAgent = false; 
            state.roomIdAgent = null;   
            localStorage.removeItem("IncomingVideoCall"); 
          },
        }
    })
 
    export const { setVideoCall, setShowVideoCall,setRoomId, endCallAgent} = agentSlice.actions;
    export default agentSlice.reducer;