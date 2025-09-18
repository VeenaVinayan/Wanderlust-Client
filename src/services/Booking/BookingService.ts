import { TBooking, TBookingData , TBookingValidationData} from "../../types/bookingTypes";
import booking from "../../helper/bookingApi";
import { SearchParams } from "../../types/agentTypes";
import user from "../../helper/userApi";

export const bookPackage = async (bookingData : TBooking) =>{
        try{
             const response = await booking.bookPackage(bookingData);
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
                const response = await booking.getBookingData(userId,params);
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
                const response = await booking.updateBookingStatusByAgent(bookingId,status)
                return response;
        }catch(err){
                console.log('Error Update booking Status !!');
                throw err;
        }
 }
 export const getBookingDataToAdmin = async(params: SearchParams)  =>{
        const data = await booking.getBookingDataToAdmin(params);
        return data;
    }

export const cancelBooking = async(bookingId : string) =>{
       try{
           const data = await booking.cancelBooking(bookingId);
           return data;
       }catch(err){
           console.log('Error occured in cancel Booking ',err); 
           throw err;
       } 
    }
export const validateBooking = async(bookingData : TBookingData) =>{
        try{
           return await user.validateBooking(bookingData);
        }catch(err){
                console.log('Error in Validate Booking !');
                throw err;
        }
}   
export const getPackageBookingDataValue = async (packageId : string,day :Date):Promise<TBookingValidationData> =>{     
       return await booking.getPackageBookingDataValue(packageId,day);
}
