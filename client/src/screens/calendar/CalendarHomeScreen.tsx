import styled from '@emotion/native';
import Calender from '@/components/calender/Calender';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {useEffect, useState} from 'react';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import EventList from '@/components/calender/EventList';
import {StackScreenProps} from '@react-navigation/stack';

function CalendarHomeScreen({navigation}: {navigation: StackScreenProps<any>}) {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

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
        moveToToday={moveToToday}
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
    background-color: ${props => props.theme.colors.WHITE};
  `,
};

export default CalendarHomeScreen;
