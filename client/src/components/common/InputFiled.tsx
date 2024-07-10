import React, {ForwardedRef, forwardRef, ReactNode, useRef} from 'react';
import styled from '@emotion/native';
import {Pressable, TextInput, TextInputProps} from 'react-native';
import {getSize, mergeRefs} from '@/utils';
import {colors} from '@/styles/theme/colors';

interface InputFieldProps extends TextInputProps {
  touched?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: ReactNode;
}

const InputField = forwardRef(
  (
    {touched, disabled = false, error, icon = null, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <S.Container
          $disabled={disabled}
          $isError={!!touched && !!error}
          $multiline={!!props.multiline}>
          <S.InnerContainer $isIcon={!!icon}>
            {icon}
            <S.TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </S.InnerContainer>
          {touched && !!error && <S.ErrorText>{error}</S.ErrorText>}
        </S.Container>
      </Pressable>
    );
  },
);

const S = {
  Container: styled.View<{
    $isError: boolean;
    $disabled: boolean;
    $multiline: boolean;
  }>`
    border-width: 1px;
    border-color: ${colors.Grayscale.GRAY_200};
    padding: ${({$multiline}) =>
      $multiline
        ? getSize.deviceHeight > 700
          ? '15px 15px 45px'
          : '10px 10px 30px'
        : getSize.deviceHeight > 700
        ? '15px'
        : '10px'};

    ${({$isError}) =>
      $isError &&
      `
        border-color: ${colors.System.RED_300};
      `}

    ${({$disabled}) =>
      $disabled &&
      `
        background-color: ${colors.Grayscale.GRAY_200};
        color: ${colors.Grayscale.GRAY_700};
      `}
  `,
  InnerContainer: styled.View<{$isIcon: boolean}>`
    ${({$isIcon}) =>
      $isIcon &&
      `
        flex-direction: row;
        align-items: center;
        gap: 5px;
      `}
  `,
  TextInput: styled.TextInput`
    font-size: 16px;
    padding: 0;
    color: ${colors.Grayscale.BLACK};
  `,
  ErrorText: styled.Text`
    color: ${colors.System.RED_500};
    font-size: 12px;
    padding-top: 5px;
  `,
};

export default InputField;