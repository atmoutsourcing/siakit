import Select from 'react-select';
import styled, { css } from 'styled-components';

import { Colors } from '../../../hooks/theme';

type ContainerProps = {
  colorScheme: Colors;
  isErrored: boolean;
};

export const Container = styled(Select)<ContainerProps>`
  .react-select__control {
    border: 2px solid ${({ theme }) => theme.colors.gray[4]};
    min-height: 32px;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.gray[1]};

    box-shadow: none;

    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.colors.gray[4]};
    }
  }

  .react-select__control.react-select__control--is-focused {
    border-color: ${({ theme, colorScheme }) => theme.colors[colorScheme][9]};
  }

  .react-select__value-container {
    padding: 0 10px;
  }

  .react-select__placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[9]};
  }

  .react-select__input,
  .react-select__single-value {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[12]};
  }

  .react-select__indicators {
    height: 28px;

    .react-select__clear-indicator {
      padding: 0;
    }

    .react-select__indicator-separator {
      display: none;
    }

    .react-select__indicator.react-select__dropdown-indicator,
    .react-select__indicator.react-select__clear-indicator {
      padding: 0 4px;
      color: ${({ theme }) => theme.colors.gray[8]};
    }
  }

  .react-select__control--menu-is-open {
    .react-select__indicator.react-select__dropdown-indicator,
    .react-select__indicator.react-select__clear-indicator {
      color: ${({ theme }) => theme.colors.gray[9]};
    }
  }

  .react-select__menu {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    border: 1px solid ${({ theme }) => theme.colors.gray[3]};
    padding: 8px 0;

    .react-select__menu-list {
      padding: 0;
    }

    .react-select__option {
      padding: 0 12px;
      height: 28px;
      display: flex;
      align-items: center;

      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[12]};

      cursor: pointer;

      transition: background-color 0.1s;

      &:hover {
        background-color: ${({ theme, colorScheme }) =>
          theme.colors[colorScheme][4]};
      }
    }

    .react-select__option.react-select__option--is-selected {
      background-color: ${({ theme, colorScheme }) =>
        theme.colors[colorScheme][7]};
    }

    .react-select__option.react-select__option--is-focused {
      background-color: ${({ theme, colorScheme }) =>
        theme.colors[colorScheme][3]};
    }
  }

  ${({ isErrored, theme }) =>
    isErrored &&
    css`
      .react-select__control,
      .react-select__control:hover,
      .react-select__control.react-select__control--is-focused {
        background-color: ${theme.colors.red[3]};
        border-color: ${theme.colors.red[9]};
      }
    `}

  .react-select__multi-value {
    background-color: ${({ theme }) => theme.colors.gray[4]};

    .react-select__multi-value__label {
      color: ${({ theme }) => theme.colors.gray[12]};
      font-size: 12px;
    }

    .react-select__multi-value__remove {
      color: ${({ theme }) => theme.colors.gray[11]};

      &:hover {
        background-color: ${({ theme }) => theme.colors.red[3]};
        color: ${({ theme }) => theme.colors.red[9]};
      }
    }
  }
`;
