const numbers = {
  ACCESS_TOKEN_EXPIRATION: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_DELTA: {
    latitudeDelta: 0.922,
    longitudeDelta: 0.0421,
  },
} as const;

export {numbers};
