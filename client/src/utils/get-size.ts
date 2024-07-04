import {Dimensions} from 'react-native';

export const getSize = {
  deviceHeight: Dimensions.get('screen').height,
  deviceWidth: Dimensions.get('screen').width,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};
