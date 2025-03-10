import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FormDataType} from '../../types/formTypes';

const initialState: FormDataType = {
     name:'',
     email:'',
     phone:'',
     password:'',
     conPassword:''
}
const registerSlice = createSlice({
     name:'register',
     initialState,
     reducers:{
          setRegistrationData(state, action : PayloadAction<{name:string, email:string,phone:string,password:string,conPassword:string}>){
               return { ...state, ...action.payload}
          },
          resetRegistration(){
               return initialState;
          }
     } 
});

export const { setRegistrationData, resetRegistration } = registerSlice.actions;

export default registerSlice.reducer;

