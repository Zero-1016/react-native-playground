import {Modal} from 'react-native';
import styled from '@emotion/native';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionsProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

function DatePickerOptions({
  date,
  onChangeDate,
  isVisible,
  onConfirmDate,
}: DatePickerOptionsProps) {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <S.SafeAreaView>
        <S.OptionContainer>
          <S.PickerContainer>
            <DatePicker
              date={date}
              onDateChange={onChangeDate}
              mode="date"
              locale="ko"
              theme="auto"
            />
          </S.PickerContainer>
          <S.OptionContainer>
            <S.OptionButton onPress={onConfirmDate}>
              <S.OptionText>확인</S.OptionText>
            </S.OptionButton>
          </S.OptionContainer>
        </S.OptionContainer>
      </S.SafeAreaView>
    </Modal>
  );
}

const S = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  OptionContainer: styled.View`
    border-radius: 15px;
    margin: 0 10px 10px 10px;
    background-color: ${props => props.theme.colors.GRAY_100};
    overflow: hidden;
  `,
  PickerContainer: styled.View`
    align-items: center;
  `,
  OptionButton: styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    gap: 5px;
  `,
  OptionText: styled.Text`
    color: ${props => props.theme.colors.BLUE_500};
    font-weight: 500;
  `,
};

export default DatePickerOptions;
