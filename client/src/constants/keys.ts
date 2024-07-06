const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
};

export {queryKeys, storageKeys};
