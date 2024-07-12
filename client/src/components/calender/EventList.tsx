import styled from '@emotion/native';
import {CalenderPost} from '@/api';
import {colors} from '@/styles/theme/colors';

interface EventListProps {
  posts: CalenderPost[];
}

function EventList({posts}: EventListProps) {
  return (
    <S.Container scrollIndicatorInsets={{right: 1}}>
      <S.InnerContainer>
        {posts?.map(post => (
          <S.ItemContainer>
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
  InnerContainer: styled.View`
    gap: 20px;
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
