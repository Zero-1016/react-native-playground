import axiosInstance from '@/api/axios';
import {Marker} from '@/types/domain';

const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get<Marker[]>('/markers/my');
  return data;
};

export {getMarkers};
