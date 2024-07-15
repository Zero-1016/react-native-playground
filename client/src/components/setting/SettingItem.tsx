import {PressableProps} from 'react-native';
import {ReactNode} from 'react';
import useButton from '@/hooks/useButton';
import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import useThemeStore from '@/store/useThemeStore';

interface SettingItemProps extends PressableProps {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
  color?: string;
}

function SettingItem({
  title,
  subTitle,
  icon = null,
  color,
  ...props
}: SettingItemProps) {
  const {isPress, handlePressIn, handlePressOut} = useButton();
  const {theme} = useThemeStore();
  return (
    <S.Container
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      $isPress={isPress}
      {...props}>
      {icon}
      <S.TitleContainer>
        <S.TitleText $color={color ?? colors[theme].BLACK}>{title}</S.TitleText>
        {subTitle && <S.SubTitleText>{subTitle}</S.SubTitleText>}
      </S.TitleContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.Pressable<{$isPress: boolean}>`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border-color: ${props => props.theme.colors.GRAY_200};
    border-bottom-width: 1px;
    border-top-width: 1px;
    background-color: ${({$isPress, theme}) =>
      $isPress ? theme.colors.GRAY_200 : theme.colors.WHITE};
  `,
  TitleContainer: styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
  `,
  TitleText: styled.Text<{$color: string}>`
    font-size: 16px;
    font-weight: 500;
    color: ${({$color}) => $color};
  `,
  SubTitleText: styled.Text`
    color: ${props => props.theme.colors.GRAY_500};
  `,
};

export default SettingItem;
