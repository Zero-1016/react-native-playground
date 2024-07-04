import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View} from 'react-native';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/CustomButton';
import {authNavigations} from '@/constants';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          label="로그인화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입 이동"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
