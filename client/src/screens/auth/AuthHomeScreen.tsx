import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {navigations} from '@/constants';
import styled from '@emotion/native';
import {getSize} from '@/utils/get-size';
import CustomButton from '@/components/common/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof navigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image
          resizeMode="contain"
          source={require('../../assets/matzip.png')}
        />
      </S.ImageContainer>
      <S.ButtonContainer>
        <CustomButton
          label="로그인하기"
          onPress={() => navigation.navigate(navigations.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(navigations.SIGNUP)}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
    margin: 30px;
    align-items: center;
    justify-content: center;
  `,
  ButtonContainer: styled.View`
    flex: 1;
    gap: 10px;
    justify-content: center;
  `,
  ImageContainer: styled.View`
    flex: 1.5;
    width: ${getSize.screenWidth / 2 + 'px'};
    align-items: center;
    justify-content: center;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
  `,
};

export default AuthHomeScreen;
