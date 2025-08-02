import axiosInstance from "../apiStore/api";

class AgentApi{
     async getDashboard(agentId : string){
         try{
             const { data } = await axiosInstance.get(`/agent/dashboard/${agentId}`);
             return data.data;
         }catch(err:unknown){
             console.error('Error in Fetching Agent Dashboard ::',err);
             throw err;
         }
     }
   }

export default new AgentApi();
