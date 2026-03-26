import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVerificationStatus, submitVerification, updateProfile } from '../api/verification';
import toast from 'react-hot-toast';

export function useVerificationStatus() {
  return useQuery({ queryKey: ['verification-status'], queryFn: () => getVerificationStatus().then(r => r.data.data) });
}

export function useSubmitVerification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verification-status'] });
      toast.success('Verification submitted!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to submit verification'),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verification-status'] });
      toast.success('Profile updated successfully!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update profile'),
  });
}
