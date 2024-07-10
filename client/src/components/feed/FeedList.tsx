import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {FlatList} from 'react-native';
import FeedItem from '@/components/feed/FeedItem';
import React from 'react';

function FeedList() {
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={{padding: 15}}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
    />
  );
}

export default FeedList;
