import axios, { AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

const URL = import.meta.env.VITE_APP_BASEURL;

console.log(`URL :: ${URL}`);
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
             console.log(error);
             switch(error.response.status) {
                 case 400:
                     toast.error(error.response.data.message);
                     break;
                 case 401:
                     toast.error(error.response.data.message);
                     break;
                case 403:
                     toast.error(error.response.data.message);
                     break;
                case 404:
                     toast.error(error.response.data.message);
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