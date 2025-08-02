import axiosInstance from "../apiStore/api";
import { TChatUser } from '../types/chatTypes';

class ChatApi{
    async getChatUsers(userId : string,role: string):Promise<TChatUser[] | null>{
      console.log("Users :",userId); 
      const user = role.toLowerCase();
      const { data } = await axiosInstance.get(`/${user}/chats/users/${userId}`);
      return data.users;
    }
    async getMessages(sender: string, receiver : string, role :string){
       const user = role.toLowerCase(); 
       const data = await axiosInstance.get(`/${user}/chats/messages`, { params: { sender, receiver } });
       return data.data;
    }
    async getChatUserDetails(userId : string){
        const { data } = await axiosInstance(`/user/users/details/${userId}`);
        console.log(data.data);
        return data;
    }
}
export default new ChatApi();