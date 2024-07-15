import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
} from 'react-native';
import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import styled from '@emotion/native';
import useButton from '@/hooks/useButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {lightTheme} from '@/styles/theme';
import {colors, lightColors} from '@/styles/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useThemeStore from '@/store/useThemeStore';

interface OptionContextValue {
  onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationType?: ModalProps['animationType'];
}

function OptionMain({
  hideOption,
  children,
  isVisible,
  animationType = 'slide',
}: OptionMainProps) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={hideOption}>
      <OptionContext.Provider value={{onClickOutSide}}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

function BackGround({children}: PropsWithChildren<{}>) {
  const optionContext = useContext(OptionContext);
  return (
    <S.BackGround onTouchEnd={optionContext?.onClickOutSide}>
      {children}
    </S.BackGround>
  );
}

interface CheckBoxProps extends PressableProps {
  children: ReactNode;
  icon?: ReactNode;
  isChecked?: boolean;
}

function CheckBox({
  children,
  icon,
  isChecked = false,
  ...props
}: CheckBoxProps) {
  const {isPress, handlePressOut, handlePressIn} = useButton();
  return (
    <S.CheckBoxContainer
      $isPress={isPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}>
      <Ionicons
        name={`checkmark-circle${isChecked ? '' : '-outline'}`}
        size={22}
        color={lightColors.BLUE_500}
      />
      {icon}
      <S.CheckBoxText $isChecked={isChecked} $isPress={isPress}>
        {children}
      </S.CheckBoxText>
    </S.CheckBoxContainer>
  );
}

interface FilterProps extends PressableProps {
  children: ReactNode;
  isSelected?: boolean;
}

function Filter({children, isSelected = false, ...props}: FilterProps) {
  const {theme} = useThemeStore();
  return (
    <S.FilterContainer {...props}>
      <S.FilterText $isSelected={isSelected}>{children}</S.FilterText>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={22}
        color={isSelected ? colors[theme].GRAY_300 : lightColors.BLUE_500}
      />
    </S.FilterContainer>
  );
}

function Container({children}: PropsWithChildren) {
  return <S.OptionContainer>{children}</S.OptionContainer>;
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({
  children,
  isDanger = false,
  isChecked,
  ...press
}: ButtonProps) {
  const button = useButton();
  return (
    <S.OptionButton
      onPressIn={button.handlePressIn}
      onPressOut={button.handlePressOut}
      $isPress={button.isPress}
      {...press}>
      <S.OptionText $isDanger={isDanger}>{children}</S.OptionText>

      {isChecked && (
        <Ionicons
          name="checkmark"
          size={20}
          color={lightTheme.colors.BLUE_500}
        />
      )}
    </S.OptionButton>
  );
}

function Title({children}: PropsWithChildren) {
  return (
    <S.TitleContainer>
      <S.TitleText>{children}</S.TitleText>
    </S.TitleContainer>
  );
}

function Divider() {
  return <S.Border />;
}

export const CompoundOption = Object.assign(OptionMain, {
  Container,
  BackGround,
  Button,
  Title,
  Divider,
  CheckBox,
  Filter,
});

const S = {
  BackGround: styled.SafeAreaView`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  OptionContainer: styled.View`
    border-radius: 15px;
    margin: 10px;
    overflow: hidden;
    background-color: ${props => props.theme.colors.GRAY_100};
  `,
  OptionButton: styled.Pressable<{$isPress: boolean}>`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    gap: 5px;

    ${({$isPress, theme}) =>
      $isPress &&
      `
        background-color: ${theme.colors.GRAY_200}
    `}
  `,
  OptionText: styled.Text<{$isDanger: boolean}>`
    font-size: 17px;
    font-weight: 500;
    color: ${props => props.theme.colors.BLUE_500};
    ${({$isDanger, theme}) =>
      $isDanger &&
      `
        color: ${theme.colors.RED_500}
    `}
  `,
  TitleContainer: styled.View`
    align-items: center;
    padding: 15px;
  `,
  TitleText: styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.theme.colors.BLACK};
  `,
  Border: styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.GRAY_200};
  `,
  CheckBoxContainer: styled.Pressable<{$isPress: boolean}>`
    flex-direction: row;
    align-items: center;
    padding: 10px 30px;
    gap: 10px;
    background-color: ${({theme, $isPress}) =>
      $isPress ? theme.colors.GRAY_200 : theme.colors.WHITE};
  `,
  CheckBoxText: styled.Text<{$isPress: boolean; $isChecked: boolean}>`
    font-size: 15px;
    font-weight: 500;
    color: ${({$isPress, $isChecked, theme}) =>
      $isChecked
        ? theme.colors.GRAY_500
        : $isPress
        ? theme.colors.GRAY_700
        : theme.colors.BLACK};
  `,
  FilterContainer: styled.Pressable`
    color: ${props => props.theme.colors.BLUE_500};
    font-size: 15px;
    font-weight: 500;
  `,
  FilterText: styled.Text<{$isSelected: boolean}>`
    color: ${({theme, $isSelected}) =>
      $isSelected ? theme.colors.GRAY_700 : theme.colors.BLACK};
  `,
};
