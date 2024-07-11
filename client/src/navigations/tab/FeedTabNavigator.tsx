import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import FeedStackNavigator from '../stack/FeedStackNavigator';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import {feedNavigations, feedTabNavigations} from '@/constants';
import {colors} from '@/styles/theme/colors';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL;
    params: {id: number};
    initial: boolean;
  };
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case feedTabNavigations.FEED_HOME: {
      iconName = focused ? 'reader' : 'reader-outline';
      break;
    }
    case feedTabNavigations.FEED_FAVORITE: {
      iconName = focused ? 'star' : 'star-outline';
      break;
    }
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.Brand.PINK_700 : colors.Grayscale.GRAY_500}
      size={25}
    />
  );
}

function FeedTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.Grayscale.WHITE,
          shadowColor: colors.Grayscale.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.Grayscale.BLACK,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.Brand.PINK_700,
        tabBarStyle: {
          backgroundColor: colors.Grayscale.WHITE,
          borderTopColor: colors.Grayscale.GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName =
              getFocusedRouteNameFromRoute(tabRoute) ??
              feedNavigations.FEED_HOME;

            if (
              routeName === feedNavigations.FEED_DETAIL ||
              routeName === feedNavigations.EDIT_POST ||
              routeName === feedNavigations.IMAGE_ZOOM
            ) {
              return {display: 'none'};
            }

            return {
              backgroundColor: colors.Grayscale.WHITE,
              borderTopColor: colors.Grayscale.GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          headerTitle: '즐겨찾기',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

export default FeedTabNavigator;
