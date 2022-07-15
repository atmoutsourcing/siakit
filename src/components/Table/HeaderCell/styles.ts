import styled, { css } from 'styled-components';

import { Colors } from '../../../hooks/theme';

type ContainerProps = {
  isActive: boolean;
  colorScheme: Colors;
  isAction?: boolean;
  isSort?: boolean;
  align?: string;
};

export const Container = styled.button<ContainerProps>`
  border: 0;

  white-space: nowrap;
  padding: 12px;

  position: sticky;
  top: 0;
  z-index: 3;

  background-color: ${({ theme }) => theme.colors.gray[3]};

  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 0.75rem;
  font-weight: 600 !important;

  cursor: default;

  ${({ isActive, theme, colorScheme }) => css`
    color: ${isActive ? theme.colors[colorScheme][9] : theme.colors.gray[12]};
  `}

  ${({ isAction }) =>
    isAction &&
    css`
      box-shadow: var(--shadow-table-cell);
      z-index: 3;
      right: 0;
    `}

  ${({ isSort }) =>
    isSort &&
    css`
      cursor: pointer;
    `}

  ${({ align }) =>
    align === 'right' &&
    css`
      justify-content: flex-end;
    `}
`;
