import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useAppState from '@/hooks/useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.55160332365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();
  console.log(isComeback, 'isComeback');
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
