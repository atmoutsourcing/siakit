import React, { createContext, ReactNode, useContext } from 'react';

import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { usePersistedState } from '../usePersistedState';
import { GlobaStyle } from './globalStyle';
import { darkTheme } from './themes/dark';
import { lightTheme } from './themes/light';

export type Theme = 'light' | 'dark';

export const colors = {
  amber: '',
  blue: '',
  brown: '',
  crimson: '',
  cyan: '',
  grass: '',
  green: '',
  indigo: '',
  lime: '',
  gray: '',
  mint: '',
  orange: '',
  pink: '',
  plum: '',
  purple: '',
  red: '',
  sky: '',
  teal: '',
  tomato: '',
  violet: '',
  yellow: '',
};

export type Colors = keyof typeof colors;

type ThemeContextData = {
  theme: Theme;
  toggleTheme: (type: Theme | undefined) => void;
  colorScheme: Colors;
  changeColorScheme: (color: Colors) => void;
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeContext = createContext({} as ThemeContextData);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = usePersistedState<Theme>('theme', 'light');
  const [colorScheme, setColorScheme] = usePersistedState<Colors>(
    'color-scheme',
    'indigo',
  );

  function toggleTheme(type: Theme | undefined): void {
    if (type) {
      setTheme(type);
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }

  function changeColorScheme(color: Colors): void {
    setColorScheme(color);
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colorScheme, changeColorScheme }}
    >
      <StyledComponentsThemeProvider theme={themes[theme as 'light' | 'dark']}>
        {children}

        <GlobaStyle colorScheme={colorScheme} />
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
