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

  (err: any) => {
    if (err.response) {
      error('Backend Error: ', err.response.data?.error);
    } else if (err.request) {
      error('Network error: Unable to reach server');
    } else {
      error('Error:', err.message);
    }

    return Promise.resolve(err);
  },
);

window.addEventListener('error', (err) => {
  if (isDevelopment) {
    const message = err instanceof Error ? err.message : String(err);
    error(message);
  }
});

export default axiosInstance;
