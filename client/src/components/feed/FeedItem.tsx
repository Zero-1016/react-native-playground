import {ResponsePost} from '@/api';
import styled from '@emotion/native';
import {Platform, Text, View} from 'react-native';
import {getDateWithSeparator, getSize} from '@/utils';
import {colors} from '@/styles/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

interface FeedItemProps {
  post: ResponsePost;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedItem({post}: FeedItemProps) {
  const navigation = useNavigation<Navigation>();
  const handlePressFeed = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id});
  };
  return (
    <S.Container onPress={handlePressFeed}>
      <View>
        {post.images.length > 0 && (
          <S.ImageContainer>
            <S.Image
              resizeMode="cover"
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
        {post.images.length === 0 && (
          <N.EmptyImageContainer>
            <S.EmptyText>No Image</S.EmptyText>
          </N.EmptyImageContainer>
        )}
        <S.TextContainer>
          <S.DateText>{getDateWithSeparator(post.date, '/')}</S.DateText>
          <S.TitleText>{post.title}</S.TitleText>
          <S.DescriptionText>{post.description}</S.DescriptionText>
        </S.TextContainer>
      </View>
    </S.Container>
  );
}

const S = {
  Container: styled.Pressable`
    flex: 1;
    margin: 12px 5px 12px 0;
  `,
  ImageContainer: styled.View`
    width: ${getSize.screenWidth / 2 - 25 + 'px'};
    height: ${getSize.screenWidth / 2 - 25 + 'px'};
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 5px;
  `,
  TextContainer: styled.View`
    margin-top: 7px;
    gap: 2px;
  `,
  DateText: styled.Text`
    color: ${props => props.theme.colors.PINK_700};
    font-weight: 600;
    font-size: 12px;
  `,
  TitleText: styled.Text`
    color: ${props => props.theme.colors.BLACK};
    font-weight: 500;
    font-size: 13px;
  `,
  DescriptionText: styled.Text`
    color: ${props => props.theme.colors.GRAY_500};
    font-size: 13px;
  `,
  EmptyText: styled.Text`
    color: ${props => props.theme.colors.BLACK};
  `,
};

const N = {
  EmptyImageContainer: styled(S.ImageContainer)`
    justify-content: center;
    align-items: center;
    border-color: ${props => props.theme.colors.GRAY_200};
    border-radius: 5px;
    border-width: 1px;
  `,
};

export default FeedItem;
