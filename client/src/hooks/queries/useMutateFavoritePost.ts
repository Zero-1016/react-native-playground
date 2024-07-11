import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';
import {updateFavoritePost} from '@/api';
import queryClient from '@/api/query-client';
import {queryKeys} from '@/constants';

function useMutateFavoritePost(mutateOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: (updateId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.FAVORITE,
          queryKeys.GET_FAVORITE_POSTS,
        ],
      });
    },
    ...mutateOptions,
  });
}

export default useMutateFavoritePost;
