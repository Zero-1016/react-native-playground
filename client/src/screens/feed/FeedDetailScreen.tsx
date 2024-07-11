import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations, mainNavigations, mapNavigations} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import {Platform, Text, View} from 'react-native';
import styled from '@emotion/native';
import {getDateLocaleFormat, getSize} from '@/utils';
import {colors} from '@/styles/theme/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {colorHex} from '@/components/common/CustomMarker';
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

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const {data: post, isPending, isError} = useGetPost(id);
  const bookMarkButton = useButton();
  const detailOption = useModal();

  const {setMoveLocation} = useLocationStore();
  const {setDetailPost} = useDetailStore();

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

  return (
    <>
      <S.Container
        scrollIndicatorInsets={{right: 1}}
        style={
          insets.bottom
            ? {marginBottom: insets.bottom + 50}
            : {marginBottom: 65}
        }>
        <S.HeaderContainer>
          <S.Header>
            <Octicons
              name="arrow-left"
              size={30}
              color={colors.Grayscale.WHITE}
              onPress={() => navigation.goBack()}
            />
            <IonicIcons
              name="ellipsis-vertical"
              size={30}
              color={colors.Grayscale.WHITE}
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
              color={colors.Grayscale.GRAY_500}
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
                <S.MarkerColor
                  style={{backgroundColor: colorHex[post?.color]}}
                />
              </S.InfoColumn>
            </S.InfoRow>
          </S.InfoContainer>

          <S.DescriptionText>{post?.description}</S.DescriptionText>

          {post?.images.length > 0 && (
            <View>
              <PreviewImageList imageUris={post?.images} />
            </View>
          )}
        </S.ContentsContainer>
      </S.Container>

      <S.BottomContainer $inset={insets}>
        <S.TabContainer $noInset={insets.bottom === 0}>
          <S.BookMarkContainer
            $isPress={bookMarkButton.isPress}
            onPressIn={bookMarkButton.handlePressIn}
            onPressOut={bookMarkButton.handlePressOut}>
            <Octicons
              name="star-fill"
              size={30}
              color={colors.Grayscale.GRAY_100}
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
  Container: styled.ScrollView`
    position: relative;
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
    background-color: ${colors.Grayscale.GRAY_200};
    border-color: ${colors.Grayscale.GRAY_200};
    border-width: 1px;
  `,
  ContentsContainer: styled.View`
    padding: 20px 10px;
    background-color: ${colors.Grayscale.WHITE};
    margin-bottom: 10px;
  `,
  AddressContainer: styled.View`
    gap: 5px;
    margin: 10px 0;
    flex-direction: row;
    align-items: center;
  `,
  AddressText: styled.Text`
    color: ${colors.Grayscale.GRAY_200};
    font-size: 12px;
  `,
  TitleText: styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: ${colors.Grayscale.BLACK};
  `,
  DescriptionText: styled.Text`
    color: ${colors.Grayscale.GRAY_500};
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
    color: ${colors.Grayscale.BLACK};
  `,
  InfoColumnKeyValueText: styled.Text`
    color: ${colors.Brand.PINK_700};
  `,
  MarkerColor: styled.View`
    width: 10px;
    height: 10px;
    border-radius: 10px;
  `,
  ImageContentContainer: styled.View`
    padding: 15px 0;
    background-color: ${colors.Grayscale.WHITE};
    margin-bottom: 10px;
  `,
  BottomContainer: styled.View<{$inset: EdgeInsets}>`
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: flex-end;
    padding: 10px 10px ${({$inset}) => ($inset.bottom ? '0' : '10px')};
    background-color: ${colors.Grayscale.WHITE};
    border-width: 0.5px;
    border-color: ${colors.Grayscale.GRAY_200};
  `,
  TabContainer: styled.View<{$noInset: boolean}>`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: ${({$noInset}) => ($noInset ? '10px' : '0')};
  `,
  BookMarkContainer: styled.Pressable<{$isPress: boolean}>`
    background-color: ${({$isPress}) =>
      $isPress ? colors.Brand.PINK_400 : colors.Brand.PINK_700};
    height: 100%;
    padding: 0 5px;
    justify-content: center;
    border-radius: 3px;
  `,
};

export default FeedDetailScreen;
