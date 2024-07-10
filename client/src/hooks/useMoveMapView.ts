import {useEffect, useRef, useState} from 'react';
import useLocationStore from '@/store/useLocationStore';
import MapView, {LatLng, Region} from 'react-native-maps';
import {numbers} from '@/constants';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();
  useEffect(() => {
    if (moveLocation) {
      moveMapView(moveLocation);
    }
  }, [moveLocation]);

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const {longitudeDelta, latitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
