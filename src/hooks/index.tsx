import React, { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';

import { StyledToastContainer } from '../components/Toast';
import { ThemeProvider } from './theme';

type SiakitProviderProps = {
  children: ReactNode;
};

export function SiakitProvider({ children }: SiakitProviderProps): JSX.Element {
  return (
    <ThemeProvider>
      <StyledToastContainer />

      {children}
    </ThemeProvider>
  );
}
