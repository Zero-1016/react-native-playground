import {useState} from 'react';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import styled from '@emotion/native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/styles/mapStyle';
import {colors} from '@/styles/theme/colors';
import CustomMarker from '@/components/common/CustomMarker';
import {Alert} from 'react-native';
import {alerts, mapNavigations, numbers} from '@/constants';
import {useGetMarkers} from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkers();
  usePermission('LOCATION');
  const markerModal = useModal();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const [markerId, setMarkerId] = useState<number | null>(null);

  const {userLocation, isUserLocationError} = useUserLocation();

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectedLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectedLocation,
    });

    setSelectedLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  return (
    <>
      <S.MapView
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        onRegionChange={handleChangeDelta}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        showsMyLocationButton={false}
        onLongPress={handleLongPressMapView}>
        {markers.map(({id, score, color, ...coordinate}) => (
          <CustomMarker
            key={id}
            score={score}
            coordinate={coordinate}
            color={color}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectedLocation && (
          <Callout>
            <Marker coordinate={selectedLocation} />
          </Callout>
        )}
      </S.MapView>
      <S.Pressable _inset={inset} onPress={() => navigation.openDrawer()}>
        <IonicIcons name="menu" color={colors.Grayscale.WHITE} size={25} />
      </S.Pressable>
      <S.ButtonList>
        <S.MapButton onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.Grayscale.WHITE} size={25} />
        </S.MapButton>
        <S.MapButton onPress={handlePressUserLocation}>
          <MaterialIcons
            name="my-location"
            color={colors.Grayscale.WHITE}
            size={25}
          />
        </S.MapButton>
      </S.ButtonList>
      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
    </>
  );
}

const S = {
  MapView: styled(MapView)`
    flex: 1;
  `,
  Pressable: styled.Pressable<{_inset: EdgeInsets}>`
    position: absolute;
    top: ${({_inset}) => (_inset.top ? _inset.top : 10 + 'px')};
    left: 0;
    padding: 12px 10px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: ${colors.Brand.PINK_700};
    shadow-color: ${colors.Grayscale.BLACK};
    shadow-offset: 1px 1px;
    shadow-opacity: 0.5;
    elevation: 4;
    shadow-radius: 2px; /* 추가: 그림자 반경 */
  `,
  ButtonList: styled.View`
    position: absolute;
    bottom: 30px;
    right: 15px;
    gap: 10px;
  `,
  MapButton: styled.Pressable`
    background-color: ${colors.Brand.PINK_700};
    margin: 0 5px;
    height: 48px;
    width: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    shadow-color: ${colors.Grayscale.BLACK};
    shadow-offset: 2px 1px;
    shadow-opacity: 0.5;
    elevation: 2;
    shadow-radius: 1px; /* 추가: 그림자 반경 */
  `,
};

export default MapHomeScreen;
