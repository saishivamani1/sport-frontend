import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTournaments, 
  getTournamentById, 
  applyToTournament, 
  createTournament,
  getAllApplications,
  getApplicationsByTournament,
  approveApplication,
  rejectApplication
} from '../api/tournaments';
import toast from 'react-hot-toast';

export function useTournaments() {
  return useQuery({ queryKey: ['tournaments'], queryFn: () => getTournaments().then(r => r.data.data) });
}

export function useTournament(id) {
  return useQuery({ queryKey: ['tournament', id], queryFn: () => getTournamentById(id).then(r => r.data.data), enabled: !!id });
}

export function useApplyToTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyToTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast.success('Applied to tournament successfully!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to apply'),
  });
}

export function useCreateTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast.success('Tournament created!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create tournament'),
  });
}

export function useAdminApplications(tournamentId = null) {
  return useQuery({ 
    queryKey: ['admin-applications', tournamentId], 
    queryFn: () => (tournamentId ? getApplicationsByTournament(tournamentId) : getAllApplications()).then(r => r.data.data) 
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, approve }) => approve ? approveApplication(id) : rejectApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
      toast.success('Application status updated');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });
}
