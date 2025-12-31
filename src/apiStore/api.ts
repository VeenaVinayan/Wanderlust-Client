import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_APP_BASEURL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || 'Unexpected error occurred';
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired or invalid');
        localStorage.removeItem("accessToken");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
   switch (status) {
      case 400:
        toast.error(`${message}`);
        break;
      case 403:
        toast.error(message);
        localStorage.removeItem("accessToken");
        window.location.assign("/login");
        break;
      case 404:
        toast.error(message);
        break;
      case 409:
        toast.error(message);
        break;
      default:
        if (status >= 500) {
          toast.error('Server Error: Please try again later.');
        }
      }
   return Promise.reject(error);
  }
);
export default axiosInstance;
