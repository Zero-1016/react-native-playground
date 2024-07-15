import React, {Suspense} from 'react';
import styled from '@emotion/native';
import FeedList from '@/components/feed/FeedList';
import Loader from '@/components/common/Loader';
import ResetErrorBoundary from '@/components/common/ResetErrorBoundary';

function FeedHomeScreen() {
  return (
    <S.Container>
      <ResetErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedList />
        </Suspense>
      </ResetErrorBoundary>
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
  `,
};

export default FeedHomeScreen;
