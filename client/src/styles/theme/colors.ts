import {ThemeMode} from '@/types/common';

const brand = {
  PINK_200: '#FAE2E9',
  PINK_400: '#EC87A5',
  PINK_700: '#C63B64',
  BLUE_400: '#B4E0FF',
  GREEN_400: '#CCE6BA',
  YELLOW_400: '#FFE594',
  PURPLE_400: '#C4C4E7',
};

const system = {
  PINK_500: '#BF5C79',
  RED_300: '#FFB4B4',
  RED_500: '#FF5F5F',
  BLUE_500: '#0d8aff',
  YELLOW_500: '#FACC15',
};

const light = {
  WHITE: '#FFFFFF',
  GRAY_100: '#F8F8F8',
  GRAY_200: '#E3E3E3',
  GRAY_300: '#D8D8D8',
  GRAY_500: '#8E8E8E',
  GRAY_700: '#575757',
  BLACK: '#161616',
};

const dark = {
  WHITE: '#161616',
  GRAY_100: '#202124',
  GRAY_200: '#3C4043',
  GRAY_300: '#5E5E5E',
  GRAY_500: '#8E8E8E',
  GRAY_700: '#F8F8F8',
  BLACK: '#FFFFFF',
};

export const colorHex = {
  RED: brand.PINK_400,
  BLUE: brand.BLUE_400,
  GREEN: brand.GREEN_400,
  YELLOW: brand.YELLOW_400,
  PURPLE: brand.PURPLE_400,
};

export const colors = {
  light,
  dark,
};

export const lightColors = {
  ...brand,
  ...system,
  ...light,
};

export const darkColors = {
  ...brand,
  ...system,
  ...dark,
};
