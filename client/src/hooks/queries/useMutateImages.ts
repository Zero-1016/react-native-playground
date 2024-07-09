import {UseMutationCustomOptions} from '@/hooks/common';
import {useMutation} from '@tanstack/react-query';
import {uploadImages} from '@/api';

function useMutateImages(mutateOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutateOptions,
  });
}

export default useMutateImages;
