import axiosInstance from '@/api/axios';
import {ImageUri} from '@/types/domain';

const uploadImages = async (body: FormData): Promise<ImageUri[]> => {
  const {data} = await axiosInstance.post<ImageUri[]>('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export {uploadImages};
