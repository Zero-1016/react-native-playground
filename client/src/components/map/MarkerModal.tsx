import useGetPost from '@/hooks/queries/useGetPost';
import {Modal, Platform} from 'react-native';
import styled from '@emotion/native';
import CustomMarker from '@/components/common/CustomMarker';
import {getDateWithSeparator, getSize} from '@/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/styles/theme/colors';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

function MarkerModal({markerId, isVisible, hide}: MarkerModalProps) {
  const navigation = useNavigation<Navigation>();
  const {data: post, isPending, isError} = useGetPost(markerId);
  const {theme} = useThemeStore();
  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {
          id: post.id,
        },
        initial: false,
      },
    });
    hide();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.OptionBackGround onTouchEnd={hide}>
        <S.CardContainer onPress={handlePressModal}>
          <S.CardInner>
            <S.CardAlign>
              {post?.images.length > 0 && (
                <S.ImageContainer>
                  <S.Image
                    source={{
                      uri: `${
                        Platform.OS === 'ios'
                          ? 'http://localhost:3030'
                          : 'http://10.0.2.2:3030'
                      }/${post.images[0].uri}`,
                    }}
                  />
                </S.ImageContainer>
              )}
              {post?.images.length === 0 && (
                <E.EmptyImageContainer>
                  <CustomMarker color={post.color} score={post.score} />
                </E.EmptyImageContainer>
              )}
              <S.InfoContainer>
                <S.AddressContainer>
                  <Octicons
                    name="location"
                    size={10}
                    color={colors[theme].GRAY_500}
                  />
                  <S.AddressText numberOfLines={1} ellipsizeMode="tail">
                    {post?.address}
                  </S.AddressText>
                </S.AddressContainer>
                <S.TitleText>{post?.title}</S.TitleText>
                <S.DateText>{getDateWithSeparator(post?.date, '.')}</S.DateText>
              </S.InfoContainer>
            </S.CardAlign>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color={colors[theme].BLACK}
            />
          </S.CardInner>
        </S.CardContainer>
      </S.OptionBackGround>
    </Modal>
  );
}

const S = {
  OptionBackGround: styled.SafeAreaView`
    flex: 1;
    justify-content: flex-end;
  `,
  CardContainer: styled.Pressable`
    background-color: ${props => props.theme.colors.WHITE};
    margin: 10px;
    border-radius: 20px;
    shadow-color: ${props => props.theme.colors.BLACK};
    shadow-offset: 3px 3px;
    shadow-opacity: 0.2;
    elevation: 1;
    border-color: ${props => props.theme.colors.GRAY_500};
    border-width: 2px;
  `,
  CardInner: styled.View`
    padding: 20px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  CardAlign: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  ImageContainer: styled.View`
    width: 70px;
    height: 70px;
    border-radius: 35px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 35px;
  `,
  InfoContainer: styled.View`
    width: ${getSize.screenWidth / 2 + 'px'};
    margin-left: 15px;
    gap: 5px;
  `,
  AddressContainer: styled.View`
    flex-direction: row;
    gap: 5px;
    align-items: center;
  `,
  AddressText: styled.Text`
    color: ${props => props.theme.colors.GRAY_500};
    font-size: 10px;
  `,
  TitleText: styled.Text`
    color: ${props => props.theme.colors.BLACK};
    font-size: 15px;
    font-weight: bold;
  `,
  DateText: styled.Text`
    color: ${props => props.theme.colors.PINK_700};
    font-size: 12px;
    font-weight: bold;
  `,
};

const E = {
  EmptyImageContainer: styled(S.ImageContainer)`
    justify-content: center;
    align-items: center;
    border-radius: 35px;
    border-width: 1px;
    border-color: ${props => props.theme.colors.GRAY_200};
  `,
};

export default MarkerModal;
