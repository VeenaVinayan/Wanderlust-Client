import bookingApi from '../../helper/bookingApi';
import { SearchParams } from '../../types/agentTypes';

export const getBookingData = async(agentId : string, params: SearchParams) => {
        console.log('Booking Data of Agent ::');
        const data = await bookingApi.getAgentBookingData(agentId,params);
        console.log("Data Booking of agent ::",data);
        return data;
}

export const getPackageBooking = async(packageId : string, params : SearchParams) =>{
         try{
                const resposne = await bookingApi.getPackageBooking(packageId,params);
                return resposne;
         }catch(err){
                 console.log('Error in get Package :: ',err);
                 throw err;
         }
}
  
