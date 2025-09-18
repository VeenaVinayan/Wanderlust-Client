import axiosInstance from '../apiStore/authApi';
import { AgentFormDataType, FormDataType } from '../types/formTypes';
import { Auth_Route } from '../Constants/RouteValues';

class Auth{
     async userLogin(email:string,password : string){
         try{ 
            const res= await axiosInstance.post(`${Auth_Route.LOGIN}`,{email,password});
            return res.data;
         }catch(err : unknown){
             if(err instanceof Error){
                 console.error('Error in User Login !!', err.message);
             }
             throw err;
        } 
     }
     async forgotPassword(email: string){
        try{
             const response = await axiosInstance.post(`${Auth_Route.FORGOT_PASSWORD}`,{email});
             return response.data;
        }catch(err : unknown){
             if(err instanceof Error){
                 console.log('Error in Forgot Password !!', err.message);
             }
             throw err;
        }
     }
     async agentRegister(email :string){
         try{
             const { data } = await axiosInstance.post(`${Auth_Route.REGISTER}`,{email});
             return data;
         }catch(err: unknown){
                if(err instanceof Error){
                    console.error('Error in Agent Registration !!', err.message);
                }
                throw err;  
         }
     }
     async resetPassword(password: string, token: string){
         try{
             const  response  =await axiosInstance.post(`${Auth_Route.RESET_PASSWORD}`,{password,token});
             return response;
         }catch(err: unknown){
             if(err instanceof Error){
                 console.error('Error in Reset Password !',err.message);
             }
         }
     }
     async otpVerification(otp: string,data:FormDataType | AgentFormDataType,user:string){
         try{
             const response  = await axiosInstance.post(`${Auth_Route.OTP}`,{otp,data,user});
             return response.data;
         }catch(err: unknown){
             if(err instanceof Error){
                console.error('Error in OTP Verification !', err.message);
             }
             throw err;
         }
     }
     async resendOtp(email : string){
         try{
             const { data } = await axiosInstance.post(`${Auth_Route.RESEND_OTP}`,{email});
             return data;
         }catch(err : unknown){
             if(err instanceof Error){
                    console.error('Error in Resend OTP !', err.message);
             }
         }
     }
     async logoutUser(){
         try{
            const response = await axiosInstance.post(`${Auth_Route.LOGOUT}`);
            return response
         }catch(err: unknown){
             if(err instanceof Error){
                 console.error('Error in Logout User !', err.message);
             }
             throw err;
         }  
     }
   }
   
export default new Auth();
