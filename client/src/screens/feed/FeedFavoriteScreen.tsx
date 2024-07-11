import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

function FeedFavoriteScreen() {
  return (
    <S.Container>
      <FeedFavoriteList />
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.Grayscale.WHITE};
  `,
};

export default FeedFavoriteScreen;
