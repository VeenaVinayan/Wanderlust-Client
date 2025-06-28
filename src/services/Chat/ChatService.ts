import chatApi  from "../../helper/chatHelper";

export  const  getChatUsers = async (userId : string,role : string) =>{
    try{
         console.log("User Id ::", userId);
         const response = await chatApi.getChatUsers(userId,role);
         return response;
    }catch(err){
        console.log('Error occured ::',err);
        throw err;
    }
}

export const getAgentDetails = async(userId :string) =>{
     try{
            const data = await chatApi.getagentDetails(userId);
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
