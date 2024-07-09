import {Pressable} from 'react-native';
import styled from '@emotion/native';
import {ComponentPropsWithoutRef, ReactNode} from 'react';

type HeaderButtonProps = {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
} & ComponentPropsWithoutRef<typeof Pressable>;

function HeaderButton({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) {
  return (
    <S.Pressable {...props}>
      {!icon && Boolean(labelText) && (
        <S.Text $hasError={hasError}>{labelText}</S.Text>
      )}
    </S.Pressable>
  );
}

const S = {
  Pressable: styled.Pressable`
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-horizontal: 10px;
  `,
  Text: styled.Text<{$hasError: boolean}>`
    font-size: 15px;
    font-weight: 500;
    color: ${({theme, $hasError}) =>
      $hasError
        ? theme.colors.Grayscale.GRAY_200
        : theme.colors.Brand.PINK_700};
  `,
};

export default HeaderButton;
