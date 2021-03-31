import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  interface DefaultTheme {
    font: string;
    colors: {
      primary: string;
      secundary: string;
      third: string;
    };
  }
}

export {};
