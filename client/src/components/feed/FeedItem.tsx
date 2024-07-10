import {ResponsePost} from '@/api';
import styled from '@emotion/native';
import {Platform, Text, View} from 'react-native';
import {getDateWithSeparator, getSize} from '@/utils';
import {colors} from '@/styles/theme/colors';

interface FeedItemProps {
  post: ResponsePost;
}

function FeedItem({post}: FeedItemProps) {
  return (
    <S.Container>
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
            <Text>No Image</Text>
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
  Container: styled.View`
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
    color: ${colors.Brand.PINK_700};
    font-weight: 600;
    font-size: 12px;
  `,
  TitleText: styled.Text`
    color: ${colors.Grayscale.BLACK};
    font-weight: 500;
    font-size: 13px;
  `,
  DescriptionText: styled.Text`
    color: ${colors.Grayscale.GRAY_500};
    font-size: 13px;
  `,
};

const N = {
  EmptyImageContainer: styled(S.ImageContainer)`
    justify-content: center;
    align-items: center;
    border-color: ${colors.Grayscale.GRAY_200};
    border-radius: 5px;
    border-width: 1px;
  `,
};

export default FeedItem;
