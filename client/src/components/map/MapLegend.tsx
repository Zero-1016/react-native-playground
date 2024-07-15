import useAuth from '@/hooks/queries/useAuth';
import {Text} from 'react-native';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Category} from '@/types/domain';
import {Fragment} from 'react';
import {colorHex} from '@/styles/theme/colors';
import {categoryList} from '@/constants';

interface MapLegendProps {}

function MapLegend({}: MapLegendProps) {
  const {getProfileQuery} = useAuth();
  const inset = useSafeAreaInsets();
  const {categories} = getProfileQuery.data || {};

  return (
    <>
      {Object.values(categories as Category).join('') !== '' && (
        <S.Container $top={inset.top + 20}>
          {categoryList.map((color, index) => {
            return (
              <Fragment key={index}>
                {categories?.[color] !== '' && (
                  <S.Column>
                    <S.LegendColor $backgroundColor={colorHex[color]} />
                    <Text>{categories?.[color]}</Text>
                  </S.Column>
                )}
              </Fragment>
            );
          })}
        </S.Container>
      )}
    </>
  );
}

const S = {
  Container: styled.View<{$top: number}>`
    position: absolute;
    top: ${({$top}) => $top + 'px'};
    right: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 10px;
    gap: 3px;
  `,
  Column: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
  `,
  LegendColor: styled.View<{$backgroundColor: string}>`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: ${({$backgroundColor}) => $backgroundColor};
  `,
  LegendText: styled.Text`
    color: white;
    font-weight: 500;
    font-size: 13px;
  `,
};

export default MapLegend;
