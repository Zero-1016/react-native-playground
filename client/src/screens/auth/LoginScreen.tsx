import React, {useState} from 'react';
import InputFiled from '@/components/InputFiled';
import styled from '@emotion/native';

function LoginScreen() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeText = (name: string, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: string) => () => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <S.SafeAreaView>
      <S.Container>
        <InputFiled
          placeholder="이메일"
          inputMode="email"
          touched={touched.email}
          value={values.email}
          onChangeText={text => handleChangeText('email', text)}
          onBlur={handleBlur('email')}
        />
        <InputFiled
          placeholder="비밀번호"
          secureTextEntry
          touched={touched.password}
          value={values.password}
          onChangeText={text => handleChangeText('password', text)}
          onBlur={handleBlur('password')}
        />
      </S.Container>
    </S.SafeAreaView>
  );
}

const S = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
    margin: 30px;
  `,
  Container: styled.View`
    gap: 20px;
  `,
};

export default LoginScreen;
