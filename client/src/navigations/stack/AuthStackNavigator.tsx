import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignScreen from '@/screens/auth/SignScreen';
import {navigations} from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import useThemeStore from '@/store/useThemeStore';

export type AuthStackParamList = {
  [navigations.AUTH_HOME]: undefined;
  [navigations.LOGIN]: undefined;
  [navigations.SIGNUP]: undefined;
  [navigations.KAKAO]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
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
        name={navigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigations.LOGIN}
        component={LoginScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen
        name={navigations.SIGNUP}
        component={SignScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name={navigations.KAKAO}
        component={KakaoLoginScreen}
        options={{
          headerTitle: '카카오 로그인',
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
