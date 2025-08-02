import axiosInstance from '../apiStore/authApi';
import { AgentFormDataType, FormDataType } from '../types/formTypes';

class AuthApi{
     async userLogin(email:string,password : string){
         try{ 
            const res= await axiosInstance.post('/login',{email,password});
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
             const response = await axiosInstance.post('/forgotPassword',{email});
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
             const { data } = await axiosInstance.post('/register',{email});
             console.log('Response from Agent Registration : ', data);
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
             const  response  =await axiosInstance.post('/resetPassword',{password,token});
             console.log('Resposne from reset password : ', response.data);
             return response;
         }catch(err: unknown){
             if(err instanceof Error){
                 console.error('Error in Reset Password !',err.message);
             }
         }
     }
     async otpVerification(otp: string,data:FormDataType | AgentFormDataType,user:string){
         try{
             const response = await axiosInstance.post('/otp',{otp,data,user});
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
             const { data } = await axiosInstance.post('/resendOtp',{email});
             return data;
         }catch(err : unknown){
             if(err instanceof Error){
                    console.error('Error in Resend OTP !', err.message);
             }
         }
     }
     async logoutUser(){
         try{
            console.log("Logout user !!");
            const response = await axiosInstance.post('/logout');
            console.log('Response from Logout User : ',response);
            return response
         }catch(err: unknown){
             if(err instanceof Error){
                 console.error('Error in Logout User !', err.message);
             }
             throw err;
         }  
     }
   }
   
export default new AuthApi();
