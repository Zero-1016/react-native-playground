import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getCalenderPosts, ResponseCalenderPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalenderPost>,
) {
  return useQuery({
    queryFn: () => getCalenderPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    // 데이터를 가져오는 동안 이전 데이터를 유지함
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
