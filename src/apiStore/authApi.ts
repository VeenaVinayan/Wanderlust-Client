import axios, { AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

const URL = import.meta.env.VITE_APP_BASEURL;

const axiosInstance : AxiosInstance = axios.create({
     baseURL: `${URL}/auth`,
     timeout: 10000,
     headers : { 
        'Content-Type' : 'application/json',
     },
     withCredentials:true,
});
axiosInstance.interceptors.response.use(
    
    (response) => response,
    (error) =>{
          
         if(error.response) {
             const message =
                   error.response?.data?.message || error.message || 'Unexpected error occurred';
             switch(error.response.status) {
                 case 400:
                     toast.error(message);
                     break;
                 case 401:
                     toast.error(message);
                     break;
                case 403:
                     toast.error(message);
                     break;
                case 404:
                     toast.error(message);
                     break;
                case 409:
                      toast.error(message);
                      break;
                case 500:
                    toast.error("Internal Server Error !");
                    break;
                default:
                    toast.error('An unexpected Error occured !');                       
             }
         }else if(error.request){
             toast.error("unexpected error :");
         }else{
             toast.error("Unexpected Error !");
         }
         return Promise.reject(error);
      }
)

export default axiosInstance;