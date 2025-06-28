import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_APP_BASEURL;

const axiosInstance : AxiosInstance =axios.create({
     baseURL: `${URL}/admin`,
     timeout: 10000,
     headers : {
           'Content-Type' : 'application/json',
     },
     withCredentials: true,
});
axiosInstance.interceptors.request.use(
    (config) =>{
         const token = localStorage.getItem('Admin_accessToken');
         if(token){
             config.headers['Authorization'] = `Bearer ${token}`;
         }
         return config;
    },
    (error) =>{
         return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
     (response) => response,
     async (error) => {
         const originalRequest = error.config;
         if (!error.response) {
             console.error("Network Error or No Response from Server!");
             toast.error("Network Error! Please check your internet connection.");
             return Promise.reject(error);
         }
         if (error.response.status === 401 && !originalRequest._retry) {
             originalRequest._retry = true;
             try {
                 const { data } = await axios.post(
                     `${URL}/auth/refresh`,
                      { withCredentials: true }
                 );
                 console.log("New Access Token ::: ",data,data.accessToken)  
                 localStorage.setItem("Admin_accessToken", data.accessToken);
                 originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                 return axiosInstance(originalRequest);
             } catch (refreshError) {
                 console.error("Refresh Token Expired or Invalid!");
                 localStorage.removeItem("admin_accessToken");
                 window.location.assign("/login"); // Redirect to login
                 return Promise.reject(refreshError);
             }
         }
       if (error.response.status === 403) {
             toast.error("Permission Denied!");
             localStorage.removeItem("admin_accessToken");
             window.location.assign('/login');
        } else if (error.response.status === 404) {
             toast.error("The requested resource was not found!");
         } else if (error.response.status >= 500) {
             toast.error("Something went wrong. Please try again later.");
         }else if(error.respone.status === 400){
             toast.error("Invalid OTP !!");
         }
         return Promise.reject(error);
     }
 );
export default axiosInstance;