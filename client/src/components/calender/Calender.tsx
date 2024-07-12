import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/styles/theme/colors';
import React, {useEffect} from 'react';
import styled from '@emotion/native';
import DayOfWeeks from '@/components/calender/DayOfWeeks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isSameAsCurrentDate, type MonthYear} from '@/utils';
import {FlatList} from 'react-native';
import DateBox from '@/components/calender/DateBox';
import useModal from '@/hooks/useModal';
import YearSelector from '@/components/calender/YearSelector';
import {useNavigation} from '@react-navigation/native';
import CalendarHomeHeaderRight from '@/components/calender/CalendarHomeHeaderRight';

interface CalenderProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T>;
  moveToToday: () => void;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}

function Calender<T>({
  onChangeMonth,
  monthYear,
  onPressDate,
  selectedDate,
  schedules,
  moveToToday,
}: CalenderProps<T>) {
  const {month, year, lastDate, firstDOW} = monthYear;
  const yearSelector = useModal();
  const navigation = useNavigation();
  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight(moveToToday),
    });
  }, [moveToToday, navigation]);

  return (
    <>
      <S.HeaderContainer>
        <S.MonthButtonContainer onPress={() => onChangeMonth(-1)}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={colors.Grayscale.BLACK}
          />
        </S.MonthButtonContainer>
        <S.MonthYearContainer>
          <S.TitleText>
            {year}년 {month}월
          </S.TitleText>
          <MaterialIcons
            onPress={yearSelector.show}
            name="keyboard-arrow-down"
            size={20}
            color={colors.Grayscale.GRAY_500}
          />
        </S.MonthYearContainer>
        <S.MonthButtonContainer onPress={() => onChangeMonth(1)}>
          <Ionicons
            name="arrow-forward"
            size={25}
            color={colors.Grayscale.BLACK}
          />
        </S.MonthButtonContainer>
      </S.HeaderContainer>
      <DayOfWeeks />
      <S.BodyContainer>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              date={item.date}
              hasSchedule={Boolean(schedules[item.date])}
            />
          )}
          numColumns={7}
        />
      </S.BodyContainer>

      <YearSelector
        currentYear={year}
        onChangeYear={handleChangeYear}
        isVisible={yearSelector.isVisible}
        hide={yearSelector.hide}
      />
    </>
  );
}

const S = {
  HeaderContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 16px 25px;
  `,
  MonthYearContainer: styled.Pressable`
    flex-direction: row;
    align-items: center;
    padding: 10px;
  `,
  MonthButtonContainer: styled.Pressable`
    padding: 10px;
  `,
  TitleText: styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Grayscale.BLACK};
  `,
  BodyContainer: styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${colors.Grayscale.GRAY_300};
    background-color: ${colors.Grayscale.GRAY_100};
  `,
};

export default Calender;
