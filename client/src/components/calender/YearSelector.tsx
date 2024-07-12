import styled from '@emotion/native';
import {numbers} from '@/constants';
import {FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/styles/theme/colors';
import React, {useEffect, useState} from 'react';

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  onChangeYear,
  currentYear,
  hide,
}: YearSelectorProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const yearIndex = currentYear - numbers.MIN_CALENDAR_YEAR;
    const currentRow = Math.floor(
      yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
    );

    const scrollToY = currentRow * 50;

    setScrollY(scrollToY);
  }, [isVisible, currentYear]);

  return (
    <>
      {isVisible && (
        <S.Container>
          <S.YearsContainer>
            <S.ScrollContainer
              contentOffset={{x: 0, y: scrollY}}
              showsVerticalScrollIndicator={false}
              initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
              data={Array.from(
                {
                  length:
                    numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
                },
                (_, index) => ({
                  id: index,
                  num: index + numbers.MIN_CALENDAR_YEAR,
                }),
              )}
              renderItem={({item}) => (
                <S.YearButton
                  key={item.num}
                  onPress={() => onChangeYear(item.num)}
                  $isCurrentYear={item.num === currentYear}>
                  <S.YearText $isCurrentYear={item.num === currentYear}>
                    {item.num}
                  </S.YearText>
                </S.YearButton>
              )}
              keyExtractor={(item: {num: number}) => String(item.num)}
              numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
            />
          </S.YearsContainer>
          <S.CloseButton>
            <S.CloseText onPress={hide}>닫기</S.CloseText>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={colors.Grayscale.BLACK}
            />
          </S.CloseButton>
        </S.Container>
      )}
    </>
  );
}

const S = {
  Container: styled.View`
    position: absolute;
    width: 100%;
  `,
  YearsContainer: styled.View`
    align-items: center;
    background-color: ${colors.Grayscale.WHITE};
  `,
  ScrollContainer: styled(FlatList<{num: number}>)`
    max-height: 200px;
    background-color: ${colors.Grayscale.WHITE};
  `,
  CloseButton: styled.Pressable`
    flex: 1;
    background-color: ${colors.Grayscale.WHITE};
    padding: 15px;
    align-items: center;
    justify-content: center;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${colors.Grayscale.GRAY_500};
  `,
  CloseText: styled.Text`
    color: ${colors.Grayscale.BLACK};
    font-size: 16px;
    font-weight: bold;
  `,
  YearButton: styled.Pressable<{$isCurrentYear: boolean}>`
    width: 80px;
    height: 40px;
    padding: 10px;
    margin: 5px;
    border-width: 1px;
    border-color: ${({$isCurrentYear}) =>
      $isCurrentYear ? colors.Brand.PINK_700 : colors.Grayscale.GRAY_500};
    background-color: ${({$isCurrentYear}) =>
      $isCurrentYear ? colors.Brand.PINK_700 : colors.Grayscale.WHITE};
    border-radius: 2px;
    align-items: center;
    justify-content: center;
  `,
  YearText: styled.Text<{$isCurrentYear: boolean}>`
    font-size: 16px;
    font-weight: ${({$isCurrentYear}) => ($isCurrentYear ? 'bold' : 'normal')};
    color: ${({$isCurrentYear}) =>
      $isCurrentYear ? colors.Grayscale.WHITE : colors.Grayscale.GRAY_700};
  `,
};

export default YearSelector;
