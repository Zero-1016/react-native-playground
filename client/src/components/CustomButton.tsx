import React from 'react';
import styled, {css} from '@emotion/native';
import {Dimensions, PressableProps, Text} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const variantCSS = {
  filled: css`
    background-color: #c63b64;
  `,
  outlined: css`
    border-color: #c63b64;
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
    <Button variant={variant} size={size} {...props}>
      <ButtonText variant={variant}>{label}</ButtonText>
    </Button>
  );
};

const Button = styled.Pressable<Omit<Props, 'label'>>`
  ${({variant = 'filled'}) => variantCSS[variant]};
  ${({size = 'large'}) => sizeCSS[size]};
  border-radius: 3px;
  align-self: flex-start; /* 추가: 버튼을 왼쪽 상단에 정렬합니다. */
`;

const ButtonText = styled(Text)<Pick<Props, 'variant'>>`
  ${({variant = 'filled'}) => labelCSS[variant]};
  font-size: 16px;
  font-weight: bold;
`;

export default CustomButton;
