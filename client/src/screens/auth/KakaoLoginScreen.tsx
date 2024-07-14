import styled from '@emotion/native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';
import useAuth from '@/hooks/queries/useAuth';
import {ActivityIndicator, Platform} from 'react-native';
import {useState} from 'react';
import {colors} from '@/styles/theme/colors';
import {getSize} from '@/utils';

const REDIRECT_URI = `${
  Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:3030'
}/auth/oauth/kakao`;

function KakaoLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(false);
  const {kakaoLoginMutation} = useAuth();

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
    }
  };
  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  const handleNavigationChangeState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <S.Container>
      {(isChangeNavigate || isLoading) && (
        <S.KaKaoLoadingContainer>
          <ActivityIndicator size="small" color={colors.Grayscale.BLACK} />
        </S.KaKaoLoadingContainer>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
  `,
  KaKaoLoadingContainer: styled.View`
    background-color: ${colors.Grayscale.WHITE};
    height: ${getSize.deviceHeight};
    padding-bottom: 100px;
    align-items: center;
    justify-content: center;
  `,
};

export default KakaoLoginScreen;
