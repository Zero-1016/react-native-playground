import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import theme from '@/styles/theme';
import {ThemeProvider} from '@emotion/react';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/api/query-client';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
