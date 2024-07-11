import styled from '@emotion/native';
import {getSize} from '@/utils';
import {colors} from '@/styles/theme/colors';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

function DateBox({date, selectedDate, onPressDate, isToday}: DateBoxProps) {
  return (
    <S.Container onPress={() => onPressDate(date)}>
      {date > 0 && (
        <S.DateContainer $isToday={isToday} $isSelect={date === selectedDate}>
          <S.DateText $isToday={isToday} $isSelect={date === selectedDate}>
            {date}
          </S.DateText>
        </S.DateContainer>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.Pressable`
    width: ${getSize.deviceWidth / 7 + 'px'};
    height: ${getSize.deviceWidth / 7 + 'px'};
    border-top-width: 1px;
    border-top-color: ${colors.Grayscale.GRAY_200};
    align-items: center;
  `,
  DateContainer: styled.View<{$isSelect: boolean; $isToday: boolean}>`
    margin-top: 5px;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 28px;
    background-color: ${({$isSelect, $isToday}) =>
      $isToday && $isSelect
        ? colors.Brand.PINK_700
        : $isToday && !$isSelect
        ? colors.Grayscale.WHITE
        : $isSelect
        ? colors.Grayscale.BLACK
        : colors.Grayscale.WHITE};
  `,
  DateText: styled.Text<{$isSelect: boolean; $isToday: boolean}>`
    font-size: 17px;
    font-weight: ${({$isToday}) => ($isToday ? 'bold' : 'normal')};
    color: ${({$isSelect, $isToday}) =>
      $isToday && !$isSelect
        ? colors.Brand.PINK_700
        : $isSelect
        ? colors.Grayscale.WHITE
        : colors.Grayscale.BLACK};
  `,
};

export default DateBox;
