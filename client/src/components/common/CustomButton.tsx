import styled, {css} from '@emotion/native';
import {PressableProps} from 'react-native';
import {Theme} from '@emotion/react';
import {getSize} from '@/utils';
import useButton from '@/hooks/useButton';

const variantCSS = {
  filled: (theme: Theme, $isPress: boolean) => css`
    background-color: ${$isPress
      ? theme.colors.Brand.PINK_400
      : theme.colors.Brand.PINK_700};
  `,
  outlined: (theme: Theme, $isPress: boolean) => css`
    border-color: ${$isPress
      ? theme.colors.Brand.PINK_400
      : theme.colors.Brand.PINK_700};
    border-width: 1px;
  `,
};

const sizeCSS = {
  large: `
    width: 100%;
    padding-vertical: ${getSize.deviceHeight > 700 ? 15 : 12}px;
    align-items: center;
    justify-content: center;
  `,
  medium: `
    width: 50%;
    padding-vertical: ${getSize.deviceHeight > 700 ? 12 : 10}px;
    align-items: center;
    justify-content: center;
  `,
};

const labelCSS = {
  filled: css`
    color: white;
  `,
  outlined: css`
    color: #c63b64;
  `,
};

interface Props extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
}

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  ...props
}: Props) => {
  const {isPress, handlePressIn, handlePressOut} = useButton();

  return (
    <S.Button
      $isPress={isPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      variant={variant}
      {...props}>
      <S.TextContainer size={size}>
        <S.ButtonText variant={variant}>{label}</S.ButtonText>
      </S.TextContainer>
    </S.Button>
  );
};

const S = {
  Button: styled.Pressable<Omit<Props, 'label'> & {$isPress: boolean}>`
    ${({variant = 'filled', theme, $isPress}) =>
      variantCSS[variant](theme, $isPress)};
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `,
  ButtonText: styled.Text<Pick<Props, 'variant'>>`
    ${({variant = 'filled'}) => labelCSS[variant]};
    font-size: 16px;
    font-weight: bold;
  `,
  TextContainer: styled.View<Pick<Props, 'size'>>`
    ${({size = 'large'}) => sizeCSS[size]};
  `,
};

export default CustomButton;
