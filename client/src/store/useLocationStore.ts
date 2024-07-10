import {create} from 'zustand';
import {LatLng} from 'react-native-maps';

interface LocationState {
  moveLocation: null | LatLng;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  setMoveLocation: (location: LatLng) => set({moveLocation: location}),
}));

export default useLocationStore;
