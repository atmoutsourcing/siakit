import styled, { css } from 'styled-components';

import { Colors } from '../../../hooks/theme';

type ContainerProps = {
  isFocused: boolean;
  isFilled: string;
  isErrored: boolean;
  colorScheme: Colors;
  disabled: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 6px;

  input {
    all: unset;

    box-sizing: border-box;

    display: flex;

    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.gray[1]};
    border: 2px solid ${({ theme }) => theme.colors.gray[4]};
    height: 32px;
    border-radius: 8px;

    width: 24px;

    text-align: center;

    &:focus {
      ${({ theme, colorScheme }) =>
        css`
          background-color: ${theme.colors.gray[1]};
          border-color: ${theme.colors[colorScheme][9]};
        `}
    }
  }

  ${({ isFilled, theme }) =>
    isFilled &&
    css`
      input {
        background-color: ${theme.colors.gray[1]};
      }
    `}

  ${({ isErrored, theme }) =>
    isErrored &&
    css`
      input {
        background-color: ${theme.colors.red[3]};
        border-color: ${theme.colors.red[9]};
      }
    `}

  ${({ theme, disabled }) =>
    disabled &&
    css`
      input {
        background-color: ${theme.colors.gray[4]};
      }
    `}
`;
