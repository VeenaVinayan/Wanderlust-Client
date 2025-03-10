import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/userTypes'

const initialState : UserData ={
     id:'',
     email:'',
     name:'',
     phone:'',
     role:'',
     status:false,
     isAuthenticated:false,
}
const userSlice = createSlice({
    name :'userData',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>){
            state.id = action.payload?.id;
            state.email = action.payload?.email;
            state.name = action.payload?.name;
            state.phone = action.payload?.phone;
            state.role = action.payload?.role;
            state.status = action.payload?.status;
            state.isAuthenticated=true;
         },
         resetUserData(){
             return initialState
         }
    }
});

export const { setUserData ,resetUserData} = userSlice.actions;
export default userSlice.reducer;