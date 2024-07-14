import {create} from 'zustand';
import {LatLng} from 'react-native-maps';

interface LocationState {
  moveLocation: null | LatLng;
  selectedLocation: null | LatLng;
  setMoveLocation: (location: LatLng) => void;
  setSelectedLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectedLocation: null,
  setMoveLocation: (location: LatLng) =>
    set(state => ({...state, moveLocation: location})),
  setSelectedLocation: (location: LatLng | null) =>
    set(state => ({...state, selectedLocation: location})),
}));

export default useLocationStore;
