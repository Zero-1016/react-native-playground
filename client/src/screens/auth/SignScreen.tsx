import React from 'react';
import styled from '@emotion/native';
import InputFiled from '@/components/common/InputFiled';
import useForm from '@/hooks/useForm';
import {validateSignUp} from '@/utils';
import {TextInput} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import CustomButton from '@/components/common/CustomButton';

function SignScreen() {
  const passwordRef = React.useRef<TextInput>(null);
  const passwordConfirmRef = React.useRef<TextInput>(null);
  const {signupMutation, loginMutation} = useAuth();
  const signUp = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignUp,
  });

  const handleSubmit = () => {
    const {email, password} = signUp.values;
    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
      },
    );
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
          error={signUp.errors.email}
          touched={signUp.touched.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signUp.getTextInputProps('email')}
        />
        <InputFiled
          ref={passwordRef}
          placeholder="비밀번호"
          secureTextEntry
          textContentType="oneTimeCode"
          returnKeyType="next"
          blurOnSubmit={false}
          error={signUp.errors.password}
          touched={signUp.touched.password}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signUp.getTextInputProps('password')}
        />
        <InputFiled
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          secureTextEntry
          textContentType="oneTimeCode"
          returnKeyType="join"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          {...signUp.getTextInputProps('passwordConfirm')}
        />
      </S.InputContainer>
      <CustomButton
        label="회원가입"
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

export default SignScreen;
