import {AxiosError} from 'axios';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = unknown> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
