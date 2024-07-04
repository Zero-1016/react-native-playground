import React from 'react';
import styled, {css} from '@emotion/native';
import {Pressable, TextInput, TextInputProps} from 'react-native';
import {getSize} from '@/utils/getSize';
import {useRef} from 'react';

interface InputFiledProps extends TextInputProps {
  touched?: boolean;
  disabled?: boolean;
  error?: string;
}

function InputFiled({
  touched,
  disabled = false,
  error,
  ...props
}: InputFiledProps) {
  const innerRef = useRef<TextInput>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <S.Container _isError={Boolean(error)}>
        <S.TextInput
          ref={innerRef}
          editable={!disabled}
          disabled={disabled}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {touched && Boolean(error) && <S.ErrorText>{error}</S.ErrorText>}
      </S.Container>
    </Pressable>
  );
}

const S = {
  Container: styled.View<{_isError: boolean}>`
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.Grayscale.GRAY_200};
    padding: ${(getSize.deviceHeight > 700 ? 15 : 10) + 'px'};

    ${({_isError, theme}) =>
      _isError &&
      css`
        border-width: 1px;
        border-color: ${theme.colors.System.RED_300};
      `}
  `,
  TextInput: styled.TextInput<Pick<InputFiledProps, 'disabled'>>`
    font-size: 16px;
    padding: 0;
    ${({disabled, theme}) =>
      disabled &&
      css`
        background-color: ${theme.colors.Grayscale.GRAY_200};
        color: ${theme.colors.Grayscale.GRAY_700};
      `}
  `,
  ErrorText: styled.Text`
    color: ${({theme}) => theme.colors.System.RED_300};
    font-size: 12px;
    padding-top: 6px;
  `,
};

export default InputFiled;
