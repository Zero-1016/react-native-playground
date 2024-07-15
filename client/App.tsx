import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import {darkTheme, lightTheme} from '@/styles/theme';
import {ThemeProvider} from '@emotion/react';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/api/query-client';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import {StatusBar} from 'react-native';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: lightTheme.colors.RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App() {
  const {theme: themeMode} = useThemeStore();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'}
      />
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <NavigationContainer>
          <RootNavigator />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
