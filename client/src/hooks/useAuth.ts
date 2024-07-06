import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {
  ResponseProfile,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {numbers, queryKeys, storageKeys} from '@/constants';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/hooks/common';
import queryClient from '@/api/query-client';
import {removeHeader, setHeader} from '@/utils/set-header';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
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
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
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
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    isLogin,
    logoutMutation,
  };
}

export default useAuth;
