import React from 'react';
import styled from '@emotion/native';
import FeedList from '@/components/feed/FeedList';

function FeedHomeScreen() {
  return (
    <S.Container>
      <FeedList />
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView``,
};

export default FeedHomeScreen;
