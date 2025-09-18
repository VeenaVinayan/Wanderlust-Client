import axiosInstance  from "../../apiStore/api";
import { TUserUpdateData, TResetPassword } from "../../types/userTypes";

export const updateProfile = async ( data : TUserUpdateData,userId : string) =>{
        const response = await axiosInstance.patch(`/user/users/update/${userId}`, data);
         if(response.status === 200){
           return response.data;
        }
    }


export const resetPassword = async (password: TResetPassword, userId: string) => {
  try {
    const response = await axiosInstance.patch(`/user/users/update-password/${userId}`, password);
    return response.data; 
  } catch (error: unknown) {
    console.log('Error occurred in reset password!', error);
    return error || { message: 'Unexpected error occurred' };
  }
};
