import React, {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import CustomButton from './CustomButton';
import styled from '@emotion/native';

function RetryErrorBoundary({children}: PropsWithChildren) {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <S.Container>
          <S.TitleText>잠시 후 다시 시도해주세요.</S.TitleText>
          <S.DescriptionText>
            요청 사항을 처리하는데 실패했습니다.
          </S.DescriptionText>
          <CustomButton
            label="다시 시도"
            size="medium"
            variant="outlined"
            onPress={resetErrorBoundary}
          />
        </S.Container>
      )}>
      {children}
    </ErrorBoundary>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${props => props.theme.colors.WHITE};
  `,
  TitleText: styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.colors.BLACK};
  `,
  DescriptionText: styled.Text`
    font-size: 15px;
    color: ${props => props.theme.colors.GRAY_500};
  `,
};

export default RetryErrorBoundary;
