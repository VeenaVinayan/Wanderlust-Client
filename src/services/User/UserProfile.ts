import axiosInstance  from "../../apiStore/api";
import { TUserUpdateData, TResetPassword } from "../../types/userTypes";

export const updateProfile = async ( data : TUserUpdateData,userId : string) =>{
    try{
         const response = await axiosInstance.patch(`/user/users/update/${userId}`, data);
        console.log('REsponse is ::',response.data);
        if(response.status === 200){
           return response.data;
        }
    }catch(err:unknown){
        console.log("Error in update profile !",err);
    }
}


export const resetPassword = async (password: TResetPassword, userId: string) => {
  try {
    const response = await axiosInstance.patch(`/user/users/update-password/${userId}`, password);
    console.log('Response in reset password:', response.data);
    return response.data; 
  } catch (error: unknown) {
    console.log('Error occurred in reset password!', error);
    return error || { message: 'Unexpected error occurred' };
  }
};
