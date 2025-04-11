import axiosInstance from "../apiStore/adminApi";
import { PER_PAGE} from '../Constants/User';
import { SearchParams } from "../types/agentTypes";
import { TPackageData } from "../types/packageTypes";

class ApiHelper {
    async deleteCategory(categoryId : string) : Promise<boolean | undefined>{
        try{
            const res  = await axiosInstance.patch(`/category-delete/${categoryId}`);
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
              const result = await axiosInstance.get(`/category-check/${categoryName}`);
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
    async fetchPendingAgentData(page : number) {
         try{
             const response = await axiosInstance.get(`/agent-pending/${PER_PAGE}/${page}`);
             console.log(" REsponse is :::",response.data);
             return response.data;
         }catch(err){
             console.log('Error in fetch Agent data ::',err);
             return false;
         }
    }
    async agentApproval(agentId : string){
         try{
             const response = await axiosInstance.patch(`/approveAgent/${agentId}`);
             return response.data;
         }catch(err){
             console.error('Error in Api call Agent Approval !!',err);
             return null;
         }
    }
    async agentRejectRequest(agentId : string){
        try{
            const response = await axiosInstance.patch(`/rejectAgentRequest/${agentId}`);
            return response.data;
        }catch(err){
            console.error('Error in Api call Agent Approval !!',err);
            return null;
        }
   }
   async blockPackage(packageId: string): Promise<boolean>{
        try{
            const response = await axiosInstance.patch(`/block-package/${packageId}`);
            if(response.status === 200) return true;
            else return false;
        }catch(err){
           console.log('Error in Delete Package ::',err);
           return false;
        }
    }
 async getPackages(page : number,params : SearchParams) : Promise<TPackageData>{
    // eslint-disable-next-line no-useless-catch
    try{
        console.log("Page ::",page);
        const response = await axiosInstance.get(`/packages/${page}/${PER_PAGE}`,{params});
        return response.data.data;
    }catch(err){
        throw err;
    }
 }
}

export default new ApiHelper();