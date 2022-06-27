import styled, { css } from 'styled-components';

import { Colors } from '../../hooks/theme';

export type Size = 'sm' | 'md';

type ContainerProps = {
  colorScheme: Colors;
  size: Size;
};

export const Container = styled.button<ContainerProps>`
  border: 0;
  cursor: pointer;
  border-radius: 8px;
  background: transparent;
  transition: background-color 0.15s;

  display: flex;
  align-items: center;

  gap: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ colorScheme, theme }) =>
    css`
      strong,
      svg {
        color: ${theme.colors[colorScheme][10]};
      }

      &:hover {
        strong,
        svg {
          color: ${theme.colors[colorScheme][11]};
        }

        strong {
          text-decoration: underline;
        }

        &:disabled {
          strong,
          svg {
            color: ${theme.colors[colorScheme][10]};
          }

          strong {
            text-decoration: none;
          }
        }
      }
    `}
`;
