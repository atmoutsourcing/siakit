import React, { ReactNode } from 'react';

import * as RadixTabs from '@radix-ui/react-tabs';
import styled from 'styled-components';

import { Colors, useTheme } from '../../hooks/theme';

type ContainerProps = {
  colorScheme: Colors;
};

export const Container = styled(RadixTabs.Trigger)<ContainerProps>`
  all: unset;

  height: 32px;
  padding: 0 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: background-color 0.15s;

  z-index: 10;

  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[9]};

  gap: 6px;

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][3]};
  }

  &[data-state='active'] {
    border-bottom: 2px solid
      ${({ theme, colorScheme }) => theme.colors[colorScheme][9]};
    color: ${({ theme, colorScheme }) => theme.colors[colorScheme][9]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }
`;

type TabProps = {
  children: ReactNode;
  value: string;
  disabled?: boolean;
};

export function Tab({ children, value, disabled }: TabProps): JSX.Element {
  const { colorScheme } = useTheme();

  return (
    <Container value={value} disabled={disabled} colorScheme={colorScheme}>
      {children}
    </Container>
  );
}
