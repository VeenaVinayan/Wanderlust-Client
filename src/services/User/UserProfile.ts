import axiosInstance  from "../../apiStore/userApi";
import { TUserUpdateData, TResetPassword } from "../../types/userTypes";

export const updateProfile = async ( data : TUserUpdateData,id : string) =>{
    try{
        console.log("Inside user update profile  !",id);
        const response = await axiosInstance.patch(`/user/update/${id}`, data);
        console.log('REsponse is ::',response.data);
        if(response.status === 200){
           return response.data;
        }
    }catch(err:any){
        console.log("Error in update profile !",err);
    }
}

// export const resetPassword = async (password :TResetPassword , id: string) =>{
//      try{
//           console.log("INside password reset service ::",password,id);
//           const response = await axiosInstance.patch(`/user/update-password/${id}`,password);
//          response.data;
//       }catch(err){
//          console.log('Error occured in reset password !', err);
//          return error.response.data;
//       }
// }
export const resetPassword = async (password: TResetPassword, id: string) => {
  try {
    console.log("Inside password reset service ::", password, id);
    const response = await axiosInstance.patch(`/user/update-password/${id}`, password);
    console.log('Response in reset password:', response.data);
    return response.data; // Return response on success
  } catch (error: any) {
    console.log('Error occurred in reset password!', error);
    return error.response?.data || { message: 'Unexpected error occurred' };
  }
};
