import {Pressable} from 'react-native';
import styled from '@emotion/native';
import {ComponentPropsWithoutRef, ReactNode} from 'react';
import useThemeStore from '@/store/useThemeStore';
import {darkColors} from '@/styles/theme/colors';

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
  const {theme} = useThemeStore();
  return (
    <S.Pressable {...props}>
      {icon}
      {!icon && Boolean(labelText) && (
        <S.Text
          $color={theme === 'light' ? darkColors.PINK_700 : darkColors.GRAY_700}
          $hasError={hasError}>
          {labelText}
        </S.Text>
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
  Text: styled.Text<{$hasError: boolean; $color: string}>`
    font-size: 15px;
    font-weight: 500;
    color: ${({theme, $hasError, $color}) =>
      $hasError ? theme.colors.GRAY_200 : $color};
  `,
};

export default HeaderButton;
