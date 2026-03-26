import axiosInstance from './axiosInstance';

export const loginApi = (credentials) => axiosInstance.post('/auth/login', credentials);
export const registerApi = (data) => axiosInstance.post('/auth/register', data);
export const getCurrentUserApi = () => axiosInstance.get('/auth/me');
