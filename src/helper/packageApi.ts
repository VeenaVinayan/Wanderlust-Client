import axiosInstance  from "../apiStore/api";
import { TPackageData , TPackage, TPackageUpload} from "../types/packageTypes";
import { SearchParams, TCategoryValue } from "../types/agentTypes";
import axios from "axios";

class PackageApi{
   async addPackage(packageData : TPackageUpload): Promise<boolean>{
         console.log(" DAta is :",packageData);
         const response = await axiosInstance.post('/agent/packages',packageData);
         return response.data;
    }
   async getCategories(): Promise<TCategoryValue[]> {
        console.log('Get Category :::');
        const response = await axiosInstance.get('/agent/categories');
        console.log("REsponse is",response.data.categories);
        return response.data.categories; 
    }
   async getSignedUrl(imageTypes: string[]) {
       const{ data } = await axiosInstance.post("/agent/getPresignedUrls",{
            fileTypes: imageTypes
       });
       return data;
     }
   async uploadToS3(urls: string[], images: File[], imageTypes: string[]) {
    console.log("Arguments in function  ::", urls, images, imageTypes);
    try {
      const res = await Promise.all(
          urls.map((url, index) => {  
              console.log('Current Url ::',url,index);
              axios.put(url, images[index], {
                  headers: { "Content-Type": imageTypes[index] }
              })
            }
          )
        );
      console.log('Response ::', res);
      return res;
  } catch (error : unknown) {
      console.error('Error uploading to S3:', error);
      throw error;
  }
 }
 async packageEdit(packageId : string,packageData: TPackage): Promise<boolean>{
   try{
        console.log('Edit package !!');
        const response = await axiosInstance.patch(`/agent/edit-package/${packageId}`,packageData);
        return response.status === 200 ;
     }catch(err : unknown){
      console.error('Error in Edit-package',err);
      throw new Error("Failed to Edit Packages !!");
   }
 }
 async deleteS3Image(deleteImages : string[]):Promise<void> {
    try{
        const res = await axiosInstance.patch('/agent/delete-image',deleteImages);
        console.log('Response ::',res);
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
      console.log('Get Packages :::');
      const response = await axiosInstance.get(`/agent/packages/${agent}`,
         {params});
      console.log("REsponse is",response.data);
      return response.data.data; 
   }catch(err){
      console.log('Error in get packages :',err);
      throw new Error("Failed to Get Packages !");
   } 
 }
 async verifyPackage(packageId: string,value:string): Promise<boolean> {
      try{
         console.log('Verify Package !!');
         const response = await axiosInstance.patch(`/admin/packages/verify/${packageId}`,{value});
         return response.status === 200;
      }catch (err: unknown) {
         console.error('Error in Verify Package !!', err);
         throw new Error('Failed to Verify Package!');
      }
   }
}

export default new PackageApi();