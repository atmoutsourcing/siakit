import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled, { css } from 'styled-components';

const types = {
  default: css`
    color: ${({ theme }) => theme.colors.gray[12]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[3]};
    }
  `,
  info: css`
    color: ${({ theme }) => theme.colors.blue[11]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.blue[3]};
    }
  `,
  success: css`
    color: ${({ theme }) => theme.colors.green[11]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.green[3]};
    }
  `,
  warning: css`
    color: ${({ theme }) => theme.colors.amber[11]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.amber[3]};
    }
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.red[11]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.red[3]};
    }
  `,
};

export type Type = keyof typeof types;

type ContainerProps = {
  type: Type;
};

export const Container = styled(DropdownMenu.Item)<ContainerProps>`
  height: 28px;
  padding: 0 8px 0 12px;

  display: flex;
  align-items: center;

  gap: 6px;

  font-size: 14px;
  line-height: 1;

  cursor: pointer;

  ${({ type }) => types[type]}
`;
