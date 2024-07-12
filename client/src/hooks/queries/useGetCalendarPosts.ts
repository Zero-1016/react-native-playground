import {useQuery} from '@tanstack/react-query';
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
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
