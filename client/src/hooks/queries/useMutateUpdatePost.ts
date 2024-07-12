import {useMutation} from '@tanstack/react-query';
import {updatePost} from '@/api';
import queryClient from '@/api/query-client';
import {queryKeys} from '@/constants';

function useMutateUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.GET_CALENDAR_POSTS,
          new Date(newPost.date).getFullYear(),
          new Date(newPost.date).getMonth() + 1,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.setQueryData([queryKeys.POST, newPost.id], newPost);
    },
  });
}

export default useMutateUpdatePost;
