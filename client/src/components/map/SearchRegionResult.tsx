import styled from '@emotion/native';
import {RegionInfo} from '@/hooks/useSearchLocation';
import Octicons from 'react-native-vector-icons/Octicons';
import {lightColors} from '@/styles/theme/colors';
import {getSize} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {LatLng} from 'react-native-maps';
import useLocationStore from '@/store/useLocationStore';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

function SearchRegionResult({regionInfo}: SearchRegionResultProps) {
  const navigation = useNavigation();
  const {setMoveLocation, setSelectedLocation} = useLocationStore();
  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
  };

  const moveToMapScreen = (regionLocation: LatLng) => {
    navigation.goBack();
    setMoveLocation(regionLocation);
    setSelectedLocation(regionLocation);
  };

  return (
    <S.Container>
      <S.ScrollContainer>
        {regionInfo.map((info, index) => (
          <S.ItemBorder
            onPress={() => handlePressRegionInfo(info.y, info.x)}
            key={info.id}
            $isLastItem={regionInfo.length - 1 === index}>
            <S.PlaceNameContainer>
              <Octicons
                name="location"
                size={15}
                color={lightColors.PINK_700}
              />
              <S.PlaceNameText ellipsizeMode="tail" numberOfLines={1}>
                {info.place_name}
              </S.PlaceNameText>
            </S.PlaceNameContainer>
            <S.CategoryContainer>
              <S.DistanceText>
                {(Number(info.distance) / 1000).toFixed(2)}km
              </S.DistanceText>
              <S.SubInfoText>{info.category_name}</S.SubInfoText>
            </S.CategoryContainer>
            <S.SubInfoText>{info.road_address_name}</S.SubInfoText>
          </S.ItemBorder>
        ))}

        {regionInfo.length === 0 && (
          <S.NoResultContainer>
            <S.NoResultText>검색 결과가 없습니다.</S.NoResultText>
          </S.NoResultContainer>
        )}
      </S.ScrollContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    border-width: 1px;
    border-color: ${props => props.theme.colors.GRAY_200};
    border-radius: 5px;
    height: ${getSize.screenHeight / 2 + 'px'};
    margin: 10px 0;
    width: 100%;
  `,
  ScrollContainer: styled.ScrollView`
    padding: 10px;
  `,
  ItemBorder: styled.Pressable<{$isLastItem: boolean}>`
    margin: 5px 10px;
    border-bottom-color: ${props => props.theme.colors.GRAY_300};
    border-bottom-width: ${({$isLastItem}) => ($isLastItem ? '0' : '1px')}
    gap: 3px;
  `,
  PlaceNameContainer: styled.View`
    gap: 3px;
    flex-direction: row;
    align-items: center;
  `,
  PlaceNameText: styled.Text`
    color: ${props => props.theme.colors.BLACK};
    flex-shrink: 1;
    font-size: 16px;
    font-weight: bold;
  `,
  CategoryContainer: styled.View`
    flex-direction: row;
    gap: 10px;
  `,
  DistanceText: styled.Text`
    color: ${props => props.theme.colors.BLACK};
  `,
  SubInfoText: styled.Text`
    flex-shrink: 1;
    color: ${props => props.theme.colors.GRAY_500};
  `,
  NoResultContainer: styled.View`
    flex: 1;
    align-items: center;
    margin-top: 50px;
  `,
  NoResultText: styled.Text`
    color: ${props => props.theme.colors.GRAY_500};
    font-size: 16px;
  `,
};

export default SearchRegionResult;
