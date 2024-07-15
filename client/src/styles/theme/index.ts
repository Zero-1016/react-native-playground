import {lightColors, darkColors} from '@/styles/theme/colors';

const lightTheme = {
  colors: lightColors,
};

const darkTheme = {
  colors: darkColors,
};

export {lightTheme, darkTheme};

export type ThemeType = typeof lightTheme;
