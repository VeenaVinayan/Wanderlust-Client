import axiosInstance  from "../../apiStore/api";
import { TUserUpdateData, TResetPassword } from "../../types/userTypes";

export const updateProfile = async ( data : TUserUpdateData,id : string) =>{
    try{
        console.log("Inside user update profile  !",id);
        const response = await axiosInstance.patch(`/user/users/update/${id}`, data);
        console.log('REsponse is ::',response.data);
        if(response.status === 200){
           return response.data;
        }
    }catch(err:unknown){
        console.log("Error in update profile !",err);
    }
}


export const resetPassword = async (password: TResetPassword, id: string) => {
  try {
    console.log("Inside password reset service ::", password, id);
    const response = await axiosInstance.patch(`/user/users/update-password/${id}`, password);
    console.log('Response in reset password:', response.data);
    return response.data; // Return response on success
  } catch (error: unknown) {
    console.log('Error occurred in reset password!', error);
    return error || { message: 'Unexpected error occurred' };
  }
};
