import styled, {css, ReactNativeStyle} from '@emotion/native';
import {PressableProps} from 'react-native';
import {Theme} from '@emotion/react';
import {getSize} from '@/utils';
import useButton from '@/hooks/useButton';
import {ReactNode} from 'react';

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
    padding-vertical: ${getSize.deviceHeight > 700 ? 15 : 10}px;
    align-items: center;
    justify-content: center;
  `,
  medium: `
    width: 50%;
    padding-vertical: ${getSize.deviceHeight > 700 ? 12 : 8}px;
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
  buttonStyle?: ReactNativeStyle | null;
  textStyle?: ReactNativeStyle | null;
  icon?: ReactNode | null;
}

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  buttonStyle = null,
  textStyle = null,
  icon = null,
  ...props
}: Props) => {
  const {isPress, handlePressIn, handlePressOut} = useButton();

  return (
    <S.Button
      $isPress={isPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      variant={variant}
      style={Boolean(buttonStyle) && buttonStyle}
      {...props}>
      <S.TextContainer size={size}>
        {icon}
        <S.ButtonText $textStyle={textStyle} variant={variant}>
          {label}
        </S.ButtonText>
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
  ButtonText: styled.Text<
    Pick<Props, 'variant'> & {$textStyle: ReactNativeStyle | null}
  >`
    ${({variant = 'filled'}) => labelCSS[variant]};
    font-size: 16px;
    font-weight: bold;

    ${({$textStyle}) => ($textStyle ? $textStyle : '')}
  `,
  TextContainer: styled.View<Pick<Props, 'size'>>`
    ${({size = 'large'}) => sizeCSS[size]};
    gap: 5px;
    flex-direction: row;
  `,
};

export default CustomButton;
