import axios from 'axios';
import 'dotenv/config';

if (!process.env.BACKEND_URL) throw new Error('Backend URL is missing');

const backendURL = process.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

process.on('uncaughtException', (error: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    const message = error instanceof Error ? error.message : String(error);
    console.log(message);
  }

  process.exit(1);
});

export default axiosInstance;
