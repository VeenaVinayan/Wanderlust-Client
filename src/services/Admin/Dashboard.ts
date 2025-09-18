import axiosInstance from "../../apiStore/api";
import { PER_PAGE } from '../../Constants/User';
import { DataResponse } from "../../types/userTypes";
import { TCategory, TCategoryData , TCategoryValue} from '../../types/categoryTypes';
import axios from 'axios';
import Helper from "../../helper/apiHelper";
import { TPackageData } from "../../types/packageTypes";
import { SearchParams } from '../../types/agentTypes';
import packages from "../../helper/packageApi";

export const fetchData = async (user: string,page:number,params: SearchParams): Promise< DataResponse | null> => {
  try {
    const response = await axiosInstance.get(`/admin/users/${user}/${PER_PAGE}/${page}`,{params});
    return response.data.users;
  } catch (err) {
    console.error("Error in API call for Fetch User!", err);
    return null;
  }
};
export const adminLogout = async (): Promise<void> =>{
   localStorage.removeItem("accessToken");
   localStorage.removeItem("userId");
}
export const blockOrUnblock = async (userId: string, role : string)=>{
   try{
        const response = await axiosInstance({
        method:'patch',
        url:'/admin/blockOrUnblock',
             data:{
              userId,
              role
            }
        })
        return response.status ===200 ? true :false;
    }catch(err){
      console.log(err);
    } 
}
export const createCategory = async (category: TCategoryData) => {
  try {
    const isExist = await Helper.isExistCategory(category.name);
    if (!isExist) return false;
    if (category.image && category.image instanceof File)
      console.log("Category details ::", category.image.type, category.name, category.description);
    const { data } = await axiosInstance.post("/admin/getPresignedUrl", {
      fileType: category.image.type,
    });

    const { signedUrl, publicUrl } = data.response;
    const uploadResponse = await axios.put(signedUrl, category.image, {
      headers: { "Content-Type": category.image.type },
    });
   if(uploadResponse.status !== 200) {
      return false;
    }
     const categoryValue : TCategoryValue ={
        name:category.name,
        description:category.description,
        image:publicUrl,
     }
    const res = await axiosInstance.post("/admin/addCategory", categoryValue);
    return res.status === 200 ? res : false;
  }catch (err) {
    console.error("Error in createCategory:", err);
    return false;
  }
};

export const  fetchAllCategory = async (params: SearchParams) => {
    try{
      const response = await axiosInstance.get(`/admin/categories`,{params});
      if(response.status === 200){
          return response.data;
      }
    }catch(err: unknown){
      console.error("Error in fetch category !!",err);
    }
 }
 export const deleteCategoryById = async (categoryId : string) =>{
       const res = await Helper.deleteCategory(categoryId); 
       if(res){
          return true;
       }else{
          return false;
      }
  } 
  export const uploadImageCategoryEdit = async (image : File) : Promise<string>=>{
      try{
          const  { data } = await axiosInstance.post("/admin/getPresignedUrl", {
          fileType:image.type 
            })
          const { signedUrl, publicUrl } = data.response;
          const uploadResponse = await axios.put(signedUrl,image,{
                         headers: {"Content-Type":image.type}
          });
        if(uploadResponse.status !==200){
          return "";
      }
      return publicUrl;
     }catch(err){
        console.log("Error occured ::",err);
        throw err;
      }
  }
   
export const editCategoryById = async (category : TCategory) =>{
  try{ 
    const res = await axiosInstance.patch(`/admin/category-edit/${category._id}`,category);
    return res.status === 200 ? res : false;
  }catch(err){
       console.error("Error in Edit Category !!",err);
       return false;
  }
}

export const fetchPendingAgents = async (params:SearchParams) =>{
   try{
        const { agentData } = await Helper.fetchPendingAgentData(params);
        return agentData;  
   }catch(err){
        console.error('Error in Fetch Pending Data !!',err);
        return null;
   }
}

export const approveAgent = async(agentId : string) =>{
   try{
       const response = await Helper.agentApproval(agentId);
       return response;
   }catch(err){
     console.error('Error in approve Agent !!',err);
     return null;
   }
}
export const rejectAgentRequest = async(agentId : string) =>{
  try{
    const response = await Helper.agentApproval(agentId);
    return response;
}catch(err){
  console.error('Error in approve Agent !!',err);
  return null;
 }
}
export const blockPackage = async(packageId : string): Promise<boolean> => {
   try{
      const response = Helper.blockPackage(packageId);
      return response;
   }catch(err){
      console.error('Error in delete Pacakge :',err);
      return false;
   }
}

export const getPackages = async (params: SearchParams) : Promise<TPackageData> =>{
    const response : TPackageData = await Helper.getPackages(params);
    return response;
}


export const getDashboard = async() => {
  const response = await Helper.getDashboard();
  return response;
}

export const verifyPackage = async (packageId : string,value: string) =>{
   try{
      const response = await packages.verifyPackage(packageId,value);
      return response;
   }catch(err){
      console.error('Error in verify Package !!',err);
      return err;  
   }
}
