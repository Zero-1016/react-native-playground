import {useEffect} from 'react';
import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';

import {
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
  ResponseProfile,
  ResponseToken,
} from '@/api/auth';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {errorMessages, numbers, queryKeys, storageKeys} from '@/constants';
import {removeHeader, setHeader} from '@/utils/set-header';
import queryClient from '@/api/query-client';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import Toast from 'react-native-toast-message';
import {Category, Profile} from '@/types/domain';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useLogin<T>(
  loginApi: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginApi,
    throwOnError: error => Number(error.response?.status) >= 500,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
}

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_EXPIRATION,
    refetchInterval: numbers.ACCESS_TOKEN_EXPIRATION,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

type ResponseSelectProfile = {categories: Category} & Profile;

const transformProfileCategory = (data: ResponseProfile) => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

  return {categories, ...rest};
};

function useGetProfile(
  queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    select: transformProfileCategory,
    ...queryOptions,
  });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
      Toast.show({
        type: 'success',
        text1: '카테고리가 변경되었습니다.',
        position: 'bottom',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
        position: 'bottom',
      });
    },
    ...mutationOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
      Toast.show({
        type: 'success',
        text1: '프로필이 변경되었습니다.',
        position: 'bottom',
      });
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      await queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const editCategoryMutation = useMutateCategory();
  const deleteAccountMutation = useDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useMutateCategory();

  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    isLogin,
    kakaoLoginMutation,
    logoutMutation,
    appleLoginMutation,
    profileMutation,
    deleteAccountMutation,
    editCategoryMutation,
    categoryMutation,
  };
}

export default useAuth;
