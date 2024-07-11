import {create} from 'zustand';
import {ResponsePost} from '@/api';

interface DetailPostState {
  detailPost: null | ResponsePost;
  setDetailPost: (post: ResponsePost) => void;
}

const useDetailStore = create<DetailPostState>(set => ({
  detailPost: null,
  setDetailPost: post => set({detailPost: post}),
}));

export default useDetailStore;
