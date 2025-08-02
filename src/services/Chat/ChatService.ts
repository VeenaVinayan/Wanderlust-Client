import chatApi  from "../../helper/chatHelper";
import { TChatUser } from '../../types/chatTypes';

export  const  getChatUsers = async (userId : string,role : string):Promise<TChatUser[] | null >=>{
    try{
         console.log("User Id ::", userId);
         const  users  = await chatApi.getChatUsers(userId,role);
         return users;
    }catch(err){
        console.log('Error occured ::',err);
        throw err;
    }
}
export const getChatUserDetails = async(userId :string) =>{
     try{
            const data = await chatApi.getChatUserDetails(userId);
            return data;
     }catch(err){
         console.log('Error occured :',err);
         throw err;
     }
}
export const getMessages = async(sender : string,receiver :string,role:string) =>{
     try{
         const data = await chatApi.getMessages(sender,receiver,role);
         return data;
     }catch(err){
         console.log("Error :: ",err);
         throw err;
     }
}
