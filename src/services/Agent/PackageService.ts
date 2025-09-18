import {  TPackage, TPackageData, TPackageValue,TPackageUpload} from "../../types/packageTypes";
import packageApi from "../../helper/packageApi";
import { SearchParams, TCategoryValue } from "../../types/agentTypes";
import { TSignedUrl } from "../../types/agentTypes";

export const addPackage =  async (packageData : TPackageValue) =>{
    try{
        const imageTypes = packageData.images.map((image) => String(image.type));
        const{ data } = await packageApi.getSignedUrl(imageTypes);
        const urls = data.map((value: TSignedUrl) => value.signedUrl);
        const result = await packageApi.uploadToS3(urls,packageData.images,imageTypes)
        if(result) {
            const newUrls = data.map(((url:TSignedUrl) => url.publicUrl));
            packageData.images = newUrls;
            const packages: TPackageUpload = { ...packageData, images: newUrls };
            const response =  packageApi.addPackage(packages);
            return response;
        }
    }catch(err){
        console.log('Error in add package !!',err);
        throw err;
    }
}
export const getCategories = async ():Promise<TCategoryValue[]> =>{
    const response = await packageApi.getCategories();
    return response;
}
export const editPackage = async (packageData: TPackage, images: File[], deleteImage : string[]): Promise<string> => {
    try {
       const imageTypes = images.map((image) => String(image.type));
       if(deleteImage.length >0){
        await  packageApi.deleteS3Image(deleteImage);
      }
       if(images.length>0){
         const { data } = await packageApi.getSignedUrl(imageTypes);
         const urls = data.map((value: TSignedUrl) => value.signedUrl);
         const result = await packageApi.uploadToS3(urls,images,imageTypes);
         if(result){
            const newUrls = data.map(((url:TSignedUrl) => url.publicUrl));
            packageData.images = [...packageData.images,...newUrls ];
          }else{
             return " S3 upload Error!";
          }
       }
       await packageApi.packageEdit(packageData._id, packageData);
       return " Updated";
    }catch (err) {
       console.error("Error editing package:", err);
       throw err;
    }
 };
export const agentDeletePackage = async (packageId : string):Promise<boolean> =>{
     try{ 
         const response = await packageApi.deletePackageByAgent(packageId);
         if(response) return true;
         else return false;
      }catch(err : unknown){
          console.log(" Error in Delete package ::",err);
          return false;
      }
 }
 export const getPackages = async(agent : string,params: SearchParams): Promise<TPackageData | undefined> => {
     try{
         const response : TPackageData= await packageApi.getPackages(agent,params);
         return response;
     }catch(err){
        console.log('Error in get packages ::',err);
     }
 }

