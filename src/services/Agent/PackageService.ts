import {  TPackage, TPackageData, TPackageUpdate} from "../../types/packageTypes";
import packageApi from "../../helper/packageApi";
import { SearchParams, TCategoryValue } from "../../types/agentTypes";
import { TSignedUrl } from "../../types/agentTypes";

export const addPackage =  async (packageData : TPackage) =>{
    try{
        console.log('Package Details ::',packageData);
        //const isExist = await packageApi.
        //  const imageTypes = packageData.images.map((image => String(image.type)));
        const imageTypes = packageData.images.map((image) => String(image.type));
        console.log("Image types:", imageTypes);
        const{ data } = await packageApi.getSignedUrl(imageTypes);
        const urls = data.map((value: TSignedUrl) => value.signedUrl);
        const result = await packageApi.uploadToS3(urls,packageData.images,imageTypes)
        if(result) {
            console.log('Result from S3:: ',result);
            const newUrls = data.map(((url:TSignedUrl) => url.publicUrl));
            console.log('Public Urls ::',newUrls);
            packageData.images = newUrls;
            const response =  packageApi.addPackage(packageData);
            return response;
        }
    }catch(err){
        console.log('Error in add package !!',err);
    }
}
export const getCategories = async ():Promise<TCategoryValue[]> =>{
    console.log('Get Categories ....');
    const response = await packageApi.getCategories();
    return response;
}
export const editPackage = async (packageData: TPackage, images: File[], deleteImage : string[]): Promise<string> => {
    try {
       console.log(" Package Data in service ::",packageData,images);  
       const imageTypes = images.map((image) => String(image.type));
       console.log("Image Types :: ",imageTypes)
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
 export const getPackages = async(page : number ,params: SearchParams): Promise<TPackageData | undefined> => {
     try{
         const response : TPackageData= await packageApi.getPackages(page,params);
         return response;
     }catch(err){
        console.log('Error in get packages ::',err);
     }
 }

