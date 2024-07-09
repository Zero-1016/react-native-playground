import {UseMutationCustomOptions} from '@/hooks/common';
import {useMutation} from '@tanstack/react-query';
import {createPost} from '@/api';
import queryClient from '@/api/query-client';
import {queryKeys} from '@/constants';
import {Marker} from '@/types/domain';

function useMutateCreatePost(mutateOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      queryClient.setQueriesData<Marker[]>(
        {queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS]},
        existingMarkers => {
          const newMarker: Marker = {
            id: newPost.id,
            color: newPost.color,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            score: newPost.score,
          };
          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutateOptions,
  });
}

export {useMutateCreatePost};
