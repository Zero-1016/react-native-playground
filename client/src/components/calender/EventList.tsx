import styled from '@emotion/native';
import {CalenderPost} from '@/api';
import {colors} from '@/styles/theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';
import {
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';

interface EventListProps {
  posts: CalenderPost[];
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

function EventList({posts}: EventListProps) {
  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();

  const handlePressItem = (id: number) => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {
          id,
        },
        initial: false,
      },
    });
  };

  return (
    <S.Container scrollIndicatorInsets={{right: 1}}>
      <S.InnerContainer $insetBottom={inset.bottom}>
        {posts?.map(post => (
          <S.ItemContainer
            key={post.id}
            onPress={() => handlePressItem(post.id)}>
            <S.ItemHeader />
            <S.InfoContainer>
              <S.AddressText>{post.address}</S.AddressText>
              <S.TitleText>{post.title}</S.TitleText>
            </S.InfoContainer>
          </S.ItemContainer>
        ))}
      </S.InnerContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.ScrollView`
    background-color: ${colors.Grayscale.WHITE};
    padding: 20px;
  `,
  InnerContainer: styled.View<{$insetBottom: number}>`
    gap: 20px;
    margin-bottom: ${({$insetBottom}) => $insetBottom + 'px'};
  `,
  ItemContainer: styled.Pressable`
    flex-direction: row;
  `,
  ItemHeader: styled.View`
    background-color: ${colors.Brand.PINK_700};
    width: 6px;
    height: 50px;
    margin-right: 8px;
    border-radius: 20px;
  `,
  InfoContainer: styled.View`
    justify-content: space-evenly;
  `,
  AddressText: styled.Text`
    color: ${colors.Grayscale.GRAY_500};
    font-size: 13px;
  `,
  TitleText: styled.Text`
    color: ${colors.Grayscale.BLACK};
    font-size: 16px;
    font-weight: 600;
  `,
};

export default EventList;
