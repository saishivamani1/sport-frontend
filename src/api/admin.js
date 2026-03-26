import adminInstance from './adminInstance';
import axiosInstance from './axiosInstance';

export const getPendingVerifications = () => adminInstance.get('/verifications/pending');
export const approveVerification = (id) => adminInstance.put(`/verifications/${id}/approve`);
export const rejectVerification = ({ id, reason }) =>
  adminInstance.put(`/verifications/${id}/reject`, null, { params: { reason } });

export const getPendingPosts = () => adminInstance.get('/posts/pending');
export const approvePost = (id) => adminInstance.put(`/posts/${id}/approve`);
export const rejectPost = ({ id, reason }) =>
  adminInstance.put(`/posts/${id}/reject`, null, { params: { reason } });

export const createTournament = (data) => axiosInstance.post('/tournaments', data);
