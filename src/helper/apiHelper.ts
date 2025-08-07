import axiosInstance from "../apiStore/api";
import { SearchParams } from "../types/agentTypes";
import { TPackageData} from "../types/packageTypes";

class ApiHelper {
    async deleteCategory(categoryId : string) : Promise<boolean | undefined>{
        try{
            const res  = await axiosInstance.patch(`/admin/category-delete/${categoryId}`);
            console.log('Response :: ',res);
            if(res?.data?.success){
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
              const result = await axiosInstance.get(`/admin/category-check/${categoryName}`);
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
             const response = await axiosInstance.get(`/admin/agent-pending`,{params});
             console.log(" REsponse is :::",response.data);
             return response.data;
         }catch(err){
             console.log('Error in fetch Agent data ::',err);
             return false;
         }
    }
    async agentApproval(agentId : string){
         try{
             const response = await axiosInstance.patch(`/admin/approveAgent/${agentId}`);
             return response.data;
         }catch(err){
             console.error('Error in Api call Agent Approval !!',err);
             return null;
         }
    }
    async agentRejectRequest(agentId : string){
        try{
            const response = await axiosInstance.patch(`/admin/rejectAgentRequest/${agentId}`);
            return response.data;
        }catch(err){
            console.error('Error in Api call Agent Approval !!',err);
            return null;
        }
   }
   async blockPackage(packageId: string): Promise<boolean>{
        try{
            const response = await axiosInstance.patch(`/admin/block-package/${packageId}`);
            if(response.status === 200) return true;
            else return false;
        }catch(err){
           console.log('Error in Delete Package ::',err);
           return false;
        }
    }
  async getPackages(params : SearchParams) : Promise<TPackageData>{
        const response = await axiosInstance.get(`/admin/packages`,{params});
        return response.data.data;
  }
  async getDashboard(){
     const response = await axiosInstance.get('/admin/dashboard');
     console.log("DAta is ::",response.data);
     return response.data;
  }
}
export default new ApiHelper();