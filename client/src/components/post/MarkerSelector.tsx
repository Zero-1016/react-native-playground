import {ScrollView} from 'react-native';
import styled from '@emotion/native';
import CustomMarker from '@/components/common/CustomMarker';
import {MarkerColor} from '@/types/domain';

interface MarkerSelectorProps {
  score: number;
  markerColor: MarkerColor;
  onPressMarker: (color: MarkerColor) => void;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MarkerSelector({
  score,
  markerColor,
  onPressMarker,
}: MarkerSelectorProps) {
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
    border-color: ${props => props.theme.colors.GRAY_200};
    padding: 15px;
  `,
  MarkerLabel: styled.Text`
    margin-bottom: 15px;
    color: ${props => props.theme.colors.GRAY_700};
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
    background-color: ${props => props.theme.colors.GRAY_100};
    border-radius: 6px;
    ${({$select, theme}) =>
      $select && `border-width: 2px; border-color: ${theme.colors.RED_500};`}
  `,
};

export default MarkerSelector;
