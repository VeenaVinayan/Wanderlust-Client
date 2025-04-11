import axiosInstance from "../../apiStore/adminApi";
import { PER_PAGE } from '../../Constants/User';
import { DataResponse } from "../../types/userTypes";
import { TCategory } from '../../types/categoryTypes';
import axios from 'axios';
import apiHelper from "../../helper/apiHelper";
import { TPackageData } from "../../types/packageTypes";
import { SearchParams } from '../../types/agentTypes';

export const fetchData = async (user: string,page: number =1, params: SearchParams): Promise< DataResponse | null> => {
  try {
    const response = await axiosInstance.get(`getData/${user}/${PER_PAGE}/${page}`,{params});
    return response.data.users;
  } catch (err) {
    console.error("Error in API call for Fetch User!", err);
    return null;
  }
};
export const adminLogout = async (): Promise<void> =>{
   localStorage.removeItem("Admin_accessToken");
   console.log('Inside logout from service !!');
}

export const blockOrUnblock = async (id: string, role : string)=>{
    console.log('Block or Unblock !');
   try{
        const response = await axiosInstance({
        method:'patch',
        url:'/blockOrUnblock',
             data:{
              id,
              role
            }
        })
        return response.status ===200 ? true :false;
    }catch(err){
      console.log(err);
    } 
}
export const createCategory = async (category: TCategory) => {
  try {
    const isExist = await apiHelper.isExistCategory(category.name);
    if (!isExist) return false;

    console.log("Category details ::", category.image.type, category.name, category.description);
    const { data } = await axiosInstance.post("/getPresignedUrl", {
      fileType: category.image.type,
    });

    const { signedUrl, publicUrl } = data.response;
    console.log("Signed URL:", signedUrl);

    const uploadResponse = await axios.put(signedUrl, category.image, {
      headers: { "Content-Type": category.image.type },
    });
    
   if(uploadResponse.status !== 200) {
      console.error("Failed to upload image to S3.");
      return false;
    }
    console.log('Here is the Error !!--- !!!');
    console.log('Here hellooooo ---- !!!');
    category.image = publicUrl;
    const res = await axiosInstance.post("addCategory", category);
    return res.status === 200 ? res : false;
  }catch (err) {
    console.error("Error in createCategory:", err);
    return false;
  }
};

export const  fetchAllCategory = async (page : number,params: SearchParams) => {
    try{
      const response = await axiosInstance.get(`/categories/${PER_PAGE}/${page}`,{params});
      if(response.status === 200){
          return response.data;
      }
    }catch(err: unknown){
      console.error("Error in fetch category !!",err);
    }
 }
 export const deleteCategoryById = async (categoryId : string) =>{
       console.log('Delete category !!');  
       const res = await apiHelper.deleteCategory(categoryId); 
       console.info(' Response :: ',res);
       if(res){
          return true;
       }else{
          return false;
      }
  } 
export const editCategoryById = async (category : Category) =>{
  try{ 
   console.log("Category :: Values  ",category);
   if(category.image instanceof File){
      console.log("It's a file !! ",category.image);
      const  { data } = await axiosInstance.post("/getPresignedUrl", {
          fileType:category.image.type
      })
     const { signedUrl, publicUrl } = data.response;
      const uploadResponse = await axios.put(signedUrl,category.image,{
          headers: {"Content-Type":category.image.type}
      });
      if(uploadResponse.status !==200){
         console.error("Failed to Upload Image to S3 !");
         return false;
      }
      category.image=publicUrl;
    }
    console.log('Before Api Call !');
    const res = await axiosInstance.patch(`/category-edit/${category.id}`,category);
    return res.status === 200 ? res : false;
    
  }catch(err){
       console.error("Error in Edit Category !!",err);
       return false;
    }
}

export const fetchPendingAgents = async (page : number) =>{
   try{
        console.log(' Fetch Pending Agent data !!');
        const response = await apiHelper.fetchPendingAgentData(page);
        console.log('Data is ::',response.agentData);
        return response.agentData;  
   }catch(err){
        console.error('Error in Fetch Pending Data !!',err);
        return null;
   }
}

export const approveAgent = async(agentId : string) =>{
   try{
       const response = await apiHelper.agentApproval(agentId);
       return response;
   }catch(err){
     console.error('Error in approve Agent !!',err);
     return null;
   }
}
export const rejectAgentRequest = async(agentId : string) =>{
  try{
    const response = await apiHelper.agentApproval(agentId);
    return response;
}catch(err){
  console.error('Error in approve Agent !!',err);
  return null;
 }
}
export const blockPackage = async(packageId : string): Promise<boolean> => {
   try{
      console.log('Delete Package ::',packageId);
      const response = apiHelper.blockPackage(packageId);
      return response;
   }catch(err){
      console.error('Error in delete Pacakge :',err);
      return false;
   }
}

export const getPackages = async (page: number, params: SearchParams) : Promise<TPackageData> =>{
    const response : TPackageData = await apiHelper.getPackages(page,params);
    return response;
}



