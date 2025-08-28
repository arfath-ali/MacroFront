import axios from 'axios';
import { logError } from '@/utils/logger';

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
      logError('Backend Error: ', err.response.data?.error);
    } else if (err.request) {
      logError('Network error: Unable to reach server');
    } else {
      logError('Error:', err.message);
    }

    return Promise.reject(err);
  },
);

window.addEventListener('error', (err) => {
  if (isDevelopment) {
    const message = err instanceof Error ? err.message : String(err);
    logError(message);
  }
});

export default axiosInstance;
