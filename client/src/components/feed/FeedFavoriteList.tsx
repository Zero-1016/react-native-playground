import {FlatList} from 'react-native';
import FeedItem from '@/components/feed/FeedItem';
import React, {useState} from 'react';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';
import styled from '@emotion/native';
import useThemeStore from '@/store/useThemeStore';

function FeedFavoriteList() {
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  const {theme} = useThemeStore();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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
      ListEmptyComponent={
        <S.EmptyContainer>
          <S.EmptyText>즐겨찾기한 장소가 없습니다.</S.EmptyText>
        </S.EmptyContainer>
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={{padding: 15}}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle={theme === 'light' ? 'black' : 'white'}
    />
  );
}

const S = {
  EmptyContainer: styled.View``,
  EmptyText: styled.Text`
    text-align: center;
  `,
};

export default FeedFavoriteList;
