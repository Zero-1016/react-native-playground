import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '@/hooks/queries/useAuth';
import ResetErrorBoundary from '@/components/common/ResetErrorBoundary';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoginLoading]);

  return (
    <ResetErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </ResetErrorBoundary>
  );
}

export default RootNavigator;
