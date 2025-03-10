import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAgentData } from '../../types/agentTypes';

const initialState = {
     id:'',
     email:'',
     name:'',
     phone:'',
     role:'',
     status:false,
     address:{
        home: '',
        stree:'',
        city:'',
        state:'',
        country:'',
        zipcode:'',
     },
     isVerified:'',
     isAuthenticated:false,
}
const agentDataSlice = createSlice({
     name : 'agentData',
     initialState,
     reducers: {
         setAgentData(state, action:PayloadAction<Partial <TAgentData>>){
            Object.assign(state, action.payload);
            state.isAuthenticated = true;
         },
         resetAgentData(){
              return initialState;
         }
     }
});

export const { setAgentData, resetAgentData } = agentDataSlice.actions;
export default agentDataSlice.reducer;