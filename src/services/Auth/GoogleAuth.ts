import axiosInstance from "../../apiStore/authApi";

const  googleAuth = async (code : string) =>{
   const response = await axiosInstance.get(`/google?code=${code}`);
   return response.data;
}

export default googleAuth;
