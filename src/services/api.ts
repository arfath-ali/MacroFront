import axios from 'axios';

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

window.addEventListener('error', (error) => {
  if (isDevelopment) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(message);
  }
});

export default axiosInstance;
