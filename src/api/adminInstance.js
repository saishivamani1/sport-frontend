import axios from 'axios';
import { getToken } from '../utils/auth';

const adminInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'https://sport-backend-1-1k8d.onrender.com'}/admin`,
  headers: { 'Content-Type': 'application/json' },
});

adminInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

adminInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(error);
  }
);

export default adminInstance;
