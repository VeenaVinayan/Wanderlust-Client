import axios, {AxiosInstance} from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_APP_BASEURL;
const axiosInstance : AxiosInstance = axios.create({
     baseURL : `${URL}/agent`,
     timeout : 10000,
     headers : {
          'Content-Type' : 'application/json',
     },
     withCredentials:true,
});

// Request interceptors to add the access token to the headers
axiosInstance.interceptors.request.use(
    (config) =>{
         const token = localStorage.getItem('Agent_accessToken');
         console.log(token);
         if(token){
             config.headers['Authorization']=`Bearer ${token}`;
         }
         return config;
    },
    (error) =>{
         return Promise.reject(error);
    }
);
// Response interceptors to handle errors and refresh the token if needed
axiosInstance.interceptors.response.use(
    (response) =>  response,
      async(error) =>{
       const originalRequest = error.config
       if(error.response?.status === 401 && !originalRequest._retry){
           originalRequest._retry = true;
           try{
                const { data } = await axios.post(
                     `${URL}/auth/refresh`,
                     {},
                     {withCredentials:true}
                );
                localStorage.setItem("Agent_accessToken",data.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
           }catch(refreshError){
             console.error("Refresh Token Expied or Invalid !!");
             localStorage.clear();
            //  const navigate = useNavigate();
            //  navigate("/login");
            window.location.href="/login"
             return Promise.reject(refreshError);
           }
       } 
       if(error.response.status === 401){
          toast.error('Permission Denied !');
       }
       if(error.response.status === 404){
         toast.error("The requested resource not found !");
       }
       if(error.response.status >= 500){
         toast.error(" Something went wrong..")
       }
       return Promise.reject(error);
    }
);

export default axiosInstance;