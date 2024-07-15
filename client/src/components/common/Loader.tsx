import React, {PropsWithChildren} from 'react';
import {ActivityIndicatorProps} from 'react-native';
import {lightColors} from '@/styles/theme/colors';
import styled from '@emotion/native';

function Loader({
  children,
  size = 'small',
  color = lightColors.GRAY_500,
  ...props
}: PropsWithChildren<ActivityIndicatorProps>) {
  return (
    <S.Container>
      <S.Indicator size={size} color={color} {...props} />
      {children}
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  Indicator: styled.ActivityIndicator`
    margin-bottom: 20px;
  `,
};

export default Loader;
