import styled, {css} from '@emotion/native';
import {Dimensions, PressableProps} from 'react-native';
import {Theme} from '@emotion/react';

const deviceHeight = Dimensions.get('window').height;

const variantCSS = {
  filled: (theme: Theme) => css`
    background-color: ${theme.colors.Brand.PINK_700};
  `,
  outlined: (theme: Theme) => css`
    border-color: ${theme.colors.Brand.PINK_700};
    border-width: 1px;
  `,
};

const sizeCSS = {
  large: `
    width: 100%;
    padding-vertical: ${deviceHeight > 700 ? 15 : 12}px;
    align-items: center;
    justify-content: center;
  `,
  medium: `
    width: 50%;
    padding-vertical: ${deviceHeight > 700 ? 12 : 10}px;
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
  return (
    <S.Button variant={variant} {...props}>
      <S.TextContainer size={size}>
        <S.ButtonText variant={variant}>{label}</S.ButtonText>
      </S.TextContainer>
    </S.Button>
  );
};

const S = {
  Button: styled.Pressable<Omit<Props, 'label'>>`
    ${({variant = 'filled', theme}) => variantCSS[variant](theme)};
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
