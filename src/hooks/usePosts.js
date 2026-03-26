import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeed, getMyPosts, submitPost } from '../api/posts';
import toast from 'react-hot-toast';

export function useFeed() {
  return useQuery({ queryKey: ['feed'], queryFn: () => getFeed().then(r => r.data.data) });
}

export function useMyPosts() {
  return useQuery({ queryKey: ['my-posts'], queryFn: () => getMyPosts().then(r => r.data.data) });
}

export function useSubmitPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      toast.success('Post submitted for review!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to submit post'),
  });
}
