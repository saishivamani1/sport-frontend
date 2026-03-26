import axiosInstance from './axiosInstance';

export const getAthletes = (params) => axiosInstance.get('/athletes', { params });
export const getAthleteById = (id) => axiosInstance.get(`/athletes/${id}`);
