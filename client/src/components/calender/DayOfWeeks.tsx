import styled from '@emotion/native';
import {getSize} from '@/utils';

function DayOfWeeks() {
  return (
    <S.Container>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, i) => {
        return (
          <S.Item key={i}>
            <S.Text
              $isSunday={dayOfWeek === '일'}
              $isSaturday={dayOfWeek === '토'}>
              {dayOfWeek}
            </S.Text>
          </S.Item>
        );
      })}
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex-direction: row;
    margin-bottom: 5px;
  `,
  Item: styled.View`
    width: ${getSize.deviceWidth / 7 + 'px'};
    align-items: center;
  `,
  Text: styled.Text<{$isSunday: boolean; $isSaturday: boolean}>`
    color: ${({$isSunday, $isSaturday, theme}) =>
      $isSaturday
        ? theme.colors.BLUE_500
        : $isSunday
        ? theme.colors.RED_500
        : theme.colors.BLACK};
  `,
};

export default DayOfWeeks;
