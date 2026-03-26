import axiosInstance from './axiosInstance';

export const getTournaments = () => axiosInstance.get('/tournaments');
export const getTournamentById = (id) => axiosInstance.get(`/tournaments/${id}`);
export const applyToTournament = (id) => axiosInstance.post(`/tournaments/${id}/apply`);
export const createTournament = (data) => axiosInstance.post('/tournaments', data);

export const getAllApplications = () => axiosInstance.get('/tournaments/admin/applications');
export const getApplicationsByTournament = (tournamentId) => axiosInstance.get(`/tournaments/admin/tournaments/${tournamentId}/applications`);
export const approveApplication = (id) => axiosInstance.put(`/tournaments/admin/applications/${id}/approve`);
export const rejectApplication = (id) => axiosInstance.put(`/tournaments/admin/applications/${id}/reject`);
