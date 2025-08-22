import axios from 'axios';
import { error } from '@/utils/logger';

const backendURL: string = import.meta.env.VITE_BACKEND_URL;

if (!backendURL) throw new Error('Backend URL is missing');

const isDevelopment: boolean = import.meta.env.VITE_NODE_ENV === 'development';

const axiosInstance = axios.create({
  baseURL: backendURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: any) => {
    if (error.response) {
      error('Backend Error: ', error.response.data?.error);
    } else if (error.request) {
      error('Network Error: Could not reach server');
    } else {
      error('Error:', error.message);
    }

    return Promise.resolve(error);
  },
);

window.addEventListener('error', (err) => {
  if (isDevelopment) {
    const message = err instanceof Error ? err.message : String(err);
    error(message);
  }
});

export default axiosInstance;
