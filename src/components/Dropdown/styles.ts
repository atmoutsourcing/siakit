import styled, { css } from 'styled-components';

import { Card } from '../Card';

export const Content = styled(Card)`
  padding: 8px 0;

  display: flex;
  flex-direction: column;
  min-width: 192px;
`;

const types = {
  default: css``,
  info: css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.blue[3]};
    }

    p,
    svg {
      color: ${({ theme }) => theme.colors.blue[11]};
    }
  `,
  success: css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.green[3]};
    }

    p,
    svg {
      color: ${({ theme }) => theme.colors.green[11]};
    }
  `,
  warning: css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.amber[3]};
    }

    p,
    svg {
      color: ${({ theme }) => theme.colors.amber[11]};
    }
  `,
  danger: css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.red[3]};
    }

    p,
    svg {
      color: ${({ theme }) => theme.colors.red[11]};
    }
  `,
};

export type Type = 'info' | 'success' | 'warning' | 'danger' | undefined;

type ItemProps = {
  type: Type;
};

export const Item = styled.div<ItemProps>`
  position: relative;
  height: 28px;
  padding-left: 12px;

  display: flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[4]};
  }

  ${({ type }) => types[type || 'default']}
`;

export const Label = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[11]};
  margin: 12px 12px 4px;
`;
