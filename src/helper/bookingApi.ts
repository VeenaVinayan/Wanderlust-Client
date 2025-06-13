import axiosInstance from "../apiStore/userApi";
import { SearchParams } from "../types/agentTypes";
import { TBooking } from "../types/bookingTypes";
import axiosAgent from '../apiStore/agentApi';
import axiosAdmin from '../apiStore/adminApi';

class BookingApi{
     async bookPackage(bookingData : TBooking){
            try{
                 const response = await axiosInstance.post('/booking', bookingData);
                 console.log('Booking Response:', response.data);
                 return response.data;
            }catch(err : unknown){
                 console.error('Error in Booking Package:', err);
                 throw Error('Error in Booking Package !!');
            }
     }
     async getBookingData(userId: string,params: SearchParams){
          try{
               console.log('Get Booking Data:', userId,params);
               const response = await axiosInstance.get(`/booking/${userId}`,{params});
               return response.data.data;    
          }catch(err: unknown){
               console.error('Error in Fetching Booking Data:', err);
               throw Error('Error in Fetching Booking Data !!');
          }
     }
     async getAgentBookingData(agentId: string,params : SearchParams){
           console.log('Agent booking data !!',agentId,params);
           const response = await axiosAgent.get(`/booking/${agentId}`,{params});
           return response.data.data;
     }
     async updateBookingStatusByAgent(bookingId : string){
          console.log('Booking Id ::',bookingId);
          const data = await axiosAgent.patch(`/booking/${bookingId}`);
          return data.data;    
     }
     async getBookingDataToAdmin( params : SearchParams){
          const data = await axiosAdmin.get(`/booking`,{params});
          return data.data.data;    
     }
     async cancelBooking(bookingId : string){
           try{
                console.log('Cancel Booking ',bookingId);
                const response = await axiosInstance.post('/booking/cancel', { bookingId });
                console.log('REsponse in cacel Booking ::',response.data);
                return response.data;
           }catch(err){
                console.log('Error in cancel Booking ');
                throw err;
           }
     }
     async getPackageBooking(packageId : string,params : SearchParams){
          try{
               console.log('Get package Booking : ',packageId);
               const response = await axiosAgent.get(`/bookings/package/${packageId}`,{params});
               console.log('Response in package Booking ::',response.data);
               return response.data;
          }catch(err){
               console.log('Error in Packages ::',err);
               throw err;
          }
     }
}
export default new BookingApi();
