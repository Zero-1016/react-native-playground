import React, {useRef} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styled from '@emotion/native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {Text} from 'react-native';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '@/styles/theme';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  usePermission('LOCATION');
  const {userLocation, isUserLocationError} = useUserLocation();
  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      longitudeDelta: 0.0922,
      latitudeDelta: 0.0421,
    });
  };

  return (
    <>
      <S.MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
      />
      <S.Pressable _inset={inset} onPress={() => navigation.openDrawer()}>
        <IonicIcons
          name="menu"
          color={theme.colors.Grayscale.WHITE}
          size={25}
        />
      </S.Pressable>
      <S.ButtonList>
        <S.MapButton onPress={handlePressUserLocation}>
          <MaterialIcons
            name="my-location"
            color={theme.colors.Grayscale.WHITE}
            size={25}
          />
        </S.MapButton>
      </S.ButtonList>
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
    background-color: ${({theme}) => theme.colors.Brand.PINK_700};
    shadow-color: ${({theme}) => theme.colors.Grayscale.BLACK};
    shadow-offset: 1px 1px;
    shadow-opacity: 0.5;
    elevation: 4;
  `,
  ButtonList: styled.View`
    position: absolute;
    bottom: 30px;
    right: 15px;
  `,
  MapButton: styled.Pressable`
    background-color: ${({theme}) => theme.colors.Brand.PINK_700};
    margin: 0 5px;
    height: 48px;
    width: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    shadow-color: ${({theme}) => theme.colors.Grayscale.BLACK};
    shadow-offset: 2px 1px;
    shadow-opacity: 0.5;
    elevation: 2;
  `,
};

export default MapHomeScreen;
