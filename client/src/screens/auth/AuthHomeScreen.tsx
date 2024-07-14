import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {navigations} from '@/constants';
import styled, {css} from '@emotion/native';
import {getSize} from '@/utils/get-size';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';
import {colors} from '@/styles/theme/colors';

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
          label="카카오 로그인 하기"
          onPress={() => navigation.navigate(navigations.KAKAO)}
          buttonStyle={S.KakaoButtonContainer}
          textStyle={S.KakaoButtonText}
          icon={
            <Ionicons name="chatbubble-sharp" color={'#181500'} size={16} />
          }
        />
        <CustomButton
          label="이메일 로그인하기"
          onPress={() => navigation.navigate(navigations.LOGIN)}
        />
        <Pressable onPress={() => navigation.navigate(navigations.SIGNUP)}>
          <S.EmailText>이메일로 가입하기</S.EmailText>
        </Pressable>
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
  KakaoButtonContainer: css`
    background-color: #fee503;
  `,
  KakaoButtonText: css`
    color: #181600;
  `,
  EmailText: styled.Text`
    text-decoration: underline;
    text-align: center;
    font-weight: 500;
    padding: 10px;
    color: ${colors.Grayscale.BLACK};
  `,
};

export default AuthHomeScreen;
