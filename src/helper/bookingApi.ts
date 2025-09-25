import axiosInstance from "../apiStore/api";
import { SearchParams } from "../types/agentTypes";
import { TBooking } from "../types/bookingTypes";
import { TBookingValidationData } from '../types/bookingTypes';
import { Booking_Route } from '../Constants/RouteValues';

class Booking{
     async bookPackage(bookingData : TBooking){
            try{
                 const { data} = await axiosInstance.post(`${Booking_Route.USER_BOOKING}`, bookingData);
                 return data;
            }catch(err : unknown){
                 console.error('Error in Booking Package:', err);
                 throw Error('Error in Booking Package !!');
            }
     }
     async getBookingData(userId: string,params: SearchParams){
          try{
               const { data } = await axiosInstance.get(`${Booking_Route.USER_BOOKING_ID}/${userId}`,{params});
               return data.bookings;    
          }catch(err: unknown){
               console.error('Error in Fetching Booking Data:', err);
               throw Error('Error in Fetching Booking Data !!');
          }
     }
     async getAgentBookingData(agentId: string,params : SearchParams){
           const { data } = await axiosInstance.get(`${Booking_Route.AGENT_BOOKING}/${agentId}`,{params});
           return data.bookings;
     }
     async updateBookingStatusByAgent(bookingId : string,status: string){
          const {  data }= await axiosInstance.patch(`${Booking_Route.AGENT_BOOKING}/${bookingId}`,{status});
          return data;    
     }
     async getBookingDataToAdmin( params : SearchParams){
          const { data}= await axiosInstance.get(`${Booking_Route.ADMIN_BOOKING}`,{params});
          return data.bookings;    
     }
     async cancelBooking(bookingId : string){
           try{
                const { data} = await axiosInstance.post(`${Booking_Route.USER_BOOKING_CANCEL}`, { bookingId });
                return data;
           }catch(err){
                console.log('Error in cancel Booking ');
                throw err;
           }
     }
     async getPackageBooking(packageId : string,params : SearchParams){
          try{
               const { data } = await axiosInstance.get(`${Booking_Route.AGENT_BOOKING_PACKAGE}/${packageId}`,{params});
               return data;
          }catch(err){
               console.log('Error in Packages ::',err);
               throw err;
          }
     }
     async getPackageBookingDataValue(packageId:string, day : Date): Promise<TBookingValidationData >{
          try{
               const { data } = await axiosInstance.get(`${Booking_Route.USER_BOOKING_VALIDATE}`, { params: { packageId, day } });
               return data.values;
          }catch(err){
               console.log('Error in get booking Data :: ',err);
               throw err;
          }
     }
}

export default new Booking();
