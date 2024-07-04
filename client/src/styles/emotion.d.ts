import {ThemeType} from '@/styles/theme';

export {};

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
