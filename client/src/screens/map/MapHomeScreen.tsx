import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styled from '@emotion/native';

function MapHomeScreen() {
  return (
    <S.MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      followsUserLocation={true}
      showsMyLocationButton={false}
    />
  );
}

const S = {
  MapView: styled(MapView)`
    flex: 1;
  `,
};

export default MapHomeScreen;
