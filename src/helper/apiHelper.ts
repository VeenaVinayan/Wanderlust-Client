import axiosInstance from "../apiStore/api";
import { SearchParams } from "../types/agentTypes";
import { TPackageData} from "../types/packageTypes";
import { Admin_Route } from "../Constants/RouteValues";
class Helper {
    async deleteCategory(categoryId : string) : Promise<boolean | undefined>{
        try{
            const { data}  = await axiosInstance.patch(`${Admin_Route.ADMIN_CATEGORY_DELETE}/${categoryId}`);
            if(data?.success){
                 return true;
            }
            return false;
        }catch(err){
            console.log('Error on Api Respone',err);
            return false;
        }
    }
    async isExistCategory(categoryName : string) : Promise<boolean> {
         try{
              const result = await axiosInstance.get(`${Admin_Route.ADMIN_CATEGORY_CHECK}/${categoryName}`);
              if(result.status === 200){
                 return true;
              }else{
                 return false;
              }
         }catch(err){
             console.log('Error in Category exists',err);
             return false;
         }
    }
    async fetchPendingAgentData(params: SearchParams) {
         try{
             const { data} = await axiosInstance.get(`${Admin_Route.ADMIN_AGENT_PENDING}`,{params});
             return data;
         }catch(err){
             console.log('Error in fetch Agent data ::',err);
             return false;
         }
    }
    async agentApproval(agentId : string){
         try{
             const { data } = await axiosInstance.patch(`${Admin_Route.ADMIN_APPROVE_AGENT}/${agentId}`);
             return data;
         }catch(err){
             console.error('Error in Api call Agent Approval !!',err);
             return null;
         }
    }
    async agentRejectRequest(agentId : string){
        try{
            const { data } = await axiosInstance.patch(`${Admin_Route.ADMIN_REJECT_AGENT_REQUEST}/${agentId}`);
            return data;
        }catch(err){
            console.error('Error in Api call Agent Approval !!',err);
            return null;
        }
   }
   async blockPackage(packageId: string): Promise<boolean>{
        try{
            const response = await axiosInstance.patch(`${Admin_Route.ADMIN_BLOCK_PACKAGE}/${packageId}`);
            if(response.status === 200) return true;
            else return false;
        }catch(err){
           console.log('Error in Delete Package ::',err);
           return false;
        }
    }
  async getPackages(params : SearchParams) : Promise<TPackageData>{
        const { data } = await axiosInstance.get(`${Admin_Route.ADMIN_PACKAGES}`,{params});
        return data.data;
  }
  async getDashboard(){
     const { data }= await axiosInstance.get(`${Admin_Route.ADMIN_DSAHBOARD}`);
     return data;
  }
}
export default new Helper();