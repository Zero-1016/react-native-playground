import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '@/hooks/queries/useAuth';
import ResetErrorBoundary from '@/components/common/ResetErrorBoundary';

function RootNavigator() {
  const {isLogin} = useAuth();

  return (
    <ResetErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </ResetErrorBoundary>
  );
}

export default RootNavigator;
