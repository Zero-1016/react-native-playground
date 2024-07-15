import {Category} from '@/types/domain';

type UserInformation = {
  email: string;
  password: string;
};

function isBlack(text: string) {
  return text.trim() === '';
}

function validateUser({email, password}: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }
  if (!(password.length >= 8 && password.length <= 20)) {
    errors.password = '비밀번호는 8자 이상 20자 이하여야 합니다.';
  }
  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignUp(values: UserInformation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signUpErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signUpErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  return signUpErrors;
}

function validateAddPost(values: {title: string}) {
  const errors = {
    title: '',
    description: '',
  };

  if (values.title.trim() === '') {
    errors.title = '제목은 1 ~ 30자 이내로 입력해주세요';
  }

  return errors;
}

function validateEditProfile(values: {nickname: string}) {
  const errors = {
    nickname: '',
  };

  if (isBlack(values.nickname)) {
    errors.nickname = '닉네임을 입력해주세요.';
  }
  return errors;
}

function validateCategory(values: Category) {
  const errors = {
    RED: '',
    YELLOW: '',
    GREEN: '',
    BLUE: '',
    PURPLE: '',
  };

  if (
    isBlack(values.RED) ||
    isBlack(values.YELLOW) ||
    isBlack(values.BLUE) ||
    isBlack(values.GREEN) ||
    isBlack(values.PURPLE)
  ) {
    if (isBlack(values.RED)) {
      errors.RED = '카테고리를 입력해주세요.';
    } else if (isBlack(values.YELLOW)) {
      errors.YELLOW = '카테고리를 입력해주세요.';
    } else if (isBlack(values.GREEN)) {
      errors.GREEN = '카테고리를 입력해주세요.';
    } else if (isBlack(values.BLUE)) {
      errors.BLUE = '카테고리를 입력해주세요.';
    } else if (isBlack(values.PURPLE)) {
      errors.PURPLE = '카테고리를 입력해주세요.';
    }
  }
  return errors;
}

export {
  validateLogin,
  validateSignUp,
  validateAddPost,
  validateEditProfile,
  validateCategory,
};
