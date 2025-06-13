import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBooking } from '../../types/bookingTypes';

const initialState = {
     userId:'',
     packageId:'',
     totalGuest:0,
     totalAmount:0,
     tripDate:'',
     email:'',
     phone:'',
     travellers:{
          adult:0,
          children:0,
          infant:0
     }
    }

const bookingSlice = createSlice({
     name:'bookingData',
     initialState,
     reducers:{
          setBookingData(state, action:PayloadAction<TBooking>){
               Object.assign(state, action.payload)  
          },
          resetBookingData(){
               return initialState;            
          }
     }
});

export const { setBookingData, resetBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;



