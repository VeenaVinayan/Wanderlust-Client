import axiosInstance  from "../apiStore/api";
import { TPackageData , TPackage, TPackageUpload} from "../types/packageTypes";
import { SearchParams, TCategoryValue } from "../types/agentTypes";
import axios from "axios";
import { Package_Route } from "../Constants/RouteValues";
class Package{
   async addPackage(packageData : TPackageUpload): Promise<boolean>{
         const { data } = await axiosInstance.post(`${Package_Route.AGENT_PACKAGES}`,packageData);
         return data;
    }
   async getCategories(): Promise<TCategoryValue[]> {
        const { data } = await axiosInstance.get(`${Package_Route.AGENT_CATEGORIES}`);
        return data.categories; 
    }
   async getSignedUrl(imageTypes: string[]) {
       const{ data } = await axiosInstance.post(`${Package_Route.AGENT_PRESIGNED_URL}`,{
            fileTypes: imageTypes
       });
       return data;
     }
   async uploadToS3(urls: string[], images: File[], imageTypes: string[]) {
    try {
      const res = await Promise.all(
          urls.map((url, index) => {  
               axios.put(url, images[index], {
               headers: { "Content-Type": imageTypes[index] }
              })
            }
          )
        );
      return res;
  } catch (error : unknown) {
      console.error('Error uploading to S3:', error);
      throw error;
  }
 }
 async packageEdit(packageId : string,packageData: TPackage): Promise<boolean>{
   try{
        const response = await axiosInstance.patch(`${Package_Route.AGENT_EDIT_PACKAGE}/${packageId}`,packageData);
        return response.status === 200 ;
     }catch(err : unknown){
      console.error('Error in Edit-package',err);
      throw new Error("Failed to Edit Packages !!");
   }
 }
 async deleteS3Image(deleteImages : string[]):Promise<void> {
    try{
         await axiosInstance.patch(`${Package_Route.AGENT_DELETE_IMAGE}`,deleteImages);
    }catch(err: unknown){
       console.error('Error in Delete Image in S3 !',err);
       throw new Error("Failed to Delete Images !!");
    }
 }
 async deletePackageByAgent(packageId: string) : Promise<boolean> {
    try{
         const response = await axiosInstance.patch(`/agent/delete-package/${packageId}`);
         if(response.status === 200) return true;
         else return false;
    }catch(err: unknown){
       console.error('Error In Delete Package !!',err);
       throw new Error('Failed to Delete Package !');
    }
 }
 async getPackages(agent:string, params : SearchParams): Promise<TPackageData> {
  try{
    const { data } = await axiosInstance.get(`${Package_Route.AGENT_PACKAGES}/${agent}`,
         {params});
     return data.packages; 
   }catch(err){
      console.log('Error in get packages :',err);
      throw new Error("Failed to Get Packages !");
   } 
 }
 async verifyPackage(packageId: string,value:string): Promise<boolean> {
      try{
         const response = await axiosInstance.patch(`${Package_Route.ADMIN_PACKAGES_VERIFY}/${packageId}`,{value});
         return response.status === 200;
      }catch (err: unknown) {
         console.error('Error in Verify Package !!', err);
         throw new Error('Failed to Verify Package!');
      }
   }
}

export default new Package();