import React from 'react';
import styled from '@emotion/native';
import InputFiled from '@/components/InputFiled';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';
import {validateSignUp} from '@/utils';

function SignScreen() {
  const signUp = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignUp,
  });
  return (
    <S.SafeAreaView>
      <S.InputContainer>
        <InputFiled
          placeholder="이메일"
          inputMode="email"
          error={signUp.errors.email}
          touched={signUp.touched.email}
          {...signUp.getTextInputProps('email')}
        />
        <InputFiled
          placeholder="비밀번호"
          secureTextEntry
          error={signUp.errors.password}
          touched={signUp.touched.password}
          {...signUp.getTextInputProps('password')}
        />
        <InputFiled
          placeholder="비밀번호 확인"
          secureTextEntry
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          {...signUp.getTextInputProps('passwordConfirm')}
        />
      </S.InputContainer>
      <CustomButton label="회원가입" />
    </S.SafeAreaView>
  );
}

const S = {
  SafeAreaView: styled.SafeAreaView``,
  InputContainer: styled.View``,
};

export default SignScreen;
