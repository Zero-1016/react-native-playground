import HeaderButton from '@/components/common/HeaderButton';

function CalendarHomeHeaderRight(onPress: () => void) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

export default CalendarHomeHeaderRight;
