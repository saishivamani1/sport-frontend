import axiosInstance from './axiosInstance';

export const getFeed = () => axiosInstance.get('/posts/feed');
export const getMyPosts = () => axiosInstance.get('/posts/my-posts');
export const submitPost = (data) => axiosInstance.post('/posts/submit', data);
