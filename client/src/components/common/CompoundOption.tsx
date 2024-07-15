import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  PressableProps,
} from 'react-native';
import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import styled from '@emotion/native';
import useButton from '@/hooks/useButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/styles/theme/colors';
import {lightTheme} from '@/styles/theme';

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
};
