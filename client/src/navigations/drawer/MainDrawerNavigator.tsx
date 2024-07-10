import {createDrawerNavigator} from '@react-navigation/drawer';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {
  MapStackParamList,
} from '@/navigations/stack/MapStackNavigator';
import {mainNavigations} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/styles/theme/colors';
import {getSize} from '@/utils';
import CustomDrawerContent from '@/navigations/drawer/CustomDrawerContent';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.Calender]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME:
      iconName = 'location-on';
      break;
    case mainNavigations.FEED:
      iconName = 'book';
      break;
    case mainNavigations.Calender:
      iconName = 'event-note';
      break;
  }
  return (
    <MaterialIcons
      size={18}
      name={iconName}
      color={focused ? colors.Grayscale.BLACK : colors.Grayscale.GRAY_500}
    />
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: getSize.screenWidth * 0.6,
          backgroundColor: colors.Grayscale.WHITE,
        },
        drawerActiveTintColor: colors.Grayscale.BLACK,
        drawerInactiveTintColor: colors.Grayscale.GRAY_500,
        drawerActiveBackgroundColor: colors.Brand.PINK_200,
        drawerInactiveBackgroundColor: colors.Grayscale.GRAY_100,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedStackNavigator}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.Calender}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
