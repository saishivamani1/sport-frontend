import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPendingVerifications, approveVerification, rejectVerification, getPendingPosts, approvePost, rejectPost } from '../api/admin';
import toast from 'react-hot-toast';

export function usePendingVerifications() {
  return useQuery({ queryKey: ['pending-verifications'], queryFn: () => getPendingVerifications().then(r => r.data.data) });
}

export function useVerificationAction() {
  const queryClient = useQueryClient();
  const approve = useMutation({
    mutationFn: approveVerification,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pending-verifications'] }); toast.success('Verified!'); },
    onError: () => toast.error('Failed to approve'),
  });
  const reject = useMutation({
    mutationFn: rejectVerification,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pending-verifications'] }); toast.success('Rejected'); },
    onError: () => toast.error('Failed to reject'),
  });
  return { approve, reject };
}

export function usePendingPosts() {
  return useQuery({ queryKey: ['pending-posts'], queryFn: () => getPendingPosts().then(r => r.data.data) });
}

export function usePostModeration() {
  const queryClient = useQueryClient();
  const approve = useMutation({
    mutationFn: approvePost,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pending-posts'] }); toast.success('Post approved!'); },
    onError: () => toast.error('Failed to approve post'),
  });
  const reject = useMutation({
    mutationFn: rejectPost,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['pending-posts'] }); toast.success('Post rejected'); },
    onError: () => toast.error('Failed to reject post'),
  });
  return { approve, reject };
}
