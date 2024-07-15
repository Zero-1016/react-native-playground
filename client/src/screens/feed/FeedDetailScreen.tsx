import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {
  feedNavigations,
  mainNavigations,
  mapNavigations,
  settingNavigations,
} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import {Platform, Pressable, Text} from 'react-native';
import styled from '@emotion/native';
import {getDateLocaleFormat, getSize} from '@/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import PreviewImageList from '@/components/common/PreviewImageList';
import CustomButton from '@/components/common/CustomButton';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import useButton from '@/hooks/useButton';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useLocationStore from '@/store/useLocationStore';
import useModal from '@/hooks/useModal';
import FeedDetailOption from '@/components/feed/FeedDetailOption';
import {useEffect} from 'react';
import useDetailStore from '@/store/useDetailStore';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {colorHex, colors, lightColors} from '@/styles/theme/colors';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const {data: post, isPending, isError} = useGetPost(id);
  const bookMarkButton = useButton();
  const detailOption = useModal();
  const favoriteMutation = useMutateFavoritePost();
  const {setMoveLocation} = useLocationStore();
  const {setDetailPost} = useDetailStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    post && setDetailPost(post);
  }, [post, setDetailPost]);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const {longitude, latitude} = post;
    setMoveLocation({longitude, latitude});
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };

  const handlePressFavorite = () => {
    favoriteMutation.mutate(post.id);
  };

  const handlePressCategory = () => {
    navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.EDIT_CATEGORY,
      initial: false,
    });
  };

  return (
    <>
      <S.Container scrollIndicatorInsets={{right: 1}} $inset={insets.bottom}>
        <S.HeaderContainer>
          <S.Header>
            <Octicons
              name="arrow-left"
              size={30}
              color={colors[theme].WHITE}
              onPress={() => navigation.goBack()}
            />
            <IonicIcons
              name="ellipsis-vertical"
              size={30}
              color={colors[theme].WHITE}
              onPress={detailOption.show}
            />
          </S.Header>
        </S.HeaderContainer>

        <S.ImageContainer>
          {post?.images.length > 0 && (
            <S.Image
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030'
                    : 'http://10.0.2.2:3030'
                }/${post?.images[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post?.images.length === 0 && (
            <S.EmptyImageContainer>
              <Text>No Image</Text>
            </S.EmptyImageContainer>
          )}
        </S.ImageContainer>

        <S.ContentsContainer>
          <S.AddressContainer>
            <Octicons
              name="location"
              size={10}
              color={colors[theme].GRAY_500}
            />
            <S.AddressText ellipsizeMode="tail" numberOfLines={1}>
              {post?.address}
            </S.AddressText>
          </S.AddressContainer>

          <S.TitleText>{post?.title}</S.TitleText>

          <S.InfoContainer>
            <S.InfoRow>
              <S.InfoColumn>
                <S.InfoColumnKeyText>방문날짜</S.InfoColumnKeyText>
                <S.InfoColumnKeyValueText>
                  {getDateLocaleFormat(post.date)}
                </S.InfoColumnKeyValueText>
              </S.InfoColumn>
              <S.InfoColumn>
                <S.InfoColumnKeyText>평점</S.InfoColumnKeyText>
                <S.InfoColumnKeyValueText>
                  {post?.score}
                </S.InfoColumnKeyValueText>
              </S.InfoColumn>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoColumn>
                <S.InfoColumnKeyText>마커색상</S.InfoColumnKeyText>
                <S.MarkerColor $color={colorHex[post?.color]} />
              </S.InfoColumn>
              <S.InfoColumn>
                <S.InfoColumnKeyText>카테고리</S.InfoColumnKeyText>
                {categories?.[post?.color] ? (
                  <S.InfoColumnKeyValueText>
                    {categories?.[post?.color]}
                  </S.InfoColumnKeyValueText>
                ) : (
                  <S.EmptyCategoryContainer onPress={handlePressCategory}>
                    <S.InfoColumnKeyText>미설정</S.InfoColumnKeyText>
                  </S.EmptyCategoryContainer>
                )}
              </S.InfoColumn>
            </S.InfoRow>
          </S.InfoContainer>

          <S.DescriptionText>{post?.description}</S.DescriptionText>
        </S.ContentsContainer>

        {post?.images.length > 0 && (
          <S.ImageContentContainer>
            <PreviewImageList imageUris={post?.images} zoomEnable />
          </S.ImageContentContainer>
        )}
      </S.Container>

      <S.BottomContainer $inset={insets}>
        <S.TabContainer $noInset={insets.bottom === 0}>
          <S.BookMarkContainer
            $isPress={bookMarkButton.isPress}
            onPress={handlePressFavorite}
            onPressIn={bookMarkButton.handlePressIn}
            onPressOut={bookMarkButton.handlePressOut}>
            <Octicons
              name="star-fill"
              size={30}
              color={
                post?.isFavorite
                  ? lightColors.YELLOW_500
                  : colors[theme].GRAY_100
              }
            />
          </S.BookMarkContainer>
          <CustomButton
            label="위치보기"
            size="medium"
            variant="filled"
            onPress={handlePressLocation}
          />
        </S.TabContainer>
      </S.BottomContainer>
      <FeedDetailOption
        isVisible={detailOption.isVisible}
        hideOption={detailOption.hide}
      />
    </>
  );
}

const S = {
  Container: styled.ScrollView<{$inset: number}>`
    position: relative;
    margin-bottom: ${({$inset}) => ($inset ? +$inset + 'px' : '65px')};
  `,
  HeaderContainer: styled.SafeAreaView`
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
  `,
  Header: styled.View`
    flex-direction: row;
    padding: 10px 15px;
    justify-content: space-between;
  `,
  ImageContainer: styled.View`
    width: ${getSize.screenWidth + 'px'};
    height: ${getSize.screenWidth + 'px'};
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
  `,
  EmptyImageContainer: styled.View`
    height: ${getSize.screenWidth + 'px'};
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.GRAY_200};
    border-color: ${props => props.theme.colors.GRAY_200};
    border-width: 1px;
  `,
  ContentsContainer: styled.View`
    padding: 20px 10px;
    background-color: ${props => props.theme.colors.WHITE};
    margin-bottom: 10px;
  `,
  AddressContainer: styled.View`
    gap: 5px;
    margin: 10px 0;
    flex-direction: row;
    align-items: center;
  `,
  AddressText: styled.Text`
    color: ${props => props.theme.colors.GRAY_200};
    font-size: 12px;
  `,
  TitleText: styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: ${props => props.theme.colors.BLACK};
  `,
  DescriptionText: styled.Text`
    color: ${props => props.theme.colors.GRAY_500};
    line-height: 25px;
    font-size: 16px;
  `,
  InfoContainer: styled.View`
    margin: 20px 0;
    gap: 8px;
  `,
  InfoRow: styled.View`
    flex-direction: row;
  `,
  InfoColumn: styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  `,
  InfoColumnKeyText: styled.Text`
    color: ${props => props.theme.colors.BLACK};
  `,
  InfoColumnKeyValueText: styled.Text`
    color: ${props => props.theme.colors.PINK_700};
  `,
  MarkerColor: styled.View<{$color: string}>`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: ${({$color}) => $color};
  `,
  ImageContentContainer: styled.View`
    padding: 15px 0;
    background-color: ${props => props.theme.colors.WHITE};
    margin-bottom: 10px;
  `,
  BottomContainer: styled.View<{$inset: EdgeInsets}>`
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: flex-end;
    padding: 10px 10px ${({$inset}) => ($inset.bottom ? '0' : '10px')};
    background-color: ${props => props.theme.colors.WHITE};
    border-width: 0.5px;
    border-color: ${props => props.theme.colors.GRAY_200};
  `,
  TabContainer: styled.View<{$noInset: boolean}>`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: ${({$noInset}) => ($noInset ? '10px' : '0')};
  `,
  BookMarkContainer: styled.Pressable<{$isPress: boolean}>`
    background-color: ${({$isPress, theme}) =>
      $isPress ? theme.colors.PINK_400 : theme.colors.PINK_700};
    height: 100%;
    padding: 0 5px;
    justify-content: center;
    border-radius: 3px;
  `,
  EmptyCategoryContainer: styled.Pressable`
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.GRAY_300};
    padding: 2px;
    border-radius: 2px;
  `,
};

export default FeedDetailScreen;
