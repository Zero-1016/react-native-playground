import styled from '@emotion/native';
import {getSize} from '@/utils';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  selectedDate: number;
  onPressDate: (date: number) => void;
  hasSchedule: boolean;
}

function DateBox({
  date,
  selectedDate,
  onPressDate,
  isToday,
  hasSchedule,
}: DateBoxProps) {
  return (
    <S.Container onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <S.DateContainer $isToday={isToday} $isSelect={date === selectedDate}>
            <S.DateText $isToday={isToday} $isSelect={date === selectedDate}>
              {date}
            </S.DateText>
          </S.DateContainer>
          {hasSchedule && <S.ScheduleIndicator />}
        </>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.Pressable`
    width: ${getSize.deviceWidth / 7 + 'px'};
    height: ${getSize.deviceWidth / 7 + 'px'};
    border-top-width: 1px;
    border-top-color: ${props => props.theme.colors.GRAY_200};
    align-items: center;
  `,
  DateContainer: styled.View<{$isSelect: boolean; $isToday: boolean}>`
    margin-top: 5px;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 28px;
    background-color: ${({$isSelect, $isToday, theme}) =>
      $isToday && $isSelect
        ? theme.colors.PINK_700
        : $isToday && !$isSelect
        ? theme.colors.WHITE
        : $isSelect
        ? theme.colors.BLACK
        : theme.colors.WHITE};
  `,
  DateText: styled.Text<{$isSelect: boolean; $isToday: boolean}>`
    font-size: 17px;
    font-weight: ${({$isToday}) => ($isToday ? 'bold' : 'normal')};
    color: ${({$isSelect, $isToday, theme}) =>
      $isToday && !$isSelect
        ? theme.colors.PINK_700
        : $isSelect
        ? theme.colors.WHITE
        : theme.colors.BLACK};
  `,
  ScheduleIndicator: styled.View`
    margin-top: 2px;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: ${props => props.theme.colors.GRAY_500};
  `,
};

export default DateBox;
