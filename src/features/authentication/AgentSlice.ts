import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AgentFormDataType} from '../../types/formTypes';


const initialState: AgentFormDataType = {
     name:'',
     email:'',
     phone:'',
     password:'',
     conPassword:'',
     address:{
        home:'',
        city:'',
        street:'',
        state:'',
        country:'',
        zipcode:'',
     },    
}

const agentRegisterSlice = createSlice({
     name:'register',
     initialState,
     reducers:{
          setAgentRegistrationData(state, action : PayloadAction<AgentFormDataType>){
              return { ...state , ...action.payload}
             
          },
          resetAgentRegistration(){
                return initialState;
          }
     } 
});

export const { setAgentRegistrationData, resetAgentRegistration } = agentRegisterSlice.actions;

export default agentRegisterSlice.reducer;

