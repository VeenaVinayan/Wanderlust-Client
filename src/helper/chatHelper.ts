import axiosInstance from "../apiStore/userApi";
import axiosInstanceAgent from "../apiStore/agentApi";
class ChatApi{
    async getChatUsers(userId : string,role: string){
       if(role === 'User'){
        console.log("Users :",userId); 
        const { data } = await axiosInstance.get(`/chats/users/${userId}`);
        return data;
       }else{
          const { data } = await axiosInstanceAgent.get(`/chats/users/${userId}`);
          return data;
       } 
    }
    async getMessages(sender: string, receiver : string, role :string){
       let data; 
       if(role === 'User'){
          data = await axiosInstance.get(`/chats/messages`, { params: { sender, receiver } });

       }else{
         data = await axiosInstanceAgent.get(`/chats/messages`, { params: { sender, receiver } });
       } 
        return data.data;
    }
    async getagentDetails(userId : string){
        const { data } = await axiosInstance(`/users/details/${userId}`);
        console.log(data.data);
        return data;
    }
}
export default new ChatApi();