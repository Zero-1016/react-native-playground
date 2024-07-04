import React from 'react';
import InputFiled from '@/components/InputFiled';
import styled from '@emotion/native';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';

function LoginScreen() {
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });
  const handleSubmit = () => {
    console.log(login.values);
  };

  return (
    <S.SafeAreaView>
      <S.InputContainer>
        <InputFiled
          placeholder="이메일"
          inputMode="email"
          error={login.errors.email}
          touched={login.touched.email}
          {...login.getTextInputProps('email')}
        />
        <InputFiled
          placeholder="비밀번호"
          secureTextEntry
          error={login.errors.password}
          touched={login.touched.password}
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
