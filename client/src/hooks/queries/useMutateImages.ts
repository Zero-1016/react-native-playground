import {useMutation} from '@tanstack/react-query';
import {uploadImages} from '@/api';
import {UseMutationCustomOptions} from '@/types/common';

function useMutateImages(mutateOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutateOptions,
  });
}

export default useMutateImages;
