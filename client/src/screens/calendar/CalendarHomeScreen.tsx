import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import Calender from '@/components/calender/Calender';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {useState} from 'react';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import EventList from '@/components/calender/EventList';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <S.Container>
      <Calender
        selectedDate={selectedDate}
        schedules={posts}
        monthYear={monthYear}
        onPressDate={handlePressDate}
        onChangeMonth={handleUpdateMonth}
      />
      <EventList posts={posts[selectedDate]} />
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
