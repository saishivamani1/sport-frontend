import axiosInstance from './axiosInstance';

export const getVerificationStatus = () => axiosInstance.get('/verification/status');
export const submitVerification = (data) => axiosInstance.post('/verification/submit-id', data);
export const updateProfile = (data) => axiosInstance.put('/profile', data);
