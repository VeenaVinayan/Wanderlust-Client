import apiHelper from "../../helper/authApi";
import { AgentFormDataType, FormDataType } from "../../types/formTypes";

 export const loginUser= async(email: string, password: string) => {
   try {
      const response = await apiHelper.userLogin(email, password);
      return response;
   } catch (err) {
      console.error('Error in User Login !!', err);
      return null;
   }    
}
export const passwordForget = (password: string) =>{
     try{
         const response = apiHelper.forgotPassword(password);
         return response;
     }catch(err : unknown){
         if(err instanceof Error){
             console.error('Error in Forgot Password !!', err.message);
         }
         throw err;
     }
}

export const registerUser = async(email: string) =>{
     try{
            return await apiHelper.agentRegister(email);
       }catch(err: unknown){
         if(err instanceof Error){
             console.error('Error in Agent Registration !!', err.message);
         }
         throw err;  
     }  
}

export const resetPassword = async(password : string,token: string) =>{
     try{
            const data = await apiHelper.resetPassword(password,token);;
            return data;
     }catch(err : unknown){
         if(err instanceof Error){
             console.error('Error in Reset Password !!', err.message);
         }
     }
}

export const  otpVerification = async (otp : string,data: FormDataType | AgentFormDataType, user:string) =>{
     try{
         const res = await apiHelper.otpVerification(otp,data,user);
         return res;
     }catch(err: unknown){
         if(err instanceof Error){
             console.error('Error in OTP Verification !!', err.message);    
         }
     }
}

export const resendOtp = async(email :string) =>{
     try{
            const res = await apiHelper.resendOtp(email);
            return res;
     }catch(err: unknown){
         if(err instanceof Error){
                console.error('Error in Resend OTP !!', err.message);
                throw err;
         }
     }
}
export const logoutUser = async (): Promise<boolean> => {
     try{
        console.log("Logout user !!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        const  data  = await apiHelper.logoutUser();
        console.log("Data :: ",data);
        if(data.status === 204) {
            return true;
        } else {
            return false;
        }
     }catch(err: unknown){
        if(err instanceof Error){
            console.error('Error in User Logout !!', err.message);
        }
        return false;
     }
}
