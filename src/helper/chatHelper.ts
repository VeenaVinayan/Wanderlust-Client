import axiosInstance from "../apiStore/api";
import { TChatUser } from '../types/chatTypes';
import { Chat_Route } from "../Constants/RouteValues";

class Chat{
    async getChatUsers(userId : string,role: string):Promise<TChatUser[] | null>{
      const user = role.toLowerCase();
      const { data } = await axiosInstance.get(`/${user}${Chat_Route.CHATS_USERS}/${userId}`);
      return data.users;
    }
    async getMessages(sender: string, receiver : string, role :string){
       const user = role.toLowerCase(); 
       const data = await axiosInstance.get(`/${user}${Chat_Route.CHATS_MESSAGES}`, { params: { sender, receiver } });
       return data.data;
    }
    async getChatUserDetails(userId : string){
        const { data } = await axiosInstance(`${Chat_Route.USERS_DETAILS}/${userId}`);
        return data;
    }
}
export default new Chat();