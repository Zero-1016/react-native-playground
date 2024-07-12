const numbers = {
  ACCESS_TOKEN_EXPIRATION: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_DELTA: {
    latitudeDelta: 0.922,
    longitudeDelta: 0.0421,
  },
  MIN_CALENDAR_YEAR: 1980,
  MAX_CALENDAR_YEAR: 2099,
  CALENDAR_YEAR_SELECTOR_COLUMN: 4,
} as const;

export {numbers};
