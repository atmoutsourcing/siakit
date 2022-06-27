import styled, { css } from 'styled-components';

import { Colors } from '../../hooks/theme';

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'primary' | 'secondary' | 'ghost';

type ContainerProps = {
  colorScheme: Colors;
  size: Size;
  variant: Variant;
};

export const Container = styled.button<ContainerProps>`
  border: 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.15s;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ size }) =>
    size === 'sm' &&
    css`
      width: 24px;
      height: 24px;

      border-radius: 6px;
      gap: 6px;
    `}

  ${({ size }) =>
    size === 'md' &&
    css`
      width: 32px;
      height: 32px;
    `}

  ${({ size }) =>
    size === 'lg' &&
    css`
      width: 40px;
      height: 40px;
    `}

    ${({ variant, colorScheme, theme }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors[colorScheme][9]};

      strong,
      svg {
        color: ${theme.colors.white};
      }

      &:hover {
        background-color: ${theme.colors[colorScheme][10]};

        &:disabled {
          background-color: ${theme.colors[colorScheme][9]};
        }
      }
    `}

    ${({ variant, colorScheme, theme }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.colors[colorScheme][4]};

      strong,
      svg {
        color: ${theme.colors[colorScheme][11]};
      }

      &:hover {
        background-color: ${theme.colors[colorScheme][5]};

        &:disabled {
          background-color: ${theme.colors[colorScheme][4]};
        }
      }
    `}

    ${({ variant, colorScheme, theme }) =>
    variant === 'ghost' &&
    css`
      background-color: transparent;

      strong,
      svg {
        color: ${theme.colors[colorScheme][11]};
      }

      &:hover {
        background-color: ${theme.colors[colorScheme][5]};

        &:disabled {
          background-color: transparent;
        }
      }
    `}
`;
