import notificationApi from '../../helper/notificationApi';

export const getAllNotifications = async(userId : string,role : string) =>{
     try{
        return notificationApi.getAllNotifications(userId,role);
     }catch(err){
         console.log('Error in notification Service ::',err);
         throw err;
     }
}
export const changeNotificationStatus = async (notificationId : string,role:string): Promise<boolean> =>{
    try{
        return await notificationApi.changeNotificationStatus(notificationId,role);
    }catch(err){
        console.log("Error is ::",err);
        throw err;
    }
}