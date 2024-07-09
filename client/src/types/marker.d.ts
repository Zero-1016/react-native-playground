import {LatLng, MapMarkerProps} from 'react-native-maps';

declare module 'react-native-maps' {
  export interface MyMarkerProps extends MapMarkerProps {
    coordinate?: LatLng;
  }
}
