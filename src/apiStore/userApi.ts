import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const URL = import.meta.env.VITE_APP_BASEURL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${URL}/user`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor – add access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('User_accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || 'Unexpected error occurred';

    // Handle token refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem('User_accessToken', data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired or invalid');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    switch (status) {
      case 400:
        toast.error(`Bad Request: ${message}`);
        break;
      case 401:
        toast.error(message);
        break;
      case 403:
        toast.error(message);
        localStorage.removeItem("User_accessToken");
        window.location.assign("/login");
        break;
      case 404:
        toast.error(`Not Found: ${message}`);
        break;
      case 409:
        toast.error(`Conflict: ${message}`);
        break;
      default:
        if (status >= 500) {
          toast.error('Server Error: Please try again later.');
        } else {
          toast.error(`Error ${status}: ${message}`);
        }
    }
   return Promise.reject(error);
  }
);

export default axiosInstance;
