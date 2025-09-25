import axiosInstance from "../apiStore/api";
import { AgentRoute } from '../Constants/RouteValues';

class Agent{
     async getDashboard(agentId : string){
         try{
             const { data } = await axiosInstance.get(`${AgentRoute.AGENT_DASHBOARD}/${agentId}`);
             return data.dashboardData;
         }catch(err:unknown){
             console.error('Error in Fetching Agent Dashboard ::',err);
             throw err;
         }
     }
   }

export default new Agent();
