import { TBooking, TBookingData , TBookingValidationData} from "../../types/bookingTypes";
import bookingApi from "../../helper/bookingApi";
import { SearchParams } from "../../types/agentTypes";
import userApi from "../../helper/userApi";

export const bookPackage = async (bookingData : TBooking) =>{
        try{
             const response = await bookingApi.bookPackage(bookingData);
             if(response){
                    return Response;
             }
        }catch(error){
                console.error('Error booking package:', error);
                throw error;
        }
}
export const getBookingData = async( userId: string,params : SearchParams) =>{
        try{
                const response = await bookingApi.getBookingData(userId,params);
                if(response){
                return response;
                }
        }catch(error){
                console.error('Error fetching booking data:', error);
                throw error;
        }
 }
 export const updateBookingStatusByAgent = async (bookingId : string,status : string) =>{
        try{
                const response = await bookingApi.updateBookingStatusByAgent(bookingId,status)
                return response;
        }catch(err){
                console.log('Error Update booking Status !!');
                throw err;
        }
 }
 export const getBookingDataToAdmin = async(params: SearchParams)  =>{
        console.log('Booking Data ::',params);
        const data = await bookingApi.getBookingDataToAdmin(params);
        return data;
    }

export const cancelBooking = async(bookingId : string) =>{
       try{
           console.log('Booking data ',bookingId);
           const data = await bookingApi.cancelBooking(bookingId);
           return data;
       }catch(err){
           console.log('Error occured in cancel Booking ',err); 
           throw err;
       } 
    }
export const validateBooking = async(bookingData : TBookingData) =>{
        try{
           return await userApi.validateBooking(bookingData);
        }catch(err){
                console.log('Error in Validate Booking !');
                throw err;
        }
}   
export const getPackageBookingDataValue = async (packageId : string,day :Date):Promise<TBookingValidationData> =>{     
       return await bookingApi.getPackageBookingDataValue(packageId,day);
}
