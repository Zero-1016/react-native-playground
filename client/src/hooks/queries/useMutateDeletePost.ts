import {useMutation} from '@tanstack/react-query';
import {deletePost} from '@/api';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import queryClient from '@/api/query-client';
import {Marker} from '@/types/domain';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });
      queryClient.setQueryData(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        (existingMarkers: Marker[]) => {
          if (existingMarkers) {
            return existingMarkers.filter(marker => marker.id !== deleteId);
          }
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
