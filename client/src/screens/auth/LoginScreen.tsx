import React from 'react';
import InputFiled from '@/components/InputFiled';
import styled from '@emotion/native';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import {TextInput} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

function LoginScreen() {
  const passwordRef = React.useRef<TextInput>(null);
  const {loginMutation} = useAuth();

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <S.SafeAreaView>
      <S.InputContainer>
        <InputFiled
          autoFocus
          placeholder="이메일"
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          error={login.errors.email}
          touched={login.touched.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputFiled
          ref={passwordRef}
          placeholder="비밀번호"
          secureTextEntry
          returnKeyType="join"
          textContentType="oneTimeCode"
          blurOnSubmit={false}
          error={login.errors.password}
          touched={login.touched.password}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </S.InputContainer>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </S.SafeAreaView>
  );
}

const S = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
    margin: 30px;
  `,
  InputContainer: styled.View`
    gap: 20px;
    margin-bottom: 30px;
  `,
};

export default LoginScreen;
