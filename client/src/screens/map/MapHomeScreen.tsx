import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import useAuth from '@/hooks/useAuth';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  return (
    <SafeAreaView>
      <Text>맵 스크린</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </SafeAreaView>
  );
}

export default MapHomeScreen;
