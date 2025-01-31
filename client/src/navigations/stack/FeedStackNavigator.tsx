import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {feedNavigations} from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {colors} from '@/styles/theme/colors';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import {LatLng} from 'react-native-maps';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';
import useThemeStore from '@/store/useThemeStore';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: theme === 'light' ? 'white' : 'black',
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: theme === 'light' ? 'white' : 'black',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: theme === 'light' ? 'black' : 'white',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerLeft: () => FeedHomeHeaderLeft(navigation),
          headerTitle: '피드',
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
