import styled from '@emotion/native';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {Suspense} from 'react';
import Loader from '@/components/common/Loader';
import ResetErrorBoundary from '@/components/common/ResetErrorBoundary';

function FeedFavoriteScreen() {
  return (
    <S.Container>
      <ResetErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedFavoriteList />
        </Suspense>
      </ResetErrorBoundary>
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.colors.WHITE};
  `,
};

export default FeedFavoriteScreen;
