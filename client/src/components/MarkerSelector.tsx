import {ScrollView} from 'react-native';
import styled from '@emotion/native';
import CustomMarker from '@/components/CustomMarker';
import {MarkerColor} from '@/types/domain';
import {colors} from '@/styles/theme/colors';

interface MarkerSelectorProps {
  score: number;
  markerColor: MarkerColor;
  onPressMarker: (color: MarkerColor) => void;
}

function MarkerSelector({
  score,
  markerColor,
  onPressMarker,
}: MarkerSelectorProps) {
  const categoryList: MarkerColor[] = [
    'RED',
    'YELLOW',
    'GREEN',
    'BLUE',
    'PURPLE',
  ];
  return (
    <S.Container>
      <S.MarkerLabel>마커 선택</S.MarkerLabel>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <S.StylesInputScroll>
          {categoryList.map((color, index) => {
            return (
              <S.Pressable
                key={index}
                onPress={() => onPressMarker(color)}
                $select={markerColor === color}>
                <CustomMarker score={score} color={color} />
              </S.Pressable>
            );
          })}
        </S.StylesInputScroll>
      </ScrollView>
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    border-width: 1px;
    border-color: ${colors.Grayscale.GRAY_200};
    padding: 15px;
  `,
  MarkerLabel: styled.Text`
    margin-bottom: 15px;
    color: ${colors.Grayscale.GRAY_700};
  `,
  StylesInputScroll: styled.View`
    flex-direction: row;
    gap: 20px;
  `,
  Pressable: styled.Pressable<{$select: boolean}>`
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: ${colors.Grayscale.GRAY_100};
    border-radius: 6px;
    ${({$select}) =>
      $select && `border-width: 2px; border-color: ${colors.System.RED_500};`}
  `,
};

export default MarkerSelector;
