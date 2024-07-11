import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import Calender from '@/components/calender/Calender';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {useState} from 'react';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);

  const handlePerssDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <S.Container>
      <Calender
        selectedDate={selectedDate}
        monthYear={monthYear}
        onPressDate={handlePerssDate}
        onChangeMonth={handleUpdateMonth}
      />
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.Grayscale.WHITE};
  `,
};

export default CalendarHomeScreen;
