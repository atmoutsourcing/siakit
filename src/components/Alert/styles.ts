import styled, { css } from 'styled-components';

export type Type = 'info' | 'success' | 'warning' | 'danger';

const types = {
  info: css`
    background-color: ${({ theme }) => theme.colors.blue[3]};
    border: 1px solid ${({ theme }) => theme.colors.blue[7]};

    strong,
    svg {
      color: ${({ theme }) => theme.colors.blue[11]};
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.green[3]};
    border: 1px solid ${({ theme }) => theme.colors.green[7]};

    strong,
    svg {
      color: ${({ theme }) => theme.colors.green[11]};
    }
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.amber[3]};
    border: 1px solid ${({ theme }) => theme.colors.amber[7]};

    strong,
    svg {
      color: ${({ theme }) => theme.colors.amber[11]};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.red[3]};
    border: 1px solid ${({ theme }) => theme.colors.red[7]};

    strong,
    svg {
      color: ${({ theme }) => theme.colors.red[11]};
    }
  `,
};

type ContainerProps = {
  type: Type;
};

export const Container = styled.div<ContainerProps>`
  padding: 12px;
  border-radius: 8px;
  width: 100%;

  display: flex;

  gap: 12px;

  ${({ type }) => types[type]}

  p {
    color: ${({ theme }) => theme.colors.gray[11]};
  }
`;
