import 'styled-components';

type Variant = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      white: string;
      black: string;

      cardBackground: string;

      amber: Variant;
      blue: Variant;
      brown: Variant;
      crimson: Variant;
      cyan: Variant;
      grass: Variant;
      green: Variant;
      indigo: Variant;
      lime: Variant;
      gray: Variant;
      mint: Variant;
      orange: Variant;
      pink: Variant;
      plum: Variant;
      purple: Variant;
      red: Variant;
      sky: Variant;
      teal: Variant;
      tomato: Variant;
      violet: Variant;
      yellow: Variant;
    };

    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
