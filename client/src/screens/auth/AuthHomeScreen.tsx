import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {navigations} from '@/constants';
import styled, {css} from '@emotion/native';
import {getSize} from '@/utils/get-size';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform, Pressable} from 'react-native';
import {colors} from '@/styles/theme/colors';
import {
  appleAuth,
  AppleButton,
  AppleError,
} from '@invertase/react-native-apple-authentication';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof navigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const {appleLoginMutation} = useAuth();
  const handlePressAppleLogin = async () => {
    try {
      const {identityToken, fullName} = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (identityToken) {
        appleLoginMutation.mutate({
          identityToken,
          appId: 'org.reactjs.native.example.MatzipApp',
          nickname: fullName?.givenName ?? null,
        });
      }
    } catch (error: any) {
      if (error.code !== appleAuth.Error.CANCELED) {
        Toast.show({
          type: 'error',
          text1: '애플 로그인이 실패하였습니다.',
          text2: '나중에 다시 시도해주세요',
        });
      }
    }
  };

  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image
          resizeMode="contain"
          source={require('../../assets/matzip.png')}
        />
      </S.ImageContainer>
      <S.ButtonContainer>
        {Platform.OS === 'ios' && (
          <S.AppleCustomButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
        )}
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
  AppleCustomButton: styled(AppleButton)`
    width: ${getSize.screenWidth - 60 + 'px'};
    height: 45px;
    padding: 25px 0;
  `,
};

export default AuthHomeScreen;
